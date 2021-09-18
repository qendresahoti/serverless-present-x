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
    // const docClient = new AWS.DynamoDB.DocumentClient();
    console.log("paramters-", event.pathParameters);
    // const table = "serverless-present-x";
    let params = {
        TableName: table,
        Key: {
            pk: "product",
            sk: `product::${event.pathParameters.name.toLowerCase()}`
        }
    }

    console.log("getting items...");
    try {
        let result = await docClient.get(params).promise();

        console.log(result);

        return {
            body: JSON.stringify({
                message: "Executed succesfully",
                data: result
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateJewelryChangeShape = async (event) => {
    let item = JSON.parse(event.body)
    let params = {
        TableName: table,
        Key: {
            pk: "product",
            sk: `product::${event.pathParameters.name.toLowerCase()}`
        },
        UpdateExpression: "set shape = :shape",
        ExpressionAttributeValues: {
            ":shape": item.shape
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        let result = await docClient.update(params).promise();
        return {
            body: JSON.stringify({
                message: "updated succesfully",
                data: result
            })
        }
    } catch (error) {
        console.log(error);
    }
}
//
// module.exports.deleteJewelry = async () => {
//     let params = {
//         TableName: table,
//         Key: {
//             "year": year,
//             "name": name
//         }
//     }
//
//     let result = await docClient.delete(params).promise();
//
//     return {
//         body: JSON.stringify({
//             message: "deleted succesfully",
//             data: result
//         })
//     }
// }
