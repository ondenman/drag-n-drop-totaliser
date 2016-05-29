const expect = require('expect')
const freeze = require('deep-freeze')
import { counters } from '../reducer.js'
import {
    ADD_COUNTER,
    REMOVE_COUNTER,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
} from '../constants.js'


describe('Counter reducer', () => {
    it('should return state by default', () => {
        var stateBefore = [{}]
        var action = {}
        expect(counters(stateBefore, action)).toEqual(stateBefore)
    })
    it('should return state if no parsable action is provided', () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 1, id: 1}]
        var action = {type: 'DUMMY_ACTION', name: 'DUMMY', value: 123}
        freeze(stateBefore)
        expect(counters(stateBefore, action)).toEqual(stateBefore)
    })

    it('should add a counter to the state when the action is ADD_COUNTER', () => {
        var stateBefore = []
        freeze(stateBefore)
        var action = {type: ADD_COUNTER, name: 'Test', value: 4, id: 1}
        var stateAfter = [{name: 'Test', value: 4, tally: 1, id: 1}]
        expect(counters(stateBefore, action)).toEqual(stateAfter)
    })

    it('should remove a counter when the action is REMOVE_COUNTER', () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 1, id: 1}]
        freeze(stateBefore)
        var action = {type: REMOVE_COUNTER, id: 1}
        var stateAfter = []
        expect(counters(stateBefore, action)).toEqual(stateAfter)
    })

    it('should return stateBefore when the REMOVE_COUNTER action has no matching id in the state', () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 1, id: 1}]
        freeze(stateBefore)
        var action = {type: REMOVE_COUNTER, id: 23}
        expect(counters(stateBefore, action)).toEqual(stateBefore)
    })

    it("should increment a counter's tally", () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 1,  id: 1}]
        freeze(stateBefore)
        var action = {type: INCREMENT_COUNTER, id: 1}
        var stateAfter = [{name: 'Test', value: 10, tally: 2, id: 1}]
        expect(counters(stateBefore, action)).toEqual(stateAfter)
    })

    it("should decrement a counter's tally", () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 1, id: 1}]
        freeze(stateBefore)
        var action = {type: DECREMENT_COUNTER, id: 1}
        var stateAfter = [{name: 'Test', value: 10, tally: 0, id: 1}]
        expect(counters(stateBefore, action)).toEqual(stateAfter)
    })

    it("should never decrement a counter's value below 0", () => {
        var stateBefore = [{name: 'Test', value: 10, tally: 0, id: 1}]
        freeze(stateBefore)
        var action = {type: DECREMENT_COUNTER, id: 1}
        expect(counters(stateBefore, action)).toEqual(stateBefore)

    })
})