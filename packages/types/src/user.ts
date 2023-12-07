import z from "zod";
import { v4 as uuidv4 } from "uuid"

export const registeredUserSchema = z.strictObject({
	_id: z.string().default(uuidv4),
    username: z.string(),
    email: z.string().email(),
    passwordHash: z.string(),
    hashSalt: z.string(),
    isGuest: z.literal(false)
})

export type IRegisteredUser = z.infer<typeof registeredUserSchema>

export const guestSchema = z.strictObject({
	_id: z.string().default(uuidv4),
    username: z.string().optional(),
    isGuest: z.literal(true)
})

export type IGuest = z.infer<typeof guestSchema>

export const userSchema = z.discriminatedUnion("isGuest", [
    registeredUserSchema,
    guestSchema
])

export type IUser = IRegisteredUser | IGuest
