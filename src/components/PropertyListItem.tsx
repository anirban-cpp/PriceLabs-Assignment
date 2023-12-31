import React, { useEffect, useRef, useState } from 'react'
import Checkbox from './Checkbox';
import Rating from './Rating';
import { PropertyListItemProps } from '@/interfaces';
import useApiDataStore from '@/store/useApiDataStore';
import { removePropertyFromList } from '@/utils/helperFunctions';

const PropertyListItem = ({
  match,
  rating,
  reviews,
  checked = false,
  bathrooms,
  bedrooms,
  imageSrc,
  sleeps,
  alt,
  name,
  propertyId,
  onClick
}: PropertyListItemProps) => {

  const propertyItemRef = useRef<HTMLDivElement>(null)
  const [check, setCheck] = useState<boolean>()
  const currentListing = useApiDataStore(state => state.currentListing)
  const checkedProperties = useApiDataStore(state => state.checkedProperties)
  const setCheckedProperties = useApiDataStore(state => state.setCheckedProperties)
  const listings = useApiDataStore(state => state.listings)
  const setListings = useApiDataStore(state => state.setListings)

  let countData = []
  if (bathrooms) countData.push(`${bathrooms} br`)
  if (bedrooms) countData.push(`${bedrooms} ba`)
  if (sleeps) countData.push(`Sleeps ${sleeps}`)

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.checked)
    if (!propertyId || propertyId.length === 0) {
      setCheck(!event.target.checked)
      return;
    }
    let data = checkedProperties
    if (checkedProperties?.includes(propertyId)) {
      data = data?.filter(item => item !== propertyId)
      setCheckedProperties(data)
    } else {
      data = data ? [...data, propertyId] : [propertyId]
      setCheckedProperties(data)
    }
  }

  useEffect(() => {
    if (currentListing && propertyItemRef.current) {
      if (currentListing?.propertyId === propertyId)
        propertyItemRef.current?.scrollIntoView({
          behavior: 'smooth',
        })
    }
  }, [currentListing])

  return (
    <div ref={propertyItemRef} onClick={onClick} className='shadow-md cursor-pointer shadow-gray-100 w-full py-5 px-3 flex items-center gap-4 border-b border-b-gray-300 hover:shadow-lg transition-all !duration-300'>
      <Checkbox checked={check ?? checked} onChange={handleClick} />
      {imageSrc && <img src={imageSrc} alt={alt} className='w-28 h-28' />}
      <div className='flex flex-col gap-3'>
        {match && <p className={`text-sm ${match >= 75 ? 'text-green-700' : 'text-yellow-500'}`}>{match} % Match</p>}
        <span className='flex flex-col gap-1'>
          {name && <p className={`text-sm text-gray-500 w-72 whitespace-nowrap overflow-x-hidden text-ellipsis`}>{name}</p>}
          {countData.length > 0 && <p className='text-gray-500 text-sm'>{countData.join(' . ')}</p>}
        </span>
        <div className='flex items-center justify-between'>
          <Rating rating={rating} reviews={reviews} />
          <button onClick={() => removePropertyFromList(setListings, propertyId, listings)} className='text-blue-500 text-sm font-semibold cursor-pointer rounded-md hover:px-2 hover:py-1 hover:border hover:border-blue-500 transition-all'>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default PropertyListItem