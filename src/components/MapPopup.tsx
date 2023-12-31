import useApiDataStore from '@/store/useApiDataStore'
import { removePropertyFromList } from '@/utils/helperFunctions'
import React from 'react'

const MapPopup = () => {
    const currentListing = useApiDataStore(state => state.currentListing)
    const listings = useApiDataStore(state => state.listings)
    const setListings = useApiDataStore(state => state.setListings)

    if (!currentListing) return null

    const { images, propertyType, sleeps, bedrooms, bathrooms, propertyId } = currentListing
    const bathroomCount = bathrooms?.full ?? 0 + bathrooms?.half ?? 0 + bathrooms?.toiletOnly ?? 0

    let countData = []
    if (bathrooms) countData.push(`${bathroomCount} br`)
    if (bedrooms) countData.push(`${bedrooms} ba`)
    if (sleeps) countData.push(`Sleeps ${sleeps}`)

    return (
        <div className='flex items-start gap-4'>
            {images?.[0]?.c6_uri && <img src={images?.[0]?.c6_uri} alt={images?.[0]?.altText} className='w-20 h-20 rounded-md' />}
            <div className='flex flex-col w-full'>
                {propertyType && <p className='whitespace-nowrap !mt-0 !mb-2 text-lg'>{propertyType}</p>}
                {countData.length > 0 && <p className='!m-0 whitespace-nowrap text-gray-500 text-sm'>{countData.join(' . ')}</p>}
                <button onClick={() => removePropertyFromList(setListings, propertyId, listings)} className=' mt-3 flex justify-end text-blue-500 text-sm font-semibold'>Remove</button>
            </div>
        </div>
    )
}

export default React.memo(MapPopup)