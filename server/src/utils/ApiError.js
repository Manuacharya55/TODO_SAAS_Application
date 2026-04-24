
export class ApiError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.success = false;
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends ApiError {
    constructor(message = "Resource not found", errors = []) {
        super(404, message, errors)
    }
}

export class ValidationError extends ApiError {
    constructor(message = "Invalid data", errors = []) {
        errors = errors.map(err=>({
            name : err.path[0],
            message : err.message
        }));

        super(400, message, errors)
    }
}

export class DuplicateError extends ApiError {
    constructor(message = "Conflict detected", errors = []) {
        super(409, message, errors)
    }
}