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
        slidesPerView={12}
        rewind={true}
        spaceBetween={5}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{ delay: 900 }}
        className="mySwiper"
      >
        {flags.map((flag, index) => (
          <SwiperSlide key={index}>
            <WorldFlag
              code={flag.code}
              alt={flag.alt}
              style={{ width: '300px', height: '30px', marginTop: '10px', marginBottom: '15px'}} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
    
  );
}
