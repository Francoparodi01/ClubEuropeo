import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import WorldFlag from 'react-world-flags';

const flags = [
  { code: 'BE', alt: 'Belgium' },
  { code: 'BG', alt: 'Bulgaria' },
  { code: 'CZ', alt: 'Czechia' },
  { code: 'DK', alt: 'Denmark' },
  { code: 'DE', alt: 'Germany' },
  { code: 'EE', alt: 'Estonia' },
  { code: 'IE', alt: 'Ireland' },
  { code: 'GR', alt: 'Greece' },
  { code: 'ES', alt: 'Spain' },
  { code: 'FR', alt: 'France' },
  { code: 'HR', alt: 'Croatia' },
  { code: 'IT', alt: 'Italy' },
  { code: 'CY', alt: 'Cyprus' },
  { code: 'LV', alt: 'Latvia' },
  { code: 'LT', alt: 'Lithuania' },
  { code: 'LU', alt: 'Luxembourg' },
  { code: 'HU', alt: 'Hungary' },
  { code: 'MT', alt: 'Malta' },
  { code: 'NL', alt: 'Netherlands' },
  { code: 'AT', alt: 'Austria' },
  { code: 'PL', alt: 'Poland' },
  { code: 'PT', alt: 'Portugal' },
  { code: 'RO', alt: 'Romania' },
  { code: 'SI', alt: 'Slovenia' },
  { code: 'SK', alt: 'Slovakia' },
  { code: 'FI', alt: 'Finland' },
  { code: 'SE', alt: 'Sweden' }
];

export default function FlagCarousel() {
  return (
    <>
      <Swiper
        rewind={true}
        spaceBetween={5}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{ delay: 900 }}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 10,
            spaceBetween: 35,
          },
          1440: {
            slidesPerView: 12,
            spaceBetween: 40,
          },
        }}
      >
        {flags.map((flag, index) => (
          <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WorldFlag
              code={flag.code}
              alt={flag.alt}
              style={{
                width: 'auto', // Ajuste de ancho al 90% del contenedor
                height: '40px',
                marginBottom: '10px',
                boxSizing: 'border-box',
                border: '1px solid #aaaaaa',
                marginTop: '60px'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
