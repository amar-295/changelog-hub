import mongoose, { Schema } from "mongoose";
import generateSlug from "../utils/generateSlug.js";

const releaseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {                                     // URL-friendly version of title
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        version: {
            type: String,
            required: true,
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
    if (this.isModified("title") && !this.slug) {
        this.slug = generateSlug(this.title)
    }
})

export const Release = mongoose.model("Release", releaseSchema)