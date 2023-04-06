import React from 'react'

import "./Input.css"

export default function Input({label, type, placeholder, style, onchange}) {
  return (
    <div className='input-container' style={style}>
        <label>{label}</label>
        <input onChange={onchange} type={type} placeholder={placeholder}/>
    </div>
  )
}
