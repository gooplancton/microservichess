import z from "zod";

export const timestampSchema = z.number().min(0).default(() => Math.floor(Date.now() / 1000))
