import useApiDataStore from '@/store/useApiDataStore'
import React from 'react'
import { MdZoomInMap } from 'react-icons/md'
import { MdZoomOutMap } from 'react-icons/md'

const Zoom = () => {

    const setZoom = useApiDataStore(state => state.setZoom)
    const zoom = useApiDataStore(state => state.zoom)

    return (
        <div className='flex flex-col rounded-md absolute top-5 right-5 gap-1 !z-[9999]'>
            <button onClick={() => setZoom(zoom+1)} className='shadow-md p-3 border-gray-400 bg-slate-50'>
                <MdZoomInMap size={16} />
            </button>
            <button onClick={() => setZoom(zoom-1)} className='shadow-md p-3 border-gray-400 bg-slate-50'>
                <MdZoomOutMap size={16} />
            </button>
        </div>
    )
}

export default Zoom