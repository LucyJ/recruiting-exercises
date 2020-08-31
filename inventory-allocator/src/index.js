function cheapestShipment (order, warehouses) {
    let shipment = []

    // here I assume that orders will not contain a zero order, because that doesn't make sense
    const keys = Object.keys(order)
    const compareInventory = (orderKey, warehouse )=> {
        return order[orderKey] <= warehouse.inventory[orderKey]
    }

    // finding if the order can be all shipped from one warehouse
    for (let i = 0; i< warehouses.length; i++) {
        if (keys.every(k => compareInventory(k, warehouses[i]))) {
            let shipmentObj = {}
            shipmentObj[warehouses[i].name] = order
            return [shipmentObj]
        }
    }

    // second loop finding a way to split the shipment
    // will just take as much of the order as it first sees
    // note: does not optimize for shipping from fewer warehouses
    const tempOrder = order

    for (let i = 0; i< warehouses.length; i++) {
        let warehouseObj = {}
        const keys = Object.keys(tempOrder)
        for (let k = 0; k < keys.length; k++) {
            if (!warehouses[i].inventory[keys[k]]) { continue }

            if (compareInventory(keys[k], warehouses[i])) {
                warehouseObj[warehouses[i].name] = {}
                warehouseObj[warehouses[i].name][keys[k]] = tempOrder[keys[k]]
                delete tempOrder[keys[k]]
            } else {
                warehouseObj[warehouses[i].name] = {}
                warehouseObj[warehouses[i].name][keys[k]] = warehouses[i].inventory[keys[k]]
                tempOrder[keys[k]] = tempOrder[keys[k]] - warehouses[i].inventory[keys[k]]
            }
        }
        shipment.push(warehouseObj)
        if (Object.keys(tempOrder).length === 0) {
            return shipment.reverse()
        }
    }
    return []
}

module.exports = cheapestShipment