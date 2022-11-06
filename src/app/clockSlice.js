import { createSlice } from "@reduxjs/toolkit";

import { BREAK, SESSION } from './constants'

const initialState = {
    break: 5,
    session: 25,
    minutes: 25,
    seconds: '00',
    timeLabel: 'Session',
    timer: false,
    timeUp: false,
}

const maxTime = 60

const player = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav')

export const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {
        increment: (state, action) => {
            if (state.timer) return
            switch (action.payload) {
                case SESSION:
                    if (state.session < maxTime) state.session += 1
                    if (state.session < 10) {
                        state.minutes = '0' + state.session
                    } else {
                        state.minutes = state.session
                    }
                    state.seconds = '00'
                    break;
                case BREAK:
                    if (state.break < maxTime) state.break += 1
                    state.seconds = '00'
                    break;
            }
        },
        decrement: (state, action) => {
            if (state.timer) return
            switch (action.payload) {
                case SESSION:
                    if (state.session > 1) state.session -= 1
                    if (state.session < 10) {
                        state.minutes = '0' + state.session
                    } else {
                        state.minutes = state.session
                    }
                    state.seconds = '00'
                    break;
                case BREAK:
                    if (state.break > 1) state.break -= 1
                    state.seconds = '00'
                    break;
            }
        },
        resetClock: (state) => {
            state.timer = false
            state.break = 5
            state.session = 25
            state.minutes = state.session
            state.seconds = '00'
        },
        timerControl: (state) => {
            state.timer = state.timer ? false : true
        },
        updateTime: (state, action) => {
            if (state.minutes == 0 && state.seconds == 0) {
                state.timeUp = true
                if (state.timeLabel == 'Session') {
                    state.minutes = state.break
                    state.timeLabel = 'Break'
                } else {
                    state.minutes = state.session
                    state.timeLabel = 'Session'
                }
                player.play()
            }
            if (state.seconds == 0) {
                state.minutes = state.minutes > 9 ? state.minutes - 1 : `0${state.minutes - 1}`
            }
            state.seconds = action.payload > 9 ? action.payload : `0${action.payload}`
        }
    }
})

export const { increment, decrement, resetClock, timerControl, updateTime } = clockSlice.actions


export const selectBreak = (state) => state.clock.break
export const selectSession = (state) => state.clock.session
export const selectMinutes = (state) => state.clock.minutes
export const selectSeconds = (state) => state.clock.seconds
export const selectLabel = (state) => state.clock.timeLabel
export const selectTimer = (state) => state.clock.timer

export default clockSlice.reducer