import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
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
    
    margin-bottom: '70px'
  }
`;

// Ubicación específica del marcador
const markerPosition = {
  lat: -34.589526,
  lng: -58.387662,
};

const MapApi = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlGJl8nxle0axqsuGbvFPImxnk9_ijw9Y', // Reemplaza con tu clave de API
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <MapContainer>
      <GoogleMap
        center={markerPosition}
        zoom={11}
        mapContainerStyle={{ height: '100%', width: '100%' }}
      >
        <MarkerF 
          position={markerPosition}
        />
      </GoogleMap>
    </MapContainer>
  );
};

export default MapApi;