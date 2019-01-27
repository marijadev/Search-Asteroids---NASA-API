import React, { Component } from "react";
import Link from "next/link";
import { AppConsumer } from "./AppProvider";

class SelectedAsteroids extends Component {
  constructor(props) {
    super(props);
    this.context = null;
    this.disabled = true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps !== this.props && this.props.selectedAsteroids.length) {
      return "new-asteroids";
    }
    return null;
  }

  componentDidUpdate(nextProps, nextState, snapshot) {
    if (snapshot === "new-asteroids") {
      this.context.state.updateSelectedAsteroids(this.props.selectedAsteroids);
      this.disabled = false;
    }
  }

  removeFromList(asteroid) {
    const { selectedAsteroids } = this.props;

    selectedAsteroids.forEach((currentAsteroid, i) => {
      if(currentAsteroid.id === asteroid.id){
       const newArr = selectedAsteroids.splice(i, 1);
       this.setState({selectedAsteroids: [...newArr]});
      } 
    });
  }

  displayAsteroids() {
    const { selectedAsteroids } = this.props;

    return selectedAsteroids.map(asteroid => (
      <li style={{ position: "relative" }} key={asteroid.id}>
        {asteroid.name}{" "}
        <span
          style={{ position: "absolute", right: 0, top: 0, cursor: "pointer" }}
          onClick={e => this.removeFromList(asteroid)}
        >
          x
        </span>
      </li>
    ));
  }
  render() {
    return (
      <AppConsumer>
        {context => {
          this.context = context;
          return (
            <div className="list-items-container">
              <style jsx>{`
                .list-items-holder {
                  list-style-type: none;
                  padding: 15px;
                  border: 1px solid #222;
                  margin: 0;
                }
                .btn {
                  background: #fff;
                  padding: 5px 15px;
                  border: 1px solid #222;
                  margin: 20px 0px;
                  color: #222;
                  cursor: pointer;
                  outline: none;
                  transition: 0.2s ease;
                }
                .btn:hover {
                  background: #222;
                  border: 1px solid #fff;
                  color: #fff;
                }
                .disabled-btn {
                  opacity: .3;
                  pointer-events: none;
                }
              `}</style>
              <ul className="list-items-holder">{this.displayAsteroids()}</ul>
              <Link href="./asteroid">
                <button className={this.disabled ? 'btn disabled-btn' : 'btn'}>Broj Prolazaka Pored Zemlje</button>
              </Link>
            </div>
          );
        }}
      </AppConsumer>
    );
  }
}

export default SelectedAsteroids;
