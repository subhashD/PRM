function sendError( body ) {
    return { success: false, error: body };
}

function sendSuccess( body ) {
    return { success: false, data: body };
}

module.exports = { sendError, sendSuccess };