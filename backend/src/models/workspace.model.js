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
        toLowerCase: true,
        trim: true,
        index: {unique: true}
    },
    customDomain: {
        type: String,
        toLowerCase: true,
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