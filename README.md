# Drag-n-drop-totaliser

<img src="./assets/screengrab.png" alt="drag-n-drop-totaliser screen grab">

## What?
Add up arbitrary amounts using drag and drop UI. Built with [Dragula](https://github.com/bevacqua/dragula) and [Redux](https://github.com/reactjs/redux).

## Why?
Add up the total number of legs of animals in a list. Estimate the cost of a job given a list of services required. Drag items from a restaurant menu, get the total bill.

## How?
Feed totaliser your data in a JSON object. Items are dragged from the '#itemContainer' to the '#counterContainer'. The total is displayed in the '#totalCounter'. 

~~~
    <script src="totaliser.js"></script>
    <script>
    var items = { items: [
        {name: 'Slug', value: 1},
        {name: 'Chicken', value: 2},
        {name: 'Cat', value: 4},
        {name: 'Honey bee', value: 6},
        {name: 'Spider!', value: 8}
    ]}
    totaliser.init('itemContainer','counterContainer','totalCounter',items)
~~~

## API
Drag-n-drop-totaliser's state is managed by [Redux](https://github.com/reactjs/redux). Drag-n-drop-totaliser's API exposes its `state` and `store` objects. Call functions any time the state changes by using the `totaliser.subscribe()` method.

~~~
    totaliser.subscribe(hello)

    function hello(){
        console.log(JSON.stringify(totaliser.getState(), null, 3))

        var store = totaliser.getStore()
        console.log(JSON.stringify(store.getState(), null, 3))
    }
~~~