'use strict'

import { createStore } from 'redux'
import { counters } from './reducer.js'
import dragula from 'dragula'
import {
    ADD_COUNTER,
    REMOVE_COUNTER,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
} from './constants.js'

module.exports = (function totaliser() {

    // create store
    const store = createStore(counters)
    let state = store.getState()
    let counter

    // API methods
    
    function init(itemContainer, counterContainer, totalCounter, items){
        // extract items array from JSON
        const itemsList = items.items
        // subscribe totalCounter to state
        store.subscribe(updateCounter)
        counter = document.getElementById(totalCounter)
        updateCounter(counter)
        // populate itemContainer with items
        const itemElements = createItems(itemsList)
        const fromContainer = document.getElementById(itemContainer)
        populateContainer(fromContainer, itemElements)
        const toContainer = document.getElementById(counterContainer)
        // initiate dragula
        initDragula(fromContainer, toContainer, onDrop)
    }

    function getStore() {
        return store
    }

    function getState() {
        return store.getState()
    }

    function subscribe(func) {
        store.subscribe(func)
    }

    // Private methods

    function onDrop(el){
        const item = el.querySelector('.totaliser-item')
        store.dispatch({     type: ADD_COUNTER, 
                             name: item.getAttribute('name'), 
                            value: item.getAttribute('value')})
    }

    function updateCounter() {
        console.log('Updating counter')
        let state = store.getState()
        let that = this
        let total = state.reduce((total, obj) => {
            return total + obj.value * obj.tally
        }, 0)
        console.log(total)
        counter.innerHTML = total
    }

    function createItems(items) {
        let itemElements = []
        items.forEach( item => {
            // create element
            const element = document.createElement('div')
            element.className = 'totaliser-item'
            // add inner HTML
            element.setAttribute('name', item.name)
            element.setAttribute('value', item.value)
            element.innerHTML = item.name
            const spanWrapper = document.createElement('span')
            spanWrapper.className = 'totaliser-item-wrapper'
            spanWrapper.appendChild(element)
            // place in itemContainer
            itemElements.push(spanWrapper)
        })
        return itemElements
    }

    function populateContainer(container, items) {
        items.forEach( item => {
            container.appendChild(item)
        })
    }

    function initDragula(fromContainer, toContainer, dropCallback) {
        dragula([fromContainer, toContainer], {
            revertOnSpill: true,
            accepts: function (el, target, source, sibling) {
                return target === fromContainer ? false : true
            },
            moves: function(el, source) {
                return source === toContainer ? false : true
            }
        }).on('drop', dropCallback)
    }

    return {
        init: init,
        getState: getState,
        getStore: getStore,
        subscribe: subscribe
    }
})()