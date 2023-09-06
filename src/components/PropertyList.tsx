'use client'
import React, { useEffect, useState } from 'react'
import PropertyListItem from './PropertyListItem'
import useApiDataStore from '@/store/useApiDataStore'
import ListLoader from './Loader/ListLoader'
import { Listing, PropertyListProps } from '@/interfaces'
import { getListingBasedOnSearch, getListingBasedOnTab } from '@/utils/helperFunctions'
import SearchNotFound from './SearchNotFound'

const PropertyList = ({ checked = false, selectedTab, searchInput }: PropertyListProps) => {
    const propertyList = useApiDataStore(state => state.listings)
    const listLoading = useApiDataStore(state => state.listLoading)
    const [filteredListings, setFilteredListings] = useState<Listing[]>()
    const checkedProperties = useApiDataStore(state => state.checkedProperties)
    const setCheckedProperties = useApiDataStore(state => state.setCheckedProperties)
    const setCurrentListing = useApiDataStore(state => state.setCurrentListing)

    useEffect(() => {
        if ((searchInput && searchInput.length > 0) || (selectedTab && selectedTab.length > 0)) {
            if (selectedTab && selectedTab.length > 0 && propertyList && propertyList.length > 0) {
                const filteredData = getListingBasedOnTab(propertyList, selectedTab)
                setFilteredListings(filteredData)
            }
            if (searchInput && searchInput.length > 0 && propertyList && propertyList.length > 0) {
                const filteredData = getListingBasedOnSearch(propertyList, searchInput)
                setFilteredListings(filteredData)
            }
        } else setFilteredListings(propertyList)
    }, [propertyList, selectedTab, searchInput])

    useEffect(() => {
        if (checked) {
            const data = filteredListings?.map(data => data?.propertyId)
            if (data && data.length > 0) setCheckedProperties(data)
        }
        else setCheckedProperties([])
    }, [checked, filteredListings])

    if (listLoading) {
        return (
            <>
                {
                    [...Array(5)].map((_e, i) => <ListLoader key={i} />)
                }
            </>
        )
    }

    if (filteredListings?.length === 0) return <SearchNotFound />

    return (
        <>
            {
                filteredListings?.map((property) => {
                    const { listingId, averageRating, reviewCount, sleeps, bedrooms, bathrooms, images, propertyMetadata, propertyId } = property
                    const bathroomCount = bathrooms?.full ?? 0 + bathrooms?.half ?? 0 + bathrooms?.toiletOnly ?? 0
                    return (
                        <PropertyListItem
                            key={listingId}
                            rating={averageRating}
                            reviews={reviewCount}
                            sleeps={sleeps}
                            bedrooms={bedrooms}
                            bathrooms={bathroomCount}
                            imageSrc={images?.[0]?.c6_uri ?? images?.[0]?.c9_uri}
                            alt={images?.[0]?.altText}
                            name={propertyMetadata?.headline}
                            checked={checkedProperties?.includes(propertyId)}
                            propertyId={propertyId}
                            onClick={() => setCurrentListing(property)}
                        />
                    )
                })
            }
        </>
    )
}

export default PropertyList