import { connection, UsersTable } from "../db/schema.js";
import { ApiError, NotFoundError } from "../utils/ApiError.js";
import { asynHandler } from "../utils/AsyncHandler.js";
import { validateToken } from "../utils/auth.js";
import { eq } from "drizzle-orm";


export const validateJWT = asynHandler(async (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        throw new ApiError(401, "Access denied. No token provided.")
    }

    const decoded = await validateToken(token);

    const existingUser = await connection.select({
        id: UsersTable.id,
        email: UsersTable.email
    }).from(UsersTable).where(eq(UsersTable.id, decoded.id))

    if (!decoded || !existingUser[0]) {
        throw new NotFoundError("Invalid Token")
    }

    req.user = { email: existingUser[0].email, id: existingUser[0].id }
    next()
})