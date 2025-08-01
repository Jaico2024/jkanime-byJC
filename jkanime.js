function searchResults(query) {
  const proxyUrl = `https://jkanime-proxy-production.up.railway.app/jkanime?q=${encodeURIComponent(query)}`;
  const response = fetch(proxyUrl, {
    headers: {
      "Accept": "application/json"
    }
  });

  const data = JSON.parse(response.text());

  if (!data || data.length === 0) {
    console.log("❌ No se encontraron resultados en el proxy.");
    return [];
  }

  const results = data.map(item => ({
    title: item.title,
    url: item.url,
    image: item.image
  }));

  console.log(`✅ Resultados cargados desde proxy: ${results.length}`);
  return results;
}
