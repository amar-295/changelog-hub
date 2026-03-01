import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Release } from "../models/release.model.js";
import { Workspace } from "../models/workspace.model.js";

const getPublicReleases = asyncHandler(async (req, res) => {
    const { subdomain } = req.params
    const { page = 1, limit = 10 } = req.query

    const workspace = await Workspace.findOne({
        subdomain
    })

    if (!workspace) {
        throw new ApiError(404, "Workspace not found")
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        throw new ApiError(400, "Invalid page or limit")
    }

    const releases = await Release.find({
        workspaceId: workspace._id,
        status: "published"
    })
        .select("title slug content status version category publishedAt")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))

    const totalReleases = await Release.countDocuments({
        workspaceId: workspace._id,
        status: "published"
    })

    return res.status(200).json(
        new ApiResponse(200, {
            workspace: {
                name: workspace.name,
                logo: workspace.logo,
                description: workspace.description,
                subdomain: workspace.subdomain,
            },
            releases,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReleases / parseInt(limit)),
                totalReleases,
                limit: parseInt(limit)
            }
        }, "Releases fetched successfully")
    )
})

export {
    getPublicReleases
}