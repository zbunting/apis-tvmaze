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

  console.log(showData[0].show);

  return 


  // Loop through the array of episode objects
  // For each, pull out only the id, name, summary and image key-value pairs
  // If image value is null, put in a default image URL

  /*
    return [
      {
        id: 1767,
        name: "The Bletchley Circle",
        summary:
          `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
             women with extraordinary skills that helped to end World War II.</p>
           <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
             normal lives, modestly setting aside the part they played in
             producing crucial intelligence, which helped the Allies to victory
             and shortened the war. When Susan discovers a hidden code behind an
             unsolved murder she is met by skepticism from the police. She
             quickly realises she can only begin to crack the murders and bring
             the culprit to justice with her former friends.</p>`,
        image:
          "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
      }
    ];*/
}


// ADD: other functions that will be useful for getting episode/show data

export { getShowsByTerm };