const { AWS } = require('../util/aws-config')
const JEWELRY_STORE_TABLE_NAME = process.env.JEWELRY_STORE_TABLE_NAME;
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
        TableName: JEWELRY_STORE_TABLE_NAME,
        Item
    };
    await docClient.put(params).promise();

    return Item;
}


/**
 * Get one item from the db.
 * @param {object} item - The item to be fetched.
 */

module.exports.getJewelry = async (name) => {
    let params = {
        TableName: JEWELRY_STORE_TABLE_NAME,
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
        TableName: JEWELRY_STORE_TABLE_NAME,
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

/**
 * Delete one record from the db.
 * @param {object} item - The item to be deleted.
 */

module.exports.deleteJewelry = async (name) => {
    let params = {
        TableName: JEWELRY_STORE_TABLE_NAME,
        Key: {
            pk: "product",
            sk: `product::${name.toLowerCase()}`
        }
    };
    const result = await docClient.delete(params).promise();
    console.log("result", result)
    return result;
}
