import mongoose from "mongoose";
const { Schema } = mongoose;

const MyPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  access: {
    type: String,
    enum: ["Free", "Gold", "Silver"],
    required: true,
  },
  comments: [
    {
      text: String,
      user: String,
    },
  ],
});

export default mongoose.model("MyPost", MyPostSchema);
