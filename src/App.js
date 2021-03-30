import './App.css';
import React, {Component} from "react";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {

        fetch('top5MoviesAssessment.json', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }

    render() {

        var {isLoaded} = this.state;

        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    Data is loaded
                </div>
            );
        }
    }

}

export default App;
