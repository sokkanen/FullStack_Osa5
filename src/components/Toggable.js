import React, {useState} from 'react'

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)
    const hide = {display: visible ? 'none' : ''}
    const show = {display: visible ? '' : 'none'}

    const toggleVis = () => {
        setVisible(!visible)
    }

    return (
    <div>
        <div style={hide}>
            <button onClick={toggleVis}>{props.buttonLabel}</button>
        </div>
        <div style={show}>
            {props.children}
            <button onClick={toggleVis}>cancel</button>
        </div>
    </div>
    )
}

export default Toggable