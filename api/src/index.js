const AWS = require("aws-sdk");
const jewelryService = require('./service/jewelry')
const util = require('./util')

AWS.config.update({

});

const table = "serverless-present-x";
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.addJewelry = async (event, context) => {
    const item = JSON.parse(event.body);
    try {
        const result = await jewelryService.addJewelry(item);
        return util.httpResponse(result)
    } catch (e) {
        return util.httpResponse({
            message: "Test"
        }, 500)
    }
}

module.exports.getAllJewelry = async (event, context) => {
    let params = {
        TableName: table,
        KeyConditionExpression: "#pk = :pk",
        ExpressionAttributeNames: {
            "#pk": "pk"
        },
        ExpressionAttributeValues: {
            ":pk": "product"
        }
    }

    try {
        const result = await jewelryService.getAllJewelry(params)
        return util.httpResponse(result)

    } catch (error) {
        return util.httpResponse({
            message: "Test"
        }, 500)
    }
}


module.exports.getJewelry = async (event, context) => {
    const name = event.pathParameters.name;

    try {
        const result = await jewelryService.getJewelry(name);
        return util.httpResponse(result)
    } catch (error) {
        return util.httpResponse({
            message: "Test"
        }, 500)
    }
}

module.exports.updateJewelryChangeShape = async (event) => {
    let name = event.pathParameters.name;
    const item = JSON.parse(event.body)

    try {
        const result = await jewelryService.updateJewelryChangeShape(name, item.shape);
        return util.httpResponse(result)
    } catch (error) {
        return util.httpResponse({
            message: "Failed to update an item"
        }, 500)
    }
}

module.exports.deleteJewelry = async (event) => {
    let name = event.pathParameters.name;

    try {
        let result = await jewelryService.deleteJewelry(name)
        return util.httpResponse(result)
    } catch (error) {
        return util.httpResponse({
            message: "Failed to delete an item",
        }, 500)
    }
}
