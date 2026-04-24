import { z } from "zod";

export const taskSchema = z.object({
    name: z
        .string({
            required_error: "Task name is required",
            invalid_type_error: "Task name must be a valid string",
        })
        .trim()
        .min(3, "Task name must be at least 3 characters")
        .max(30, "Task name cannot exceed 30 characters"),

    status: z
        .enum(["pending", "completed"], {
            invalid_type_error: "Status must be either 'pending' or 'completed'",
        })
        .optional(),

    description: z
        .string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a valid string",
        })
        .trim()
        .min(5, "Description should be at least 5 characters")
        .max(255, "Description is too long"),
});
