import { useState, useEffect } from 'react';

export default function useFetch(urls, type = 'json') {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(null);

  async function fetchData() {
    try {
      const fetchedData = await Promise.all(
        urls.map(async url =>
          fetch(url).then(response => {
            if (type === 'json') {
              return response.json();
            }

            return response.text();
          })
        )
      );
      setData(fetchedData);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(urls);
  }, [urls]);

  return [data, isLoading, hasError];
}
