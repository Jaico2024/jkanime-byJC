function searchResults(query) {
  const url = `https://jkanime.net/buscar/${query.toLowerCase().replace(/ /g, "-")}`;
  const doc = fetchv2(url);
  const results = [];

  doc.select("div.anime__item").forEach((el) => {
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

  return results;
}

function extractDetails(url) {
  const doc = fetchv2(url);
  const title = doc.selectFirst("h1")?.text() || "";
  const description = doc.selectFirst(".anime__details__text > p")?.text() || "";
  const image = doc.selectFirst(".anime__details__pic > img")?.attr("src") || "";

  return {
    title,
    description,
    image
  };
}

function extractEpisodes(url) {
  const doc = fetchv2(url);
  const episodes = [];

  // Buscamos todos los enlaces que puedan contener episodios
  doc.select("ul.episodes li a").forEach((el, index) => {
    const epUrl = el.attr("href");
    const epTitle = el.text().trim() || `Episodio ${index + 1}`;
    if (epUrl) {
      episodes.push({
        title: epTitle,
        url: epUrl
      });
    }
  });

  return episodes;
}

function extractStreamUrl(episodeUrl) {
  const doc = fetchv2(episodeUrl);
  const iframe = doc.selectFirst("iframe");
  if (iframe) {
    return iframe.attr("src");
  }
  return "";
}
