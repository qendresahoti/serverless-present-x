const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "AKIA6HNCZ5YCHBK343UC",
    secretAccessKey: "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"
});

const table = "serverless-present-x";
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Inserts an item into db.
 * @param {object} item - The item to be inserted.
 */
module.exports.addJewelry = async (item) => {
    const Item = {
        "pk": "product",
        "sk": `product::${item.name.toLowerCase()}`,
        ...item
    }
    const params = {
        TableName: table,
        Item
    };
    await docClient.put(params).promise();

    return Item;
}


/**
 * Get all items from the db.
 * @param {object} item - The item to be inserted.
 */

module.exports.getAllJewelry = async (params) => {
    const result = await docClient.query(params).promise();
    console.log("result", result)
    return result;
}
