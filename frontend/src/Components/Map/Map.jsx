import React, { useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

// Estilo personalizado para el contenedor del mapa
const MapContainer = styled.div`
  height: 55vh;
  width: 100%;

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const MapApi = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: -34.589526,
    lng: -58.387662,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlGJl8nxle0axqsuGbvFPImxnk9_ijw9Y',
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <MapContainer>
      <GoogleMap
        center={markerPosition}
        zoom={11}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        onClick={(e) => setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
      >
        {/* Añadimos el marcador */}
        <Marker 
          position={markerPosition}
          onClick={() => setMarkerPosition(prevPosition => ({
            lat: prevPosition.lat + 0.01,
            lng: prevPosition.lng + 0.01,
          }))}
        />
      </GoogleMap>
    </MapContainer>
  );
};

export default MapApi;
