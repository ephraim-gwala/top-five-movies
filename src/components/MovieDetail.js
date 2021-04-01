import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../App';
import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import { useParams } from "react-router";

const MovieDetail = (movie) => {
    var movies = movie.movie.items;
    var params = useParams();
    var rank = parseInt(params.rank);

    const singleMovie = movies.find(mov => mov.rank === rank)
    console.log(singleMovie);

        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <img src={singleMovie.imageUrl} alt="" className="img-fluid"/>
                                    </div>
                                    <div className="col-9">
                                        <h3>{singleMovie.title}</h3>
                                        <p><small>Rank: {singleMovie.rank}</small></p>
                                        <div>
                                            <p>{singleMovie.synopsis}</p>
                                            <p><i>(Release Year: {singleMovie.releaseDate})</i></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default MovieDetail;

