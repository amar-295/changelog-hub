import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subdomain: {                        // for public URL
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        minlength: [3, "Subdomain must be at least 3 characters"],
        maxlength: [30, "Subdomain must be less than 30 characters"],
        match: [/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Subdomain can only contain lowercase letters, numbers, and hyphens (cannot start or end with hyphen)"]
    },
    customDomain: {
        type: String,
        lowercase: true,
        trim: true,
    },
    plan: {
        type: String,
        enum: ["free", "starter", "pro", "enterprise"],
        default: "free",
    },
    logo: {
        type: String,
    }
    
},{timestamps: true})

export const Workspace = mongoose.model("Workspace", workspaceSchema)