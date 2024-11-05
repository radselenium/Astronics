import React from 'react'

export default function InputBox({data,handler,value}) {
  
  return (
    <div class={data.container.class}>
    <label class={data.label.class} for={data.label.name}>{data.label.name}</label>
    <div class={data.container.class1}>
      <input style={data.input.style} type={data.input.type} class={data.input.class} id={data.input.id} placeholder={data.input.placeholder} name={data.input.name}   required={data.input.required} pattern={data.input.pattern} onChange={handler} value={value} />
    
    </div>
  </div>
  )
}
