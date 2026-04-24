import { and, asc, eq } from "drizzle-orm";
import { connection, TaskTables } from "../db/schema.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { asynHandler } from "../utils/AsyncHandler.js";
import { validateData } from "../utils/validate.js";
import { NotFoundError, ValidationError } from "../utils/ApiError.js";
import { taskSchema } from "../schemas/task.schema.js";

export const getAllTasks = asynHandler(async (req, res) => {
    const { id } = req.user;
    const tasks = await connection.select().from(TaskTables)
        .where(eq(TaskTables.userId, id))
        .orderBy(asc(TaskTables.createdAt))

    res.status(200).json(new ApiSuccess(200, "Tasks Fetched Successfully", tasks))
})

export const getSingleTask = asynHandler(async (req, res) => {
    const { id } = req.user
    const taskId = parseInt(req.params.taskId)

    const task = await connection.select().from(TaskTables)
        .where(and(eq(TaskTables.id, taskId), eq(TaskTables.userId, id)));

    if (!task[0]) {
        throw new NotFoundError("No such tasks")
    }

    res.status(200).json(new ApiSuccess(200, "Task Fetched Successfully", task[0]))
})

export const addTask = asynHandler(async (req, res) => {
    const { name, description } = req.body
    const { id } = req.user

    const isValid = validateData({ name, description }, taskSchema);

    if (!isValid.success) {
        throw new ValidationError("Enter valid Data", isValid.errors)
    }

    const data = {
        userId: id,
        name,
        description
    }

    const task = await connection.insert(TaskTables).values(data).returning();

    res.status(201).json(new ApiSuccess(201, "Task added successfully", task[0]))
})

export const editTask = asynHandler(async (req, res) => {
    const { name, description, status } = req.body
    const { id } = req.user
    const taskId = parseInt(req.params.taskId)

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;

    if (Object.keys(updates).length === 0) {
        throw new ValidationError("No fields to update", []);
    }

    const task = await connection.update(TaskTables)
        .set(updates)
        .where(and(eq(TaskTables.id, taskId), eq(TaskTables.userId, id)))
        .returning();

    if (!task[0]) {
        throw new NotFoundError("No such tasks")
    }

    res.status(200).json(new ApiSuccess(200, "Task updated successfully", task[0]))
})

export const deleteTask = asynHandler(async (req, res) => {
    const { id } = req.user
    const taskId = parseInt(req.params.taskId)

    const task = await connection.delete(TaskTables)
        .where(and(eq(TaskTables.id, taskId), eq(TaskTables.userId, id)))
        .returning();

    if (!task[0]) {
        throw new NotFoundError("No such tasks")
    }

    res.status(201).json(new ApiSuccess(201, "Task deleted successfully", task[0]))
})