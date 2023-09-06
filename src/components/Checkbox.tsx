'use client'

import { CheckboxProps } from '@/interfaces'
import React from 'react'

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
    return (
        <div className='flex items-center gap-4'>
            <input className='w-4 h-4 cursor-pointer' type='checkbox' checked={checked} onChange={onChange} id='checkbox' />
            <label className='select-none whitespace-nowrap text-gray-400 text-sm cursor-pointer' htmlFor='checkbox'>{label}</label>
        </div>
    )
}

export default Checkbox