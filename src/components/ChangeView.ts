"use client"

import { useMap } from "react-leaflet";

export function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}
