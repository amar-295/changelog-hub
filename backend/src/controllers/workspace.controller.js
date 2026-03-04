import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Workspace } from '../models/workspace.model.js';
import { Release } from '../models/release.model.js';
import { Subscriber } from '../models/subscriber.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const getWorkspaceDetails = asyncHandler(async (req, res) => {
  const workspaceId = req.user.workspaceId;

  if (!workspaceId) {
    throw new ApiError(400, 'Workspace ID is required');
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new ApiError(400, 'Workspace not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, workspace, 'Workspace fetched successfully'));
});

const updateWorkspace = asyncHandler(async (req, res) => {
  const { name, description, subdomain } = req.body;
  const workspaceId = req.user.workspaceId;

  if (!name?.trim()) {
    throw new ApiError(400, 'Workspace name is required');
  }

  let logoUrl = '';
  if (req.file?.path) {
    const uploadLogo = await uploadOnCloudinary(req.file.path);
    if (uploadLogo) {
      logoUrl = uploadLogo.secure_url;
    } else {
      throw new ApiError(400, 'Logo upload failed');
    }
  }

  const updateData = {
    name: name.trim(),
    description: description?.trim(),
    subdomain: subdomain?.toLowerCase().trim(),
  };

  if (logoUrl) updateData.logo = logoUrl;

  try {
    const updatedWorkspace = await Workspace.findByIdAndUpdate(
      workspaceId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedWorkspace, 'Workspace updated successfully')
      );
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(
        400,
        'This subdomain is already taken. Please choose another.'
      );
    }

    throw new ApiError(400, 'Failed to update workspace', error);
  }
});

const getWorkspaceMetrics = asyncHandler(async (req, res) => {
  const workspaceId = req.user.workspaceId;

  const [totalReleases, totalSubscribers] = await Promise.all([
    Release.countDocuments({ workspaceId }),
    Subscriber.countDocuments({ workspaceId, status: 'active' }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalReleases,
        totalSubscribers,
        avgEngagement: 64.2, // Placeholder for v1
      },
      'Workspace metrics fetched successfully'
    )
  );
});

export { getWorkspaceDetails, updateWorkspace, getWorkspaceMetrics };
