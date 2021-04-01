import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../App';
import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

class MovieList extends Component {
    /**
     * constructor
     *
     * @object  @props  parent props
     * @object  @state  component state
     */
    constructor(props) {
        super(props);
        this.state = this.props.movies;
    }

    render() {

        if (!this.state) {
            return (<div>Loading...</div>);
        } else {
            var {movieItems, sortItems} = this.state;

            const handleSelect = (e) => {
                let moviesSorted = movieItems.items;
                let sortValue = e.target.value;

                movieItems.items.sort(function (a, b) {
                    return parseInt(a[sortValue]) - parseInt(b[sortValue]);
                })

                this.setState({
                    isOldestFirst: !this.state.isOldestFirst,
                    postList: moviesSorted
                })
            }

            return (

                    <div className="container my-5">
                        <div className="row justify-content-between mb-3">
                            <div className="col-12 col-sm">
                                <h3>Top 5 Movies</h3>
                            </div>
                            <div className="col-12 col-sm-4">
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control as="select" onChange={handleSelect}>
                                        {sortItems.items.map(item => (
                                            <option key={item.label} value={item.valueToOrderBy}>{item.label}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {movieItems.items.map(item => (
                                    <Link to={`/movie/${item.rank}`} key={item.id}>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12 col-sm-3 col-md-2">
                                                        <img src={item.imageUrl} alt="" className="img-fluid"/>
                                                    </div>
                                                    <div className="col-12 col-sm-9 col-md-10">
                                                        <h3>{item.title}</h3>
                                                        <p><small>Rank: {item.rank}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
            );
        }
    }
}

export default MovieList;
