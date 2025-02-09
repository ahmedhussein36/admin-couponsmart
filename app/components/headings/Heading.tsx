import React from 'react'
interface HeadingProps {
    title: string
    subtitle?: string
}
const Heading = ({ title, subtitle }: HeadingProps) => {
    return (
        <div className='flex flex-col justify-start items-start gap-1'>
            <h1 className='font-bold text-2xl'>{title}</h1>
            <p className=' text-sm'>{subtitle}</p>

        </div>
    )
}

export default Heading