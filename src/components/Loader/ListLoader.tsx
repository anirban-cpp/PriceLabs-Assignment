import React from 'react'
import Skeleton from './Skeleton'

const ListLoader = () => {
    return (
        <Skeleton>
            <div className='shadow-md cursor-pointer shadow-gray-100 w-full py-5 px-3 flex items-center gap-4 border-b border-b-gray-300 hover:shadow-lg transition-all !duration-300'>
                <div className="h-24 w-24 bg-gray-200 rounded-md dark:bg-gray-300" />
                <div className='flex flex-col gap-3 flex-1'>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-16" />
                    <span className='flex flex-col gap-2'>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full" />
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48" />
                    </span>
                    <div className='flex items-center justify-between flex-1'>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24" />
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24" />
                    </div>
                </div>
            </div>
        </Skeleton>
    )
}

export default ListLoader