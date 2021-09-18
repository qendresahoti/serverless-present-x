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
 * @param {object} items - The items to be fetched.
 */

module.exports.getAllJewelry = async (params) => {
    const result = await docClient.query(params).promise();
    console.log("result", result)
    return result;
}

/**
 * Get one item from the db.
 * @param {object} item - The item to be fetched.
 */

module.exports.getJewelry = async (name) => {
    let params = {
        TableName: table,
        Key: {
            pk: "product",
            sk: `product::${name.toLowerCase()}`
        }
    }

    const result = await docClient.get(params).promise();
    console.log('resulti', result)
    return result;
}

/**
 * Update one field on the item from the db.
 * @param {object} item - The item to be updated.
 */

module.exports.updateJewelryChangeShape = async (name, shape) => {
    let params = {
        TableName: table,
        Key: {
            pk: "product",
            sk: `product::${name.toLowerCase()}`
        },
        UpdateExpression: "set shape = :shape",
        ExpressionAttributeValues: {
            ":shape": shape
        },
        ReturnValues: "UPDATED_NEW"
    };
    const result = await docClient.update(params).promise();
    console.log("result", result)
    return result;
}
