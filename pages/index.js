import axios from "axios";

import Layout from "../components/MainLayout";
import Table from "../components/Table";
import Autocomplete from "../components/Autocomplete";
import { daysDifference } from "../shared/utils";
import { NASA_URL } from "../shared/constants";

class Index extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    asteroids: [],
    filteredAsteroids: [],
    disabled: true
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate) {
      return "newStart";
    }
    if (prevState.endDate !== this.state.endDate) {
      return "newEnd";
    }
    return null;
  }

  componentDidUpdate(nextProps, nextState, snapshot) {
    if (snapshot === "newStart") {
      this.updateDateInput();
    } else if (snapshot === "newEnd") {
      this.updateDateInput();
    }
  }

  updateDateInput() {
    const allowAsteroidsFetch = daysDifference(
      this.state.startDate,
      this.state.endDate
    );
    allowAsteroidsFetch
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  }

  fetchAPI() {
    const start = this.state.startDate;
    const end = this.state.endDate;
    let asteroidsArray = [];

    axios.get(NASA_URL(start, end)).then(res => {
      const asteroids = res.data;
      this.setState({ asteroids });

      for (const date in this.state.asteroids.near_earth_objects) {
        this.state.asteroids.near_earth_objects[date].map(
          (singleAsteroid, i) => {
            if (singleAsteroid.is_potentially_hazardous_asteroid !== true)
              return;
            asteroidsArray.push(singleAsteroid);
          }
        );
      }
      this.setState({ filteredAsteroids: asteroidsArray });
    });
  }

  handleDate(e, dateType) {
    if (dateType === "start") {
      this.setState({
        startDate: e.target.value
      });
    } else if (dateType === "end") {
      this.setState({
        endDate: e.target.value
      });
    }
  }

  render() {
    return (
      <Layout>
        <div className="info-container">
          <style jsx>{`
            .info-container {
              width: 50vw;
            }
            .info-date-inner-container {
              display: flex;
              align-items: center;
              margin: 10px 0;
            }
            .info-h {
              flex: 1;
            }
            .info-date-input {
              flex: 3;
							padding: 5px;
							border: 1px solid #222;
            }
            .btn {
              background: #fff;
              padding: 5px 15px;
              border: 1px solid #222;
              color: #222;
							cursor: pointer;
							outline: none;
							transition: .2s ease;
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
          <div className="info-date-inner-container">
            <span className="info-h">Start date:</span>
            <input
              className="info-date-input"
              type="date"
              onChange={e => this.handleDate(e, "start")}
              value={this.state.startDate}
            />
          </div>
          <div className="info-date-inner-container">
            <span className="info-h">End date:</span>
            <input
              className="info-date-input"
              type="date"
              onChange={e => this.handleDate(e, "end")}
              value={this.state.endDate}
            />
          </div>
          <div style={{ margin: "20px 0", textAlign: "right" }}>
            <button
							disabled={this.state.disabled}
							className={this.state.disabled ? "btn disabled-btn" : "btn"}
              onClick={this.fetchAPI.bind(this)}
            >
              Prikaži asteroide
            </button>
          </div>
        </div>
        <Table
          asteroids={this.state.asteroids}
          filteredAsteroids={this.state.filteredAsteroids}
        />
        <Autocomplete
          asteroids={this.state.asteroids}
          filteredAsteroids={this.state.filteredAsteroids}
        />
      </Layout>
    );
  }
}

export default Index;
