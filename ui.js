import { getShowsByTerm, TVMAZE_BASE_URL } from "./tvmaze.js";

const $showsList = document.querySelector("#showsList");
const $episodesArea = document.querySelector("#episodesArea");
const $searchForm = document.querySelector("#searchForm");

/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.innerHTML = '';


  for (const show of shows) {
    const $show = document.createElement("div");
    $show.dataset.showId = show.id;
    $show.className = "Show col-md-12 col-lg-6 mb-4";

    $show.innerHTML = `
         <div class="media">
           <img
              src=${show.image}
              alt=${show.name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes"
             data-id=${show.id}>
               Episodes
             </button>
           </div>
         </div>
      `;

    $showsList.appendChild($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = document.querySelector("#searchForm-term").value;
  const shows = await getShowsByTerm(term);
  console.log("shows=", shows);

  $episodesArea.style.display = "none";
  displayShows(shows);
}

//TODO: keep API materials together? Could put this function in tvmaze.js
/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {

  const response = await fetch(`${TVMAZE_BASE_URL}/shows/${id}/episodes`);
  const dataForEpisodes = await response.json();
  console.log("dataForEpisodes=", dataForEpisodes);

  const episodes = dataForEpisodes
    .map(({ id, name, season, number }) => ({ id, name, season, number }));

  console.log("episodes=", episodes);
  return episodes;
}

/** Take an array of episodes info and append the info to the DOM.
 *  Reveal episode area.
*/

function displayEpisodes(episodes) {

  for (const episode of episodes) {
    const $episodeInfo = document.createElement("li");
    //TODO: set innerHTML to be an empty string
    $episodeInfo.innerText =
      `${episode.name} (season ${episode.season}, number ${episode.number})`;

    const $episodesList = document.querySelector("#episodesList");
    $episodesList.append($episodeInfo);
  }

  $episodesArea.style.display = "block";

}

/**   Get information on a show's episodes from API.
 *    Display details for episodes in the DOM.
 */

async function getEpisodesAndDisplay(showId) {

  const episodes = await getEpisodesOfShow(showId);
  console.log(episodes);
  displayEpisodes(episodes);

}

/** Handle click on a show episodes button  */

async function handleClickOnEpisodesButton(evt) {

  console.log("evt.target=", evt.target);
  if (!evt.target.matches('.Show-getEpisodes')) return;

  console.log("Episodes button was clicked!");
  const showID = getShowID(evt.target);
  await getEpisodesAndDisplay(showID);

}

//TODO: initialize inside start method (just be consistent)
$showsList.addEventListener("click", handleClickOnEpisodesButton);

/** Get the ID of a show  */

function getShowID(button) {
  return button.dataset.id;
}

/** Attach event listeners to show search form and show list  */

function start() {
  $searchForm.addEventListener("submit", async function handleSearchForm(evt) {
    evt.preventDefault();
    await searchShowsAndDisplay();
  });
}


export {
  displayShows,
  searchShowsAndDisplay,
  start,
};