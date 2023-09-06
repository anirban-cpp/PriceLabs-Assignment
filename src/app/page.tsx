'use client'

import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { ApiDataType } from "@/interfaces";
import useApiDataStore from "@/store/useApiDataStore";
import fetchdata from "@/utils/apiCalls";
import { useEffect } from "react";

export default function Home() {
  const {
    setError,
    setFilterGroups,
    setListings,
    setPropertyTypes,
    setPageInfo,
    setListLoading,
    listings,
    currentPage,
    ...data
  } = useApiDataStore(state => state)

  useEffect(() => {
    setListLoading(true)
    fetchdata<ApiDataType>(currentPage).then(res => {
      if (res) {
        setFilterGroups(res?.data.results?.filterGroups)
        setListings(res?.data?.results?.listings)
        setPageInfo(res?.data?.results?.pageCount, res?.data?.results?.pageSize)
        setError(undefined)
      }
    })
      .catch(_err => setError("Error"))
      .finally(() => setListLoading(false))
  }, [currentPage])

  useEffect(() => {
    setPropertyTypes(listings)
  }, [listings])

  if (typeof window === undefined) return null

  return (
    <main>
      <Sidebar />
      <Map />
    </main>
  )
}
