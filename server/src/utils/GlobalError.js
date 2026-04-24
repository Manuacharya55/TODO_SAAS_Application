
export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Something Went Wrong"
    const error = err.errors || []

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error
    })
}