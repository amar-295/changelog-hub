import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Release } from '../models/release.model.js';
import { Workspace } from '../models/workspace.model.js';
import { Subscriber } from '../models/subscriber.model.js';
import crypto from 'crypto';

const getPublicReleases = asyncHandler(async (req, res) => {
  const { subdomain } = req.params;

  // Gracefully handle bad input: if parsing fails (NaN), default to 1 or 10
  const pageNum = Math.max(parseInt(req.query.page) || 1, 1);
  let limitNum = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

  const workspace = await Workspace.findOne({
    subdomain,
  });

  if (!workspace) {
    throw new ApiError(404, 'Workspace not found');
  }

  const skip = (pageNum - 1) * limitNum;

  const releases = await Release.find({
    workspaceId: workspace._id,
    status: 'published',
  })
    .select('title slug content status version category publishedAt')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limitNum);

  const totalReleases = await Release.countDocuments({
    workspaceId: workspace._id,
    status: 'published',
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        workspace: {
          name: workspace.name,
          logo: workspace.logo,
          description: workspace.description,
          subdomain: workspace.subdomain,
        },
        releases,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalReleases / limitNum),
          totalReleases,
          limit: limitNum,
        },
      },
      'Releases fetched successfully'
    )
  );
});

const subscribeToChangelog = asyncHandler(async (req, res) => {
  const { subdomain } = req.params;
  let { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  email = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

  const workspace = await Workspace.findOne({ subdomain });

  if (!workspace) {
    throw new ApiError(404, 'Workspace not found');
  }

  const existingSubscriber = await Subscriber.findOne({
    email,
    workspaceId: workspace._id,
  });

  if (existingSubscriber) {
    if (existingSubscriber.status === 'active') {
      return res
        .status(200)
        .json(new ApiResponse(200, {}, 'You are already subscribed'));
    } else {
      // Reactivate subscription
      existingSubscriber.status = 'active';
      existingSubscriber.subscribedAt = new Date();
      existingSubscriber.unsubscribedAt = null;
      await existingSubscriber.save();

      return res
        .status(200)
        .json(
          new ApiResponse(200, {}, 'Subscription reactivated successfully')
        );
    }
  }

  // Create new subscriber
  const unsubscribeToken = crypto.randomBytes(32).toString('hex');

  const subscriber = await Subscriber.create({
    email,
    workspaceId: workspace._id,
    unsubscribeToken,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { subscriber }, 'Subscribed successfully'));
});

const unsubscribeFromChangelog = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const subscriber = await Subscriber.findOne({
    unsubscribeToken: token,
  });

  if (!subscriber) {
    throw new ApiError(404, 'Invalid unsubscribe link');
  }

  if (subscriber.status === 'unsubscribed') {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, 'You are already unsubscribed'));
  }

  subscriber.status = 'unsubscribed';
  subscriber.unsubscribedAt = new Date();
  await subscriber.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Unsubscribed successfully'));
});

export { getPublicReleases, subscribeToChangelog, unsubscribeFromChangelog };
