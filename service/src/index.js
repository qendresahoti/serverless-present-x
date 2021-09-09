var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "",
    secretAccessKey: ""
});

module.exports.getJewelry = async (event, context) => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const table = "serverless-present-x";

    const params = {
        TableName:table,
        Item:{
            "pk": "product",
            "sk": "product::123",
            "style": "Sapphire",
            "metal": "silver",
            "shape": "round"
        }
    };

    console.log("Adding a new item...");
    try {
       await docClient.put(params).promise();
    } catch (e) {
       console.log("error", e);
       return {
           code: 500,
           body: JSON.stringify({
               message: "error?"
           })
       }
    }
    return {
        code: 200,
        body: JSON.stringify({
            message: "euro?"
        })
    }
}

