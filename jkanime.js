function searchResults(query) {
  const url = `https://jkanime.net/buscar/${query.toLowerCase().replace(/ /g, "-")}`;

  const doc = fetchv2(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Referer": "https://jkanime.net/"
    }
  });

  const results = [];
  const items = doc.select("div.anime__item");

  if (!items || items.length === 0) {
    console.log("❌ No se encontraron resultados para:", query);
    return [];
  }

  items.forEach((el) => {
    const title = el.selectFirst("h5 > a")?.text() || "Sin título";
    const animeUrl = el.selectFirst("h5 > a")?.attr("href");
    const image = el.selectFirst(".anime__item__pic")?.attr("data-setbg");
    if (title && animeUrl) {
      results.push({
        title,
        url: animeUrl,
        image
      });
    }
  });

  console.log("✅ Resultados encontrados:", results.length);
  return results;
}
