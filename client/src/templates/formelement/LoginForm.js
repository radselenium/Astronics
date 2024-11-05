import React from 'react'

 const InputComponent = ({ data,handler,value,error  }) => {
    //const {...rest } = props;
    return (
        <div class={data.container.class} style={data.container.style} >
            <div style={{ display: 'flex', alignItems: "flex-start" }}>
                {/* <label
                    htmlFor={data.label.name}
                >
                    {data.label.name}
                </label> */}
            </div>
            <input
                placeholder={data.input.placeholder}
                type={data.input.type}
                class={data.input.class}
                id={data.input.class}
                required={data.input.required}
                onChange={handler}
                value={value}
                style={data.input.style}
                
            />
           {error && <span className='text-danger' style={{fontSize:"18px"}} class="md-mt-6 text-danger fw-bold">{error}</span>}
        </div>

    )
}

 const ButtonComponent = ({data,events}) => {
    //const {...rest } = props;
    return (
        <div id={data.container.id} class={data.container.class} style={data.container.style} >
            <button class={data.button.class} style={data.button.style} onClick={events}>{data.button.name} </button>
           
        </div>

    )
}

 export { InputComponent,ButtonComponent };