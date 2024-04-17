/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

//debugger;

const TVMAZE_BASE_URL = "https://api.tvmaze.com";
const TVMAZE_SHOWS = "/search/shows?";
const TVMAZE_EPISODES = "http://api.tvmaze.com/shows/";

async function getShowsByTerm(term) {

  const searchParams = new URLSearchParams({ q: term });

  const response = await
    fetch(`${TVMAZE_BASE_URL}${TVMAZE_SHOWS}${searchParams}`);
  const showData = await response.json();

  console.log("showData=", showData);

  const shows = showData.map(show => {
    const id = show.show.id;
    const name = show.show.name;
    const summary = show.show.summary;
    const image = !show.show.image
      ? "https://tinyurl.com/tv-missing"
      : show.show.image.original;
    return { id, name, summary, image };
  });

  return shows;
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };