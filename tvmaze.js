const TVMAZE_BASE_URL = "https://api.tvmaze.com";
const TVMAZE_SHOWS_RESOURCE = "/search/shows?";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {

  const searchParams = new URLSearchParams({ q: term });

  const response = await
    fetch(`${TVMAZE_BASE_URL}${TVMAZE_SHOWS_RESOURCE}${searchParams}`);

  const dataForShows = await response.json();

  console.log("dataForShows=", dataForShows);

  const shows = dataForShows.map(searchResults => {
    const id = searchResults.show.id;
    const name = searchResults.show.name;
    const summary = searchResults.show.summary;
    const image = !searchResults.show.image
      ? "https://tinyurl.com/tv-missing"
      : searchResults.show.image.original;
    return { id, name, summary, image };
  });

  return shows;
}


// ADD: other functions that will be useful for getting episode/show data



export { getShowsByTerm, TVMAZE_BASE_URL };