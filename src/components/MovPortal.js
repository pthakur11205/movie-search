import { useState } from "react";

// Component for searching and user interaction
function MovPortalComponent() {

    // For rerendering the div info when the searchUserInput method is used
    const [searchUserInput, setSearchUserInput] = useState('')
    const [enteredText, setEnteredText] = useState('')

    // Stores the user's input upon the user searching
    const onSearchEnter = (evt) => {
        evt.preventDefault();
        setEnteredText(searchUserInput);
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
        {enteredText}
      </>
    );
  }
  
  export default MovPortalComponent;