import mongoose, { Schema } from "mongoose";

// Task Schema
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], required: true },
  assignee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Indexes
taskSchema.index({ assignee: 1 });
taskSchema.index({ createdBy: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;
