'use client'

import { SearchProps } from '@/interfaces'
import React from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ value, onChange }: SearchProps) => {
    return (
        <div className='px-3 py-3 w-80 border border-gray-400 rounded-md flex gap-2 items-center'>
            <MdSearch size={24} color='gray' />
            <input
                value={value}
                onChange={onChange}
                type='text' placeholder='Search by property ID or title' className='w-full outline-none text-gray-500 text-base' />
        </div>
    )
}

export default Search