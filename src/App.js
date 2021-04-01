import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";

class App extends Component {

    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {
        super(props);
        this.state = {
            sortItems: [],
            movieItems: [],
            isLoaded: false,
        }
    }

    /**
     * componentDidMount
     *
     * Fetch json array of objects from given url and update state.
     */
    componentDidMount() {

        fetch('top5MoviesAssessement.json')
            .then(res => res.json(), {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

            })
            .then(json => {
                this.setState({
                    isLoaded: true,
                    sortItems: json.components[0],
                    movieItems: json.components[1],
                })
            }).catch((err) => {
            console.log(err);
        });
    }

    _redirectToHome() {
        return <Redirect to="/" />;
    }

    render() {
        var {isLoaded} = this.state;

        if(!isLoaded) {
            return (<div>Loading...</div>);
        }

        return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <MovieList movies={this.state}/>
                    </Route>
                    <Route path="/movie/:rank" >
                        <MovieDetail movie={this.state.movieItems}></MovieDetail>
                    </Route>

                    {/* catch-all redirects to home */}
                    <Route render={this._redirectToHome}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
