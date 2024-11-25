import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        history: [
            {
                role: {
                    type: String,
                    enum: ["user", "model"],
                    required: true
                },
                parts: [
                    {
                        text: {
                            type: String,
                            required: true
                        }
                    }
                ]
            }
        ]
    }
)

export const Chat = mongoose.model("Chat", chatSchema);