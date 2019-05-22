export default async items =>
  Promise.all(items.map(({ url }) => fetch(url).then(response => response.json())));
