import { useState, useEffect } from 'react';

import fileExtension from 'utils/fileExtension';

async function fetchUrls(urls, cb) {
  const data = await Promise.all(
    urls.map(async url =>
      fetch(url).then(response => {
        let ext;

        if (response && response.url) {
          ext = fileExtension(response.url);
        }

        if (ext === 'json' || ext === 'geojson') {
          return response.json();
        }

        return response.text();
      })
    )
  );

  cb(data);
}

export default function useFetch(urls) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls(urls, fetchedData => {
      setData(fetchedData);
      setLoading(false);
    });
  }, []);

  return [data, isLoading];
}
