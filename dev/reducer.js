'use strict'

import {
    ADD_COUNTER,
    REMOVE_COUNTER,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
} from './constants.js'

const initialState = []

exports.counters = (state = initialState, action) => {
    switch(action.type) {
        case ADD_COUNTER:
            return state.concat([{
                name: action.name,
                value: action.value,
                id: action.id,
                tally: 1
            }])
        case REMOVE_COUNTER:
            return state.filter(counter => {
                if (counter.id !== action.id) return counter
            })
        case INCREMENT_COUNTER:
            return state.map((counter) => {
                if (counter.id === action.id) {
                    return Object.assign({}, counter, {tally: counter.tally + 1})
                }
                return counter
            })
        case DECREMENT_COUNTER:
            return state.map((counter) => {
                if (counter.id === action.id) {
                    let decrementBy = counter.tally === 0 ? 0 : 1
                    return Object.assign({}, counter, {tally: counter.tally - decrementBy})
                }
                return counter
            })
        default: 
            return state
    }
}