'use client'

import useApiDataStore from '@/store/useApiDataStore'
import React from 'react'

import { SlArrowLeft } from 'react-icons/sl'
import { SlArrowRight } from 'react-icons/sl'

const Footer = () => {
    const currentPage = useApiDataStore(state => state.currentPage)
    const pageInfo = useApiDataStore(state => state.pageInfo)
    const listings = useApiDataStore(state => state.listings)
    const listLoading = useApiDataStore(state => state.listLoading)
    const setCurrentPage = useApiDataStore(state => state.setCurrentPage)

    const handleNextPage = currentPage ? () => setCurrentPage(currentPage + 1) : () => { }
    const handlePreviousPage = currentPage ? () => setCurrentPage(currentPage - 1) : () => { }

    return (
        <footer className='w-full p-5 bg-white flex justify-between'>
            <p className='flex-[0.45] text-sm text-zinc-500'>Viewing 1 - {listings?.length} of {listings?.length} properties.</p>
            <div className='flex-1 gap-6 flex justify-end items-center'>
                <button
                    onClick={handlePreviousPage}
                    className={`${(currentPage === 1 || listLoading) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}  rounded-full p-2 border border-gray-400`}
                    disabled={currentPage === 1 || listLoading}
                >
                    <SlArrowLeft size={16} color="gray" />
                </button>
                <span className='text-sm flex items-center justify-end gap-2'>
                    <p className='text-gray-500'>Page</p>
                    <p className='py-1 px-[10px] text-gray-500 rounded-md border border-solid border-gray-400'>{currentPage}</p>
                    <p className='text-gray-500'>/ {pageInfo?.totalPages ?? 1}</p>
                </span>
                <button
                    onClick={handleNextPage}
                    className={`${(currentPage === pageInfo?.totalPages || listLoading) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} rounded-full p-2 border border-gray-400`}
                    disabled={currentPage === pageInfo?.totalPages || listLoading}
                >
                    <SlArrowRight size={16} color="gray" />
                </button>
            </div>
        </footer>
    )
}

export default Footer