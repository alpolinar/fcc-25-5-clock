import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, resetClock, timerControl, updateTime } from './app/clockSlice'
import { selectBreak, selectSession, selectMinutes, selectSeconds, selectLabel, selectTimer } from './app/clockSlice'
import { BREAK, SESSION } from './app/constants'

function App() {
  const dispatch = useDispatch()
  const breakLength = useSelector(selectBreak)
  const sessionLength = useSelector(selectSession)
  const sessionMinutes = useSelector(selectMinutes)
  const sessionSeconds = useSelector(selectSeconds)
  const timeLabel = useSelector(selectLabel)
  const timer = useSelector(selectTimer)

  useEffect(() => {
    let sec = sessionSeconds
    if (sec == 0) sec = 60
    let id;
    if (timer) {
      id = setInterval(() => {
        sec -= 1
        dispatch(updateTime(sec))
        if (sec <= 0) {
          sec = 60
        }
      }, 1000)
    } else {
      clearInterval(id)
    }
    return () => clearInterval(id)
  }, [timer])

  return (
    <div id="container">
      <div id="app">
        <div>
          <div className="main-title">25 + 5 Clock</div>
          <div className="length-control">
            <div id="break-label">Break Length</div>
            <button className="btn-level" id="break-decrement" value="-" onClick={() => dispatch(decrement(BREAK))}><i className="fa fa-arrow-down fa-2x"></i></button>
            <div className="btn-level" id="break-length">{breakLength}</div>
            <button className="btn-level" id="break-increment" value="+" onClick={() => dispatch(increment(BREAK))}><i className="fa fa-arrow-up fa-2x"></i></button>
          </div>
          <div className="length-control">
            <div id="session-label">Session Length</div>
            <button className="btn-level" id="session-decrement" value="-" onClick={() => dispatch(decrement(SESSION))}><i className="fa fa-arrow-down fa-2x"></i></button>
            <div className="btn-level" id="session-length">{sessionLength}</div>
            <button className="btn-level" id="session-increment" value="+" onClick={() => dispatch(increment(SESSION))}><i className="fa fa-arrow-up fa-2x"></i></button>
          </div>
          <div className="timer" style={{ color: 'white' }}>
            <div className="timer-wrapper">
              <div id="timer-label" style={sessionMinutes <= 0 ? { color: 'rgb(165, 13, 13)' } : { color: 'white' }} >{timeLabel}</div>
              <div id="time-left" style={sessionMinutes <= 0 ? { color: 'rgb(165, 13, 13)' } : { color: 'white' }} >{sessionMinutes}:{sessionSeconds}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={() => dispatch(timerControl())}>
              <i className="fa fa-play fa-2x"></i>
              <i className="fa fa-pause fa-2x"></i>
            </button>
            <button id="reset" onClick={() => dispatch(resetClock())}><i className="fa fa-refresh fa-2x"></i></button>
          </div>
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      </div>
    </div>
  )
}

export default App
