const httpResponse = (value, code = 200) => {
    return {
        code,
        body: JSON.stringify(value)
    }
}

module.exports.httpResponse = httpResponse;
