import React, { useState } from 'react'
import Slider from 'rc-slider'
import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}ms`}
      visible={true}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  )
}

// ms 단위로 시간을 표시하는 TimeSlider 만들기
const TimeSlider = () => {
  const [animationId, setAnimationId] = useState(0)
  const [play, setPlay] = useState(false)
  const [time, setTime] = useState(0)
  const increaseTime = () => {
    setTime(time+1000)
  }
  const changeTime = (val) => {
    setTime(val)
  }
  const loop = (t) => {
    setTime(t)
    setAnimationId(requestAnimationFrame(loop))
  }
  const stopPlay = () => {
    cancelAnimationFrame(animationId)
    setPlay(false)
  }
  const startPlay = () => {
    setPlay(true)
    setAnimationId(requestAnimationFrame(loop))
  }
  const togglePlay = () => {
    if(play){
      stopPlay()
    }else {
      startPlay()
    }
  }
  return (
    <div>
      <Slider min={0} max={2460792} defaultValue={0} value={time} onChange={changeTime} handle={handle} />

      <div className="display" style={{ marginTop: "40px" }}>
        <div>State 상황</div>
        <div>{time}</div>
        <div>{play ? "play === true" : "play === false"}</div>
        <div>{animationId}</div>
      </div>
      <div className="controller" style={{ marginTop: "40px" }}>
        <button onClick={increaseTime}>time + 1000</button>
        <button onClick={togglePlay}>{play ? "stop" : "play"}</button>
      </div>
    </div>
  )
}

export default TimeSlider
