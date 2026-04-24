
export const asynHandler = (handlerFunction) => {
    return (req, res, next) => Promise.resolve(handlerFunction(req, res, next)).catch(next)
}