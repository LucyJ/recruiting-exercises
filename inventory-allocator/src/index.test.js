const cheapestShipment = require('./index')

// Github examples
test("Example 1: Order can be shipped using one warehouse", () => {
    expect(cheapestShipment({ apple: 1 }, [{ name: 'owd', inventory: { apple: 1 } }])).toEqual([{ owd: { apple: 1 } }])
})

// this test's output is in reverse order to my original
// so I changed output of my program to be in reverse order, but this shouldn't matter in the grand scheme
test("Example 2: Order can be shipped using multiple warehouses", () => {
    expect(cheapestShipment({ apple: 10 }, [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 }}])).toEqual([{ dm: { apple: 5 }}, { owd: { apple: 5 } }])
})

test("Example 3a: Order cannot be shipped because there is not enough inventory", () => {
    expect(cheapestShipment({ apple: 1 }, [{ name: 'owd', inventory: { apple: 0 } }])).toEqual([])
})

test("Example 3b: Order cannot be shipped because there is not enough inventory", () => {
    expect(cheapestShipment({ apple: 2 }, [{ name: 'owd', inventory: { apple: 1 } }])).toEqual([])
})

// My tests
test("Order cannot be shipped bc there's not enough inventory, multiple warehouses", () => {
    expect(cheapestShipment({ apple: 2, banana: 9 }, [{ name: 'owd', inventory: { apple: 1 } }, { name: 'nyc', inventory: { apple: 1 } }, { name: 'abc', inventory: { banana: 5 } }])).toEqual([])
})

test("Order can be shipped using multiple warehouses, multiple items in order",() => {
    expect(cheapestShipment({ apple: 10, banana: 5 }, [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 }}, { name: 'nyc', inventory: { banana: 3, apple: 2 } }, { name: 'abc', inventory: { banana: 3, apple: 2 } }])).toEqual([{ abc: { banana: 2 } }, { nyc: { banana: 3 } }, { dm: { apple: 5 }}, { owd: { apple: 5 } } ])
})

// test to see function picks cheapest warehouse
test("Order can be shipped using one warehouse, multiple different items in order", () => {
    expect(cheapestShipment({ apple: 1, banana: 1, orange: 1 }, [{ name: 'owd', inventory: { apple: 1, banana: 2, orange: 3 } }, { name: 'abc', inventory: { apple: 5, banana: 1, orange: 3 } }])).toEqual([{ owd: { apple: 1, banana: 1, orange: 1 } }])
})

// test to see funstion picks shipping from one warehouse vs multiple cheaper ones
test("Order can be shipped using one warehouse, but there are a combination of warehouses can also ship it", () => {
    expect(cheapestShipment({ apple: 5, banana: 10, orange: 1 }, [{ name: 'owd', inventory: { apple: 1, banana: 2, orange: 3 } }, { name: 'abc', inventory: { banana: 100, orange: 3 } }, { name: 'nyc', inventory: { apple: 50, banana: 100, orange: 3 } } ])).toEqual([{ nyc: { apple: 5, banana: 10, orange: 1 } }])
})

