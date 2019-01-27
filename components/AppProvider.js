import React, { Component } from "react";

const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

class AppProvider extends Component {
  state = {
    selectedAsteroids: [],
    updateSelectedAsteroids: asteroids => {
      this.setState({ selectedAsteroids: asteroids });
    }
  };
  render() {
    return (
      <AppContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
