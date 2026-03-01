import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscriber } from "../models/subscriber.model.js";
import mongoose from "mongoose";

const getAllSubscribers = asyncHandler(async (req, res) => {
    const workspaceId = req.user.workspaceId;
    const { page = 1, limit = 50, status = "active", sortBy = "subscribedAt", sortOrder = "desc"} = req.query;

    const query = { workspaceId }
    if (status) query.status = status;

    const pageNum = Math.max(parseInt(page) || 1, 1)
    const limitNum = Math.min(Math.max(parseInt(limit) || 50, 1), 100)

    const skip = (pageNum - 1) * limitNum;

    // sort by subscribedAt or unsubscribedAt
    const sortField = sortBy || 'subscribedAt'
    const sortDirection = sortOrder === 'asc' ? 1 : -1
    const sortObject = { [sortField]: sortDirection }
    
    const subscribers = await Subscriber.find(query)
    .sort(sortObject)
    .skip(skip)
    .limit(limitNum)

    const total = await Subscriber.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(200, {
            subscribers,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                total,
                limit: limitNum,
            },
        }, "Subscribers fetched successfully")
    )
})

const deleteSubscriber = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid subscriber ID format")
    }

    const subscriber = await Subscriber.findOneAndDelete({
        _id: id,
    })

    if (!subscriber) {
        throw new ApiError(404, "Subscriber not found");
    }
    return res.status(200).json(
        new ApiResponse(200, {}, "Subscriber deleted successfully")
    )
})

export {
    getAllSubscribers,
    deleteSubscriber
}