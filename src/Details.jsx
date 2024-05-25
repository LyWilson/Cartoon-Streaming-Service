import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants.js';

export function Details() {
    const { tvshowId } = useParams();
    const [tvshow, setTvshow] = useState(null);

    useEffect(() => {
        async function fetchTvshowDetails() {
            try {
                const response = await fetch(`${svrURL}/tvshow?tvshowId=${tvshowId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTvshow(data);
                }
            } catch (error) {
                console.error('Error fetching TV show details:', error);
            }
        }
        fetchTvshowDetails();
    }, []);

    function handleClick (seasonId) {
        window.location.href = `/episodes/${seasonId}`;
    }

    return <div>
        <div className="container">
            {
                tvshow !== null &&
        <div className="details">
            <div className="field-body">
                <div className="column is-4-desktop is-4-tablet is-6-mobile">
                    <figure className="image">
                        <img src={tvshow.imgURL} alt={tvshow.title}/>
                    </figure>
                </div>
                <div className="column is-8">
                    <div className="column">
                        <span htmlFor="titre" className="title is-2">{tvshow.title}</span>
                    </div>
                    <div className="column is-pulled-right" style={{marginRight: "2.8%"}}>
                        <span htmlFor="genres">{tvshow.genres.map((t) => t.name).join(", ")}</span>
                    </div>
                    <div className="column">
                        <span htmlFor="Date de parution">{tvshow.year}</span>
                    </div>
                    <div className="column">
                        <span htmlFor="nombre d'episode">{tvshow.episodeCount} episodes</span>
                        <span htmlFor="tv Parental Guideline"
                              style={{marginLeft: "6%"}}>{tvshow.tvParentalGuideline}</span>
                    </div>
                    <div className="column">
                        <span htmlFor="Studio">Studio</span>
                        <span htmlFor="Nom du studio" style={{marginLeft: "10.75%"}}>{tvshow.studio.name}</span>
                    </div>
                    <div className="column has-text-justified" style={{marginRight: "2.8%"}}>{tvshow.plot}</div>
                    <div className="column">
                        <audio controls id="cryURL" src={tvshow.audioURL} autoPlay>
                            <source type="audio/ogg"/>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>
            <div style={{overflow: "auto"}}>
                <div style={{
                    display: "flex",
                    position: "relative",
                    marginLeft: "0.9%",
                    marginTop: 50,
                    marginBottom: 50
                }}>
                    {tvshow.roles.map(role => (
                        <div className="card has-text-centered" key={role.roleId}
                             style={{minHeight: 300, minWidth: 200, marginRight: 25}}>
                            <figure className="card-image">
                                <img src={role.imgURL} alt={role.name}/>
                            </figure>
                            <div>
                                <span><b>{role.name}</b></span>
                            </div>
                            <span>{role.character}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{overflow: "auto"}}>
                <div style={{
                    display: "flex",
                    position: "relative",
                    marginLeft: "0.9%",
                    marginTop: 50,
                    marginBottom: 50
                }}>
                    {tvshow.seasons.map(season => (
                        <div className="column is-3 card has-text-centered" key={season.seasonId}
                             style={{minHeight: 300, minWidth: 200, marginRight: 25}}
                             onClick={() => handleClick(season.seasonId)}>
                            <figure className="card-image">
                                <img src={season.imgURL} alt={`Season ${season.number}`}/>
                            </figure>
                            <div style={{marginTop: 10, height: 50}}>
                                <span className="title is-4">Season {season.number}</span>
                            </div>
                            <div style={{marginTop: 10, height: 50}}>
                                <span>{season.episodeCount} episodes</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            }
        </div>
    </div>;
}
