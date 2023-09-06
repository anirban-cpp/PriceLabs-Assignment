'use client'

import React, { useEffect, useRef, useState } from 'react'
import Search from './Search'
import { MdFilterList } from 'react-icons/md'
import Tabs from './Tabs'
import Checkbox from './Checkbox'
import Footer from './Footer'
import PropertyList from './PropertyList'
import { filterData } from '@/utils/constants'
import Filter from './Filter'
import { MdOutlineClose } from 'react-icons/md'
import useDebounce from '@/hooks/useDebounce'

const Offset = 90

const Sidebar = () => {
  const [searchInput, setSearchInput] = useState<string>("")
  const debouncedInput = useDebounce(searchInput, 200)
  const [checked, setChecked] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<string | undefined>('All')
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(5)
  const [height, setHeight] = useState<number | undefined>(undefined)
  const topContentRef = useRef<HTMLDivElement>(null)
  const bottomContentRef = useRef<HTMLDivElement>(null)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  useEffect(() => {
    if (topContentRef.current && bottomContentRef.current) {
      const totalHeight = topContentRef.current?.clientHeight + bottomContentRef.current?.clientHeight
      setHeight(totalHeight)
    }
  }, [])

  if (!window) return null

  const finalHeight = window.innerHeight - (height ?? 0) - Offset

  return (
    <>
      <div className='h-full flex !z-[9999] absolute left-0 cursor-auto shadow-md'>
        <div className='h-full max-w-xl bg-white cursor-auto shadow-lg flex flex-col justify-between'>
          <div className='p-5 flex flex-col'>
            <div ref={topContentRef}>
              <div className='flex items-center gap-2 mr-5 mb-4'>
                <Search value={debouncedInput} onChange={e => setSearchInput(e.target.value)} />
                <button onClick={() => setFilterOpen(true)} className='cursor-pointer flex text-base items-center gap-2 border rounded-full border-blue-700 px-4 py-[10px] text-blue-700'>
                  <MdFilterList size={24} color='blue' />
                  Filters
                </button>
              </div>
              <Tabs selectedTab={selectedTab} onTabSelect={(value) => setSelectedTab(value)} />
              <div className='mt-6 pb-4'>
                <Checkbox label='Select all properties' checked={checked} onChange={e => setChecked(e.target.checked)} />
              </div>
            </div>
            {height && <div style={{
              height: finalHeight
            }} className={`overflow-y-scroll flex flex-col`}>
              <PropertyList selectedTab={selectedTab} checked={checked} searchInput={debouncedInput} />
            </div>}
          </div>
          <div ref={bottomContentRef}>
            <Footer />
          </div>
        </div>
        <div className={`h-full bg-white px-5 pt-5 cursor-auto shadow-md ${filterOpen ? 'w-80' : 'w-0 invisible'} transition-all`}>
          <button onClick={() => setFilterOpen(false)} className='flex justify-end items-center ml-auto'><MdOutlineClose size={24} color='gray' /></button>
          {
            filterOpen && (
              <>
                <div className="flex flex-col gap-6">
                  {
                    filterData.map(data => <Filter maxValue={maxValue} minValue={minValue}
                      onMaxDecrement={() => setMaxValue(prev => prev - 1)}
                      onMaxIncrement={() => setMaxValue(prev => prev + 1)}
                      onMinDecrement={() => setMinValue(prev => prev - 1)}
                      onMinIncrement={() => setMinValue(prev => prev + 1)}
                      title={data}
                      key={data}
                    />)
                  }
                </div>
                <div className='absolute bottom-0 right-5 p-5 flex gap-4'>
                  <button className='border border-blue-800 text-blue-700 bg-white rounded-full px-5 text-sm py-2'>Reset</button>
                  <button className='border border-blue-800 text-white bg-blue-700 rounded-full px-5 text-sm py-2'>Apply</button>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar