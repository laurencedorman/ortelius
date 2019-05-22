import { useEffect, useState } from 'react';

export default function useDocumentDimensions() {
  const getWindowDimensions = () => {
    const { clientHeight, clientWidth } = window.document.documentElement;

    return {
      height: clientHeight,
      width: clientWidth
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
