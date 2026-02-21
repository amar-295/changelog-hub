import { asyncHandler } from '../utils/asyncHandler.js';
import { Release } from '../models/release.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import generateSlug from '../utils/generateSlug.js';

const createRelease = asyncHandler(async (req, res) => {
    const { title, version, content, category } = req.body

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    const newSlug = generateSlug(trimmedTitle)

    if (!trimmedTitle || !trimmedContent) {
        throw new ApiError(400, "Title and content are required")
    }

    const validateCategories = ["feature", "improvement", "bugfix", "security", "other"]

    if (category && !validateCategories.includes(category)) {
        throw new ApiError(400, `Category must be one of ${validateCategories.join(", ")}`)
    }
    
    const workspaceId = req.user.workspaceId

    const existingRelease = await Release.findOne({
        workspaceId,
        slug: newSlug
    })

    if (existingRelease) {
        throw new ApiError(409, "Release already exists")
    }

    const release = await Release.create({
        title: trimmedTitle,
        content: trimmedContent,
        version,
        category,
        workspaceId,
        createdBy: req.user?._id,
        slug: newSlug
    })

    return res.status(201).json(
        new ApiResponse(201, release, "Release created successfully")
    )
})

const getAllReleases = asyncHandler(async (req, res) => {
    const workspaceId = req.user.workspaceId

    const page = Math.max(parseInt(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50)
    const status = req.query.status
    const category = req.query.category
    const search = req.query.search || ""
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const queryFilter = {
        workspaceId,
    }

    const validateStatus = ["draft", "published", "archived"]
    const validateCategories = ["feature", "improvement", "bugfix", "security", "other"]

    if (status && !validateStatus.includes(status)) {
        throw new ApiError(400, `Status must be one of ${validateStatus.join(", ")}`)
    }

    if (category && !validateCategories.includes(category)) {
        throw new ApiError(400, `Category must be one of ${validateCategories.join(", ")}`)
    }

    if (status) queryFilter.status = status
    if (category) queryFilter.category = category

    if (search) {
        queryFilter.title = {
            $regex: escapedSearch,
            $options: "i"
        }
    }
    
    const skip = (page -1) * limit

    const releases = await Release.find(queryFilter)
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1})
    
    const totalReleases = await Release.countDocuments(queryFilter)
    const totalPages = Math.ceil(totalReleases / limit)

    return res.status(200).json(
        new ApiResponse(200, {
            releases,
            pagination: {
                currentPage: page,
                totalPages,
                totalReleases,
                limit
            }
        }, "Releases fetched successfully") 
    )
})

export {
    createRelease,
    getAllReleases
}


