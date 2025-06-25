import z from "zod";

export const signup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

export const signin = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const createBlog = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlog = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
});