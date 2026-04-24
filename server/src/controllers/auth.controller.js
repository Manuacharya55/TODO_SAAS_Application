import { eq } from "drizzle-orm";
import { UsersTable, connection } from "../db/schema.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { ApiError, DuplicateError, NotFoundError, ValidationError } from "../utils/ApiError.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asynHandler } from "../utils/AsyncHandler.js";
import { validateData } from "../utils/validate.js";
import { comparePassword, createToken, hashPassword } from "../utils/auth.js";


export const registerUser = asynHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const isValid = validateData({ name, email, password }, registerSchema)

    if (!isValid.success) {
        throw new ValidationError("Enter valid Data", isValid.errors)
    }

    const existingUser = await connection.select().from(UsersTable).where(eq(UsersTable.email, email))
    if (existingUser[0]) {
        throw new DuplicateError("user already exists", existingUser)
    }

    const hashedPassword = await hashPassword(password)
    const userData = { ...isValid.data, password: hashedPassword }
    const user = await connection.insert(UsersTable).values(userData).returning();


    const token = await createToken({ email: user[0].email, id: user[0].id })
    const data = {
        name: user[0].name,
        email: user[0].email,
        id: user[0].id,
        token
    }

    res.status(201).json(new ApiSuccess(201, "User Registered Successfully", data))
})

export const loginUser = asynHandler(async (req, res) => {
    const { email, password } = req.body;

    const isValidData = validateData({ email, password }, loginSchema)

    if (!isValidData.success) {
        throw new ValidationError("Enter valid Data", isValidData.error)
    }


    const existingUser = await connection.select().from(UsersTable).where(eq(UsersTable.email, email));

    if (!existingUser[0]) {
        throw new NotFoundError("invalid credentials")
    }

    const isValid = await comparePassword(existingUser[0].password, password)

    if (!isValid) {
        throw new ApiError(401, "Invalid Credentials")
    }

    const token = await createToken({ email: existingUser[0].email, id: existingUser[0].id })

    const data = {
        name : existingUser[0].name,
        email : existingUser[0].email,
        id : existingUser[0].id,
        token
    }
    res.status(200).json(new ApiSuccess(200, "User Logged in Successfully", data))
})