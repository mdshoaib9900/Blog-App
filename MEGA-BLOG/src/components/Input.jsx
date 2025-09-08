import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    lablel,
    type="text",
    className="",
    ...props
} ,ref){
    const id=useId()
    return (
    <div className='w-full'>
    {lablel && 
    <lablel
    className='inline-block mb-1 pl-1' 
    htmFor={id}>{lablel}
        </lablel>
        }
        <input
        type={type}
        className={`px-3 py-2 rounded-lgbg-white 
        text-black outline-none focus:bg-gray-50
        duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        />
        </div>
    )
})

export default Input