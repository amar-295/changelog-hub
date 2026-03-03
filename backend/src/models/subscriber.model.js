import mongoose, { Schema } from 'mongoose';

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
    unsubscribeToken: {
      type: String, // Random token for unsubscribe link
      unique: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Compound unique index: one email per workspace
subscriberSchema.index({ email: 1, workspaceId: 1 }, { unique: true });

export const Subscriber = mongoose.model('Subscriber', subscriberSchema);
