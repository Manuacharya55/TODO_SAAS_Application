import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createToken = async (data) => {
    const token = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '3d' })
    return token
}

export const validateToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    return decoded
}

export const hashPassword = async (password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}

export const comparePassword = async (hashPassword, password) => {
    const isValid = await bcrypt.compare(password, hashPassword)
    return isValid
}