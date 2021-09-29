const jewelryService = require('./service/jewelry')
const util = require('./util')

module.exports.addJewelry = async (event, context) => {
    console.log("add jewelry call", event)
    try {
        const item = JSON.parse(event.body);
        const result = await jewelryService.addJewelry(item);
        return util.httpResponse(result)
    } catch (e) {
        return util.httpResponse({
            message: "Failed to add new jewelry"
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
            message: "Failed to get jewelry"
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
