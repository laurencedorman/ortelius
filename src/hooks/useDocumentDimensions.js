import { useEffect, useState } from 'react';

export default function useDocumentDimensions({ height, width }) {
  const getWindowDimensions = () => {
    const { clientHeight, clientWidth } = window.document.documentElement;

    return {
      height: height || clientHeight,
      width: width || clientWidth
    };
  };

  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  return dimensions;
}
