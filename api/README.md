##Get all jewelry nodejs

```
module.exports.getAllJewelry = async () => {
try {
const result = await jewelryService.getAllJewelry()
return util.httpResponse(result)

    } catch (error) {
        return util.httpResponse({
            message: "Failed to get all jewelry"
        }, 500)
    }
}

```
##Get all jewelry service
```
/**
* Get all items from the db.
* @param {object} items - The items to be fetched.
*/
module.exports.getAllJewelry = async () => {
    let params = { 
        TableName: JEWELRY_STORE_TABLE_NAME,
        KeyConditionExpression: "#pk = :pk",
        ExpressionAttributeNames: { "#pk": "pk" },
        ExpressionAttributeValues: { ":pk": "product" }
    }
    const result = await docClient.query(params).promise();
    console.log("result", result)
    return result;
}
```
## Get all function

```
getAllJewelry:
  handler: src/index.getAllJewelry
  timeout: 30
  events:
    - http:
        path: jewelry
        method: GET

```
## Deploy changes

```
sls deploy -s dev
```


## Test newly deployed API endpoint using curl 

```
curl  https://00f2eeffdh.execute-api.us-east-1.amazonaws.com/dev/jewelry
```
