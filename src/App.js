import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {Component} from "react";
import Form from 'react-bootstrap/Form';

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
            .then(res => res.json())
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

    render() {

        var {isLoaded, movieItems, sortItems} = this.state;

        const handleSelect=(e)=>{
            let moviesSorted = movieItems.items;
            let sortValue = e.target.value;

            // let sort = (moviesToSort) => (key) => [...moviesToSort].sort((first, second) => first[key] > second[key]);
            movieItems.items.sort(function(a,b){
                return parseInt(a[sortValue])  - parseInt(b[sortValue]);
            })
            console.log(movieItems.items);
            this.setState({
                isOldestFirst: !this.state.isOldestFirst,
                postList: moviesSorted
            })
        }

        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <div className="container my-5">
                        <div className="row justify-content-between mb-3">
                            <div className="col">
                                <h3>Top 5 Movies</h3>
                            </div>
                            <div className="col col-auto">
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Sort by...</Form.Label>
                                    <Form.Control as="select" onChange={handleSelect}>
                                        {sortItems.items.map(item => (
                                            <option key={item.id} value={item.valueToOrderBy}>{item.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                    {movieItems.items.map(item => (
                                        <div className="card mb-4" key={item.id}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <img src={ item.imageUrl } alt="" className="img-fluid"/>
                                                    </div>
                                                    <div className="col-9">
                                                        <h3>{ item.title }</h3>
                                                        <button className="btn btn-primary">Read synopsis</button>
                                                        <p className="mb-0"><small>Rank: { item.rank }</small></p>
                                                        <p>{ item.synopsis }</p>
                                                        <p><i>(Release Year: { item.releaseDate })</i></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default App;
