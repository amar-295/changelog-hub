import mongoose, { Schema } from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const releaseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {                                     // URL-friendly version of title
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        version: {
            type: String,
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        workspaceId: {
            type: Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },
        publishedAt: {
            type: Date,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        category: {
            type: String,
            enum: ["feature", "improvement", "bugfix", "security", "other"],
            default: "other",
        },

    }, { timestamps: true })


// compund unique index- ensures that within a workspace, each slug is unique

releaseSchema.index(                        
    {
        workspaceId: 1,
        slug: 1,
    },
    {
        unique: true,
    }
)

releaseSchema.pre("save", function () {
    if (!this.slug) {
        this.slug = generateSlug(this.title)
    }
})

export const Release = mongoose.model("Release", releaseSchema)