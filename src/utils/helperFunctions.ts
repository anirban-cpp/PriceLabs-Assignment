import { Listing } from "@/interfaces";
import { SetStateAction } from "react";

export const getPosition = async (
  setGeoData: React.Dispatch<
    SetStateAction<
      | {
          lat: number;
          lng: number;
        }
      | undefined
    >
  >
) => {
  await navigator.geolocation.getCurrentPosition(
    (position) =>
      setGeoData({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
    (err) => console.log(err)
  );
};

export const getPropertyTypes = (listings?: Listing[]) => {
  if (!listings || listings.length === 0) return [];
  const propertyMap = new Map<string, number>();
  for (let listing of listings) {
    const propertyType = listing.propertyType;
    if (propertyMap.has(propertyType)) {
      const prevData = propertyMap.get(propertyType) ?? 1;
      propertyMap.set(propertyType, prevData + 1);
    } else propertyMap.set(propertyType, 1);
  }
  let result = [];
  for (let key of propertyMap.keys()) {
    const value = propertyMap.get(key);
    if (value)
      result.push({
        name: key,
        quantity: value,
      });
  }
  result.push({
    name: "All",
    quantity: listings.length,
  });
  result.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return result;
};

export const getListingBasedOnTab = (
  propertyList: Listing[],
  selectedTab: string
) => {
  if (selectedTab === "All") return propertyList;
  let filteredList = [];
  for (let property of propertyList) {
    if (property.propertyType === selectedTab) filteredList.push(property);
  }

  return filteredList;
};

export const getListingBasedOnSearch = (
  propertyList: Listing[],
  searchInput: string
) => {
  let filteredList = propertyList.filter(
    (item) =>
      item.propertyMetadata.headline
        .trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase()) ||
      item.propertyId
        .trim()
        .toLowerCase()
        .includes(searchInput.trim().toLowerCase())
  );

  return filteredList;
};

export const getCheckedPropertiesinListed = (
  checkedProperties: string[],
  listings: Listing[]
) => {
  let results = [];
  for (let propertyId of checkedProperties) {
    const item = listings.find((item) => item.propertyId === propertyId);
    if (item) results.push(item);
  }
  return results.length === 0 ? undefined : results;
};

export const getCenterCoordinates = (
  geoData: {
    lat: number;
    lng: number;
  },
  positions?: {
    lat: number;
    lng: number;
  }[],
  currentListing?: Listing
) => {
  let coordinates: [number, number] = [geoData.lat, geoData.lng];
  if (
    currentListing &&
    currentListing?.geoCode?.latitude &&
    currentListing?.geoCode?.longitude
  ) {
    const { latitude, longitude } = currentListing.geoCode;
    coordinates = [latitude, longitude];
  } else if (positions && positions.length > 0)
    coordinates = [positions[0].lat, positions[0].lng];

  return coordinates;
};

export const removePropertyFromList = (
  setListings: (value?: Listing[] | undefined) => void,
  propertyId?: string,
  listings?: Listing[]
) => {
  const newList = listings?.filter((item) => item.propertyId !== propertyId);
  if (newList && newList.length > 0) setListings(newList);
};

export const getBoundedProperties = (
  listings?: Listing[],
  geoCodeNorthEast?: { lat: number; lng: number },
  geoCodeSouthWest?: { lat: number; lng: number }
) => {
  if (!listings || !geoCodeNorthEast || !geoCodeSouthWest) return undefined;

  const { lat: neLat, lng: neLng } = geoCodeNorthEast;
  const { lat: swLat, lng: swLng } = geoCodeSouthWest;

  const boundedProperties = listings.filter((item) => {
    const { latitude, longitude } = item.geoCode;
    return (
      latitude >= swLat &&
      latitude <= neLat &&
      longitude >= swLng &&
      longitude <= neLng
    );
  });
  
  return boundedProperties
};
