const httpResponse = (value, code = 200) => {
    return {
        statusCode: code,
        body: JSON.stringify(value)
    }
}

module.exports.httpResponse = httpResponse;
