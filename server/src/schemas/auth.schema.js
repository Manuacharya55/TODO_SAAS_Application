import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a valid string"
        })
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name cannot exceed 30 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email("Please enter a valid email address"), 

    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a valid string"
        })
        .min(5, "Password must be at least 5 characters")
        .max(50, "Password cannot exceed 50 characters")
});

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email("Please enter a valid email address"),

    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a valid string"
        })
        .min(5, "Password must be at least 5 characters")
});