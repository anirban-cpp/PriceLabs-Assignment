'use client'

import { TabsProps } from '@/interfaces'
import useApiDataStore from '@/store/useApiDataStore'
import React from 'react'

const Tabs = ({ onTabSelect, selectedTab }: TabsProps) => {
    const propertyTypes = useApiDataStore(state => state.propertyTypes)
    return (
        <div className='border-b border-b-gray-300 flex gap-7 items-center overflow-x-scroll no-scrollbar'>
            {
                propertyTypes?.map((data) => (
                    <button
                        key={data?.name}
                        className={`transition-all py-2 border-b-2 text-sm whitespace-nowrap ${selectedTab && selectedTab === data?.name ? 'border-b-black text-gray-600' : 'border-b-transparent text-gray-400'}`}
                        onClick={() => onTabSelect?.(data?.name)}
                    >{data?.name}&nbsp; ({data?.quantity})</button>
                ))
            }
        </div>
    )
}

export default Tabs