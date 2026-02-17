import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    projects: {
        type: [Schema.Types.ObjectId],
        ref: "Project",
    },
    
},{timestamps: true})

export const Workspace = mongoose.model("Workspace", workspaceSchema)