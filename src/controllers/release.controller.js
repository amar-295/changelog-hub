import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Release } from '../models/release.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import generateSlug from '../utils/generateSlug.js';

const createRelease = asyncHandler(async (req, res) => {
    const { title, version, content, category } = req.body

    if (!title?.trim() || !content?.trim()) {
        throw new ApiError(400, "Title and content are required")
    }

    const validateCategories = ["feature", "improvement", "bugfix", "security", "other"]

    if (category && !validateCategories.includes(category)) {
        throw new ApiError(400, `Category must be one of ${validateCategories.join(", ")}`)
    }

    const workspaceId = req.user.workspaceId

    try {
        const release = await Release.create({
            title: title.trim(),
            content: content.trim(),
            version,
            category,
            workspaceId,
            createdBy: req.user._id
        })

        return res.status(201).json(
            new ApiResponse(201, release, "Release created successfully")
        )
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "A release with this title already exists")
        }
        throw error
    }
})

const getAllReleases = asyncHandler(async (req, res) => {
    const workspaceId = req.user.workspaceId

    const page = Math.max(parseInt(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50)
    const status = req.query.status
    const category = req.query.category
    const search = req.query.search

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
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        queryFilter.title = {
            $regex: escapedSearch,
            $options: "i"
        }
    }

    const skip = (page - 1) * limit

    const releases = await Release.find(queryFilter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })

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

const getReleaseById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const workspaceId = req.user.workspaceId

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid release ID format");
    }

    const release = await Release.findOne({
        _id: id,
        workspaceId
    })

    if (!release) {
        throw new ApiError(404, "Release not found")
    }

    return res.status(200).json(
        new ApiResponse(200, release, "Release fetched successfully")
    )
})

const updateRelease = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { category } = req.body
    const workspaceId = req.user.workspaceId

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid release Id format")
    }

    const release = await Release.findOne({
        _id: id,
        workspaceId
    })

    if (!release) {
        throw new ApiError(404, "Release not found")
    }

    const validateCategories = ["feature", "improvement", "bugfix", "security", "other"]

    if (category && !validateCategories.includes(category)) {
        throw new ApiError(400, `Category must be one of ${validateCategories.join(", ")}`)
    }

    const updateAllowedFields = ["title", "version", "content", "category"]
    const updates = {}

    updateAllowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            updates[field] = req.body[field]
        }
    })

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No updates provided")
    }

    if (updates.title) {
        updates.slug = generateSlug(updates.title)
    }

    try {
        const updatedRelease = await Release.findByIdAndUpdate(
            id,
            {
                ...updates,
                updatedBy: req.user._id
            },
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(200).json(
            new ApiResponse(200, updatedRelease, "Release updated successfully")
        )

    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "A release with this title already exists")
        }
        throw error
    }
})

const deleteRelease = asyncHandler(async (req, res) => {
    const { id } = req.params
    const workspaceId = req.user.workspaceId

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid release Id format")
    }

    const release = await Release.findOne({
        _id: id,
        workspaceId
    })

    if (!release) {
        throw new ApiError(404, "Release not found")
    }

    try {
        await Release.findByIdAndDelete(id)

        return res.status(200).json(
            new ApiResponse(200, {}, "Release deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to delete release")
    }
})

const publishRelease = asyncHandler(async (req, res) => {
    const { id } = req.params
    const workspaceId = req.user.workspaceId

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid release Id format")
    }

    const release = await Release.findOne({
        _id: id,
        workspaceId
    })

    if (!release) {
        throw new ApiError(404, "Release not found")
    }

    if (release.status === "published") {
        throw new ApiError(400, "Release is already published")
    }

    try {
        const publishedRelease = await Release.findByIdAndUpdate(
            id,
            {
                status: "published",
                publishedAt: new Date(),
                updatedBy: req.user._id
            },
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(200).json(
            new ApiResponse(200, publishedRelease, "Release published successfully")
        )
    } catch (error) {
        throw new ApiError(500, error?.message || "Failed to publish release")
    }
})

export {
    createRelease,
    getAllReleases,
    getReleaseById,
    updateRelease,
    deleteRelease,
    publishRelease
}

// **Delete Policy (Approach A - Current):**
// Allows direct deletion for V1.
// **Future Refinement (Approach B):**
// Prevent deletion of published releases to maintain historical integrity.
