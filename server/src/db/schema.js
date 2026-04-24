import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const sql = neon(process.env.DATABASE_URL);
export const connection = drizzle({ client: sql });

export const UsersTable = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 250 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

export const statusEnum = pgEnum("task_status", ["pending", "completed"]);
export const TaskTables = pgTable("tasks", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => UsersTable.id, { onDelete: 'cascade' }),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    status : statusEnum("status").default("pending"),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

