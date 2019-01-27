import React from "react";
import SelectedAsteroidsList from "./SelectedAsteroidsList";

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      // List of all passed asteroids
      filteredAsteroids: [],
      // Asteroids selected by the user
      selectedAsteroids: [],
      asteroidNames: []
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.filteredAsteroids !== this.props.filteredAsteroids) {
      return "newAsteroids";
    }
    return null;
  }

  componentDidUpdate(nextProps, nextState, snapshot) {
    if (snapshot === "newAsteroids") {
      this.setState({ filteredAsteroids: this.props.filteredAsteroids });
    }
  }

  onInputChange = e => {
    const { filteredAsteroids } = this.state;
    const userInput = e.currentTarget.value;
    const suggestionsArr = [];

    filteredAsteroids.forEach(asteroid => {
      suggestionsArr.push(asteroid.name);
    });

    const filteredSuggestions = suggestionsArr.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  updateSelectedAsteroids = asteroidName => {
    let asteroidExists = false;

    if (!this.state.selectedAsteroids.length) {
      this.findAsteroids(asteroidName);
      this.setState({ userInput: "", asteroidNames: [asteroidName] });
    } else {
      const exists = this.state.asteroidNames.find(name => {
        return name === asteroidName;
      });
      if (exists === asteroidName) {
        alert(`${asteroidName} is already in the list of selected asteroids`);
        this.setState({ userInput: "" });
        return;
      } else if (exists !== asteroidName) {
        this.findAsteroids(asteroidName);
        this.setState(prevState => ({
          asteroidNames: [...prevState.asteroidNames, asteroidName],
          userInput: ""
        }));
      }
    }
  };

  findAsteroids(asteroidName) {
    // add the asteroids selected by user to the list
    const { selectedAsteroids, filteredAsteroids } = this.state;

    filteredAsteroids.forEach(currentAsteroid => {
      if (currentAsteroid.name === asteroidName) {
        this.setState({
          selectedAsteroids: [...selectedAsteroids, currentAsteroid]
        });
      }
    });
  }

  onClick = e => {
    this.setState(
      {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      },
      () => {
        this.updateSelectedAsteroids(this.state.userInput);
      }
    );
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState(
        {
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: filteredSuggestions[activeSuggestion]
        },
        () => this.updateSelectedAsteroids(this.state.userInput)
      );
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion - 1,
        userInput: filteredSuggestions[activeSuggestion - 1]
      });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({
        activeSuggestion: activeSuggestion + 1,
        userInput: filteredSuggestions[activeSuggestion + 1]
      });
    }
  };

  render() {
    const {
      onInputChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            <style jsx>{`
              .suggestions {
                list-style-type: none;
              }
              .suggestions > li {
                cursor: pointer;
              }
              .suggestions > li:hover {
                background-color: rgba(0, 0, 0, 0.1);
                cursor: pointer;
              }
              .suggestion-active:hover {
                background-color: rgba(0, 0, 0, 0.1);
                cursor: pointer;
              }
            `}</style>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a className
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return (
      <div
        style={{
          display: "flex",
          margin: "20px 0"
        }}
      >
        <div className="search-input-holder">
          <style jsx>{`
            .search-input-holder {
              flex: 2;
              margin-right: 20px;
            }
            .search-input {
              width: 100%;
              padding: 7px;
              border: 1px solid #222;
              outline: none;
            }
            .search-list-holder {
              flex: 3;
            }
          `}</style>
          <input
            type="text"
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            value={userInput}
            className="search-input"
            placeholder="Search asteroids to add to list..."
          />
          {suggestionsListComponent}
        </div>
        <div className="search-list-holder">
          <SelectedAsteroidsList
            selectedAsteroids={this.state.selectedAsteroids}
          />
        </div>
      </div>
    );
  }
}

export default Autocomplete;
