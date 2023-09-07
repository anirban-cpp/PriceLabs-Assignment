"use client"

import useApiDataStore from "@/store/useApiDataStore";
import { useMap } from "react-leaflet";

export function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  const zoom = useApiDataStore(state => state.zoom)
  map.setView(coords, zoom);
  return null;
}
