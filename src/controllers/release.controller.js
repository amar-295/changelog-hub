import { asyncHandler } from '../utils/asyncHandler.js';
import { Release } from '../models/release.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createRelease = asyncHandler(async (req, res) => {
    const {title, version, content, category} = req.body

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required")
    }

    const workspaceId =  req.user.workspaceId

    if (!workspaceId) {
        throw new ApiError(400, "Workspace not found")
    }

    const release = await Release.create({
        title, 
        content, 
        version, 
        category,
        status: "draft",
        workspaceId,
        createdBy: req.user._id,
    })

    return res.status(201).json(
        new ApiResponse(201, release, "Release created successfully")
    )


})


export {
    createRelease,
}


// 1. Get title, content, version, category from req.body
// 2. Get workspaceId from req.user (logged in user)
// 3. Get createdBy from req.user._id
// 4. Validate: title and content are present
// 5. Create release with status: 'draft'
// 6. Slug auto-generates via pre-save hook
// 7. Return created release