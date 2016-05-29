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
Drag-n-drop-totaliser is built with [Redux](https://github.com/reactjs/redux). Its API exposes the app's `state` and `store` objects. Functions can subscribe to state changes using the `totaliser.subscribe()` method.