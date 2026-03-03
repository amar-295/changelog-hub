import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { Workspace } from '../models/workspace.model.js';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId).select('+refreshToken');
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Token generation error:', error);
    throw new ApiError(
      500,
      'Something went wrong while generating access and refresh tokens'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some(
      (field) => !field || field?.trim() === ''
    )
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, 'User with name or email already exists');
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  let subdomain = user.username.toLowerCase();

  const existingWorkspace = await Workspace.findOne({
    subdomain,
  });

  if (existingWorkspace) {
    subdomain = `${user.username}-${Date.now()}`;
  }

  let workspace;
  try {
    workspace = await Workspace.create({
      name: `${user.fullName}'s Workspace`,
      owner: user._id,
      subdomain: subdomain,
    });
  } catch (error) {
    console.error('Workspace creation error:', error);
    await User.findByIdAndDelete(user._id);
    throw new ApiError(500, 'Something went wrong while creating workspace');
  }

  user.workspaceId = workspace._id;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering the user');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        'User registered and logged in successfully'
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(email || username) || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select('+password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  try {
    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.error('Failed to update last login time', error.message);
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        'User logged in successfully'
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select('+refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or invalid');
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(new ApiResponse(200, {}, 'Access token refreshed successfully'));
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'User fetched successfully'));
});

const githubLogin = asyncHandler(async (req, res) => {
  const options = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    scope: 'user:email',
  };

  const queryString = new URLSearchParams(options).toString();
  return res.redirect(`${process.env.GITHUB_ROOT_URL}?${queryString}`);
});

const githubLoginCallback = asyncHandler(async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) throw new ApiError(400, 'Invalid Authorization Code');

    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new ApiError(
        400,
        'Github Auth Failed: ' + tokenData.error_description
      );
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${tokenData.access_token}`,
      },
    });

    const profile = await userResponse.json();

    let email = profile.email;

    if (!email) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${tokenData.access_token}`,
        },
      });

      const emails = await emailResponse.json();
      email = emails.find((email) => email.primary)?.email || emails[0]?.email;
    }

    let user = await User.findOne({
      $or: [{ githubId: profile.id.toString() }, { email: email }],
    });

    if (!user) {
      let username = profile.login.toLowerCase();
      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
        username = `${username}-${Math.floor(Math.random() * 1000)}`;
      }
      user = await User.create({
        fullName: profile.name || profile.login,
        email: email || `${profile.login}@github.com`,
        githubId: profile.id.toString(),
        avatar: profile.avatar_url,
        username: username,
      });

      let subdomain = user.username.toLowerCase();

      const existingWorkspace = await Workspace.findOne({
        subdomain,
      });

      if (existingWorkspace) {
        subdomain = `${user.username}-${Date.now()}`;
      }

      let workspace;
      try {
        workspace = await Workspace.create({
          name: `${user.fullName}'s Workspace`,
          owner: user._id,
          subdomain: subdomain,
        });
      } catch (error) {
        console.error('GitHub Workspace creation error:', error);
        await User.findByIdAndDelete(user._id);
        throw new ApiError(
          500,
          'Something went wrong while creating workspace'
        );
      }

      user.workspaceId = workspace._id;
      await user.save({ validateBeforeSave: false });

      const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
      );

      if (!createdUser) {
        throw new ApiError(
          500,
          'Something went wrong while registering the user'
        );
      }
    } else {
      // SYNC: Update avatar and name even for existing users to keep it fresh
      user.avatar = profile.avatar_url;
      user.fullName = profile.name || profile.login;
      // Update githubId if it wasn't already set (e.g. user registered with email first)
      if (!user.githubId) user.githubId = profile.id.toString();
      await user.save({ validateBeforeSave: false });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    };

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .redirect(`${process.env.CORS_ORIGIN}/dashboard`);
  } catch (error) {
    console.error('GitHub Auth Error:', error.message);
    const errorMessage = encodeURIComponent(
      error.message || 'GitHub Authentication failed'
    );
    return res.redirect(
      `${process.env.CORS_ORIGIN}/login?error=${errorMessage}`
    );
  }
});

const validateSession = asyncHandler(async (req, res) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(200)
      .json(new ApiResponse(200, { authenticated: false }, 'No session found'));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, { authenticated: false }, 'Invalid session')
        );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { authenticated: true }, 'Session is valid'));
  } catch (error) {
    return res
      .status(200)
      .json(new ApiResponse(200, { authenticated: false }, 'Session expired'));
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  githubLogin,
  githubLoginCallback,
  validateSession,
};
