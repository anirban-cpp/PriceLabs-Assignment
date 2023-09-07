'use client'

import React, { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet/dist/leaflet.css';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { getBoundedProperties, getCenterCoordinates, getCheckedPropertiesinListed, getPosition } from '@/utils/helperFunctions';
import { markerIcon } from '@/utils/constants';
import { ChangeView } from './ChangeView';
import useApiDataStore from '@/store/useApiDataStore';
import MapPopup from './MapPopup';
import { CircleMarker, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'

export default function Map() {
    const [geoData, setGeoData] = useState<{ lat: number, lng: number }>();
    const currentListing = useApiDataStore(state => state.currentListing)
    const setCurrentListing = useApiDataStore(state => state.setCurrentListing)
    const checkedProperties = useApiDataStore(state => state.checkedProperties)
    const setCheckedProperties = useApiDataStore(state => state.setCheckedProperties)
    const listings = useApiDataStore(state => state.listings)
    const zoom = useApiDataStore(state => state.zoom)
    const [positions, setPositions] = useState<{
        lat: number;
        lng: number;
        propertyId?: string;
    }[] | undefined>()

    useEffect(() => {
        if (checkedProperties && checkedProperties.length > 0 && listings && listings?.length > 0) {
            const requiredProperties = getCheckedPropertiesinListed(checkedProperties, listings)
            const geoData = requiredProperties ? requiredProperties.map(data => ({
                lat: data.geoCode.latitude,
                lng: data.geoCode.longitude,
                propertyId: data.propertyId
            })) : undefined
            setPositions(geoData)
        } else if (currentListing && currentListing?.geoCode?.latitude && currentListing?.geoCode?.longitude) {
            setPositions(undefined)
            const { latitude, longitude } = currentListing.geoCode
            setGeoData({ lat: latitude, lng: longitude })
        } else {
            setPositions(undefined)
            getPosition(setGeoData)
        }
    }, [currentListing, checkedProperties, listings])

    const onCircleMarkerClick = (propertyId?: string) => {
        if (!propertyId) return;
        const property = listings?.find(item => item.propertyId === propertyId)
        if (property) setCurrentListing(property)
    }

    const handleCreate = (event: any) => {
        const geoCodeNorthEast: { lat: number, lng: number } | undefined = event?.layer?._bounds?._northEast
        const geoCodeSouthWest: { lat: number, lng: number } | undefined = event?.layer?._bounds?._southWest
        const boundedProperties = getBoundedProperties(listings, geoCodeNorthEast, geoCodeSouthWest)
        const boundedPropertiesID = boundedProperties?.map(item => item.propertyId)
        if(boundedPropertiesID) setCheckedProperties(boundedPropertiesID)
    }

    const handleEdit = (event: any) => {
        const geoCodeNorthEast: { lat: number, lng: number } | undefined = event?.layer?._bounds?._northEast
        const geoCodeSouthWest: { lat: number, lng: number } | undefined = event?.layer?._bounds?._southWest
        const boundedProperties = getBoundedProperties(listings, geoCodeNorthEast, geoCodeSouthWest)
        const boundedPropertiesID = boundedProperties?.map(item => item.propertyId)
        if(boundedPropertiesID) setCheckedProperties(boundedPropertiesID)
    }

    if (!window || !geoData) return null

    const center = getCenterCoordinates(geoData, positions, currentListing)

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100vh' }}>
            <FeatureGroup>
                <EditControl
                    position='topright'
                    draw={{
                        rectangle: true,
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polygon: false,
                        polyline: false
                    }}
                    onCreated={handleCreate}
                    onEdited={handleEdit}
                />
            </FeatureGroup>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                positions && positions.length > 0 && positions.map((marker, i) => (
                    <React.Fragment key={marker.lat + '-' + marker.lng + '-' + i}>
                        <CircleMarker eventHandlers={{
                            click: () => onCircleMarkerClick(marker?.propertyId)
                        }} center={[marker.lat, marker.lng]}>
                            <Popup keepInView minWidth={300}>
                                <MapPopup />
                            </Popup>
                        </CircleMarker >
                    </React.Fragment>
                ))
            }
            {geoData.lat && geoData.lng && (!positions || positions.length === 0) && (
                <>
                    <Marker icon={markerIcon} position={[geoData.lat, geoData.lng]}>
                        <Popup keepInView minWidth={300}>
                            <MapPopup />
                        </Popup>
                    </Marker>
                </>
            )}
            <ChangeView coords={center} />
        </MapContainer>
    );
}
