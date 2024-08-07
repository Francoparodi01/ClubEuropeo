import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '2rem 0' }}>
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      style={{
        position: 'relative',
        display: 'flex',
        margin: '0 auto',
        width: 'fit-content',
        borderRadius: '50px',
        border: '2px solid black',
        backgroundColor: 'white',
        padding: '0.5rem',
      }}
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Pricing</Tab>
      <Tab setPosition={setPosition}>Features</Tab>
      <Tab setPosition={setPosition}>Docs</Tab>
      <Tab setPosition={setPosition}>Blog</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'block',
        cursor: 'pointer',
        padding: '0.75rem 1rem',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        color: 'white',
        mixBlendMode: 'difference',
        md: { padding: '1rem 1.5rem', fontSize: '1rem' },
      }}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      style={{
        position: 'absolute',
        zIndex: 0,
        height: '1.75rem',
        borderRadius: '50px',
        backgroundColor: 'black',
        md: { height: '3rem' },
      }}
    />
  );
};
