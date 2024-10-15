import React, {useId} from 'react'

const Input = React.forwardRef( function Input(
    {   label, 
        type="text",
        className="",
        ...props
    }, 
    ref){
        const labelId = useId()
        //{`w-full ${className}`}
        return (
            <div className='w-full'>
                {label && (
                    <label htmlFor={labelId} className='inline-block mb-1 pl-1 font-bold text-left'>
                        {label}
                    </label>
                )}
                <input
                type={type}
                ref={ref}
                {...props}
                id={labelId}
                >
                </input>

            </div>
        )

})

export default Input
