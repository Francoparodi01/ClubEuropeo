import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

// Estilo personalizado para el contenedor del mapa
const MapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const MapApi = () => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: -34.589526,
    lng: -58.387662,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlGJl8nxle0axqsuGbvFPImxnk9_ijw9Y', // Usa tu clave API
    libraries: ['marker'], // Asegúrate de incluir la biblioteca de marcadores
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = mapRef.current;

      // Cargar la API de Google Maps
      const { google } = window;

      if (google) {
        // Crear el marcador avanzado
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: markerPosition,
          // Otros parámetros opcionales
        });

        // Agregar un evento de clic al marcador
        marker.addListener('click', () => {
          setMarkerPosition(prevPosition => ({
            lat: prevPosition.lat + 0.01,
            lng: prevPosition.lng + 0.01,
          }));
        });
      } else {
        console.error('Google Maps API no está disponible.');
      }
    }
  }, [isLoaded, markerPosition]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <MapContainer>
      <GoogleMap
        onLoad={map => mapRef.current = map}
        center={markerPosition}
        zoom={11}
        mapContainerStyle={{ height: '100%', width: '100%' }}
      />
    </MapContainer>
  );
};

export default MapApi;
