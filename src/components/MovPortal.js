import { useState } from "react";
// Component for searching and user interaction
function MovPortalComponent() {

    // For rerendering the div info when the searchUserInput method is used
    const [searchUserInput, setSearchUserInput] = useState('')
    const [enteredText, setEnteredText] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    // Stores the user's input upon the user searching
    const onSearchEnter = async (evt) => {
      evt.preventDefault();
      setEnteredText(searchUserInput);
      setLoading(true);
      setError(null);
      
      await getMovies(searchUserInput, setMovies, (error) => {
          setError(error);
          setLoading(false);
      });

      setLoading(false);
  }
    return (
    <>
      <div className="row">
        <div className="col">
            <form onSubmit={onSearchEnter}>
                <input 
                    type = "text" placeholder="Search Movie/TV Show" className="form-control"
                    value={searchUserInput} onChange={(evt) => setSearchUserInput(evt.target.value)}
                />
            </form>
        </div>
      </div>
        {/* Loading indicator */}
        {loading && <div>Loading...</div>}
        {/* Error message */}
        {error && <div class="alert alert-dismissible alert-warning">
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">'{enteredText}': '{error}'</p>
        </div>}
        {/* Number of results for search query */}
        {movies.length > 0 && <p>Showing {movies.length} results for "{enteredText}"</p>}
        {JSON.stringify(movies)}
      </>
    );
  }


  



  /** FOR FETCHING FROM API
   * Function for getting movies from user's search text
   * @param userSearch - the text the user inputted
   * @param movieCallback - for displaying movie data
   * @param errorCallback - for displaying error message
   */
  export const getMovies = async (userSearch, movieCallback, errorCallback) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${userSearch}&apikey=9e6cc908`)
        const data = await response.json();

        if(data.Response === 'True') {
          const movieDetailResults = data.Search.map((movie) => fetchDetails(movie.imdbID, errorCallback))
          const movDetails = await Promise.all(movieDetailResults)
          
          movieCallback(movDetails)
          errorCallback(null)
        } else {
          movieCallback([])
          errorCallback(data.Error)
        }
    } catch (err) {
        movieCallback([])
        errorCallback('An error ocurred while trying fetch the data')
    }
  }

  /**
   * For fetching the movie details based on the id
   * @param {*} idNum - the IMDB ID for the API's functioning to get movie details
   * @param {*} errorCallback - for displaying error message
   * @returns details if movie details are found otherwise an error
   */
  const fetchDetails = async(idNum, errorCallback) => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${idNum}&plot=full&apikey=9e6cc908`)
        const data = await response.json();

        if(data.Response === 'True') {
          return data;
        } else {
          throw new Error(data.Error);
        }
      } catch (err) {
          errorCallback('An error ocurred while trying fetch the data')
      }
  }

    
  export default MovPortalComponent;