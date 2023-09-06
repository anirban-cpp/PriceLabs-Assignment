import { FilterProps } from '@/interfaces'
import React from 'react'

const Filter = ({
    title,
    maxValue,
    minValue,
    onMaxDecrement,
    onMaxIncrement,
    onMinDecrement,
    onMinIncrement
}: FilterProps) => {
    const disabledStyles = '!text-gray-300 !border-gray-300'
    return (
        <div className='flex flex-col gap-3'>
            <p className='font-bold'>{title}</p>
            {
                [...Array(2)].map(((_e, i) => (
                    <React.Fragment key={i}>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-row gap-10'>
                                <p className='font-bold text-sm'>{i === 0 ? minValue : maxValue}</p>
                                <p className='text-sm text-gray-400'>{i === 0 ? 'Min' : 'Max'} {title?.toLowerCase()}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button disabled={i === 0 ? minValue === 5 : maxValue === 5}
                                    className={`flex items-center justify-center rounded-full h-8 w-8 border text-lg border-gray-400
                                ${i === 0 && minValue === 5 ? disabledStyles : 'text-gray-400'}
                                ${i === 1 && maxValue === 5 ? disabledStyles : 'text-gray-400'}
                                `} onClick={i === 0 ? onMinIncrement : onMaxIncrement}>+</button>
                                <button disabled={i === 0 ? minValue === 0 : maxValue === 0}
                                    className={`border-gray-400 flex items-center justify-center rounded-full h-8 w-8 border text-lg
                                ${i === 0 && minValue === 0 ? disabledStyles : 'text-gray-400'}
                                ${i === 1 && maxValue === 0 ? disabledStyles : 'text-gray-400'}
                                `} onClick={i === 0 ? onMinDecrement : onMaxDecrement}>-</button>
                            </div>
                        </div>
                    </React.Fragment>
                )))
            }
        </div>
    )
}

export default Filter