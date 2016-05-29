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
    let counter,
        fromContainer,
        toContainer

    // API methods
    
    function initAPI(itemContainer, counterContainer, totalCounter, items){
        // extract items array from JSON
        const itemsList = items.items
        // subscribe totalCounter to state
        store.subscribe(updateCounter)
        counter = document.getElementById(totalCounter)
        updateCounter(counter)
        // populate itemContainer with items
        const itemElements = createItems(itemsList)
        fromContainer = document.getElementById(itemContainer)
        populateContainer(fromContainer, itemElements)
        toContainer = document.getElementById(counterContainer)
        // initiate dragula
        initDragula(fromContainer, toContainer, onDrop)
    }

    function getStoreAPI() {
        return store
    }

    function getStateAPI() {
        return store.getState()
    }

    function subscribeAPI(func) {
        store.subscribe(func)
    }

    // Private methods

    function onDrop(el, target){
        if (target === toContainer) {
            const item = el.querySelector('.totaliser-item')
            item.className += ' counter'
            const uniqueId = generateId()
            item.setAttribute('id',uniqueId)
            store.dispatch({     type: ADD_COUNTER, 
                                 name: item.getAttribute('name'), 
                                value: item.getAttribute('value'),
                                   id: uniqueId
                            })
            const button = createRemoveButton(item)
            button.addEventListener("click", onClicked, false)
        }
    }

    function onClicked(event){
        const item = event.target.parentNode
        const id = parseInt(item.getAttribute('id'))
        store.dispatch({type: REMOVE_COUNTER, id: id})
        item.remove()
    }

    function generateId() {
       return store.getState().reduce((maxId, obj) => Math.max(maxId, obj.id),0)+1
    }

    function createRemoveButton(el){
        let button = document.createElement('div')
        button.className = 'totaliser-widget'
        button.innerHTML = 'X'
        button.id = 'remove-button'
        el.appendChild(button)
        return button
    }

    function updateCounter() {
        let state = store.getState()
        let that = this
        let total = state.reduce((total, obj) => {
            return total + obj.value * obj.tally
        }, 0)
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
            copy: true,
            moves: function(el, source) {
                return source === toContainer ? false : true
            }
        }).on('drop', dropCallback)
    }

    return {
        init: initAPI,
        getState: getStateAPI,
        getStore: getStoreAPI,
        subscribe: subscribeAPI
    }
})()