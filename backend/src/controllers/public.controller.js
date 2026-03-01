import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Release } from '../models/release.model.js';
import { Workspace } from '../models/workspace.model.js';

const getPublicReleases = asyncHandler(async (req, res) => {
  const { subdomain } = req.params;
  let { page = 1, limit = 10 } = req.query;

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

export { getPublicReleases };
