import { createContext } from "react";
import type { IUser } from "types"

export const UserContext = createContext<IUser | null>(null)
