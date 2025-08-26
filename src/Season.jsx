import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { svrURL } from "./constants.js";
import { useHistoryContext} from "./History.jsx";

export function Season() {
    const { seasonsId } = useParams();
    const navigate = useNavigate();
    const [season, setSeason] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [pageCourante, setPageCourante] = useState(1);
    const [taillePage] = useState(8);
    const { history } = useHistoryContext();

    useEffect(() => {
        async function fetchSeason() {
            try {
                const response = await fetch(`${svrURL}/episodes?seasonId=${seasonsId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSeason(data);
                    setEpisodes(data.episodes);
                }
            } catch (error) {
                console.error('Error fetching season:', error);
            }
        }
        fetchSeason();
    }, [seasonsId]);

    const totalEpisodes = episodes.length;
    const totalPages = Math.ceil(totalEpisodes / taillePage);

    function pagination() {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return episodes.slice(debut, fin);
    }

    function tabpages() {
        const tab = [];
        for (let i = 1; i <= totalPages; i++) {
            tab.push(i);
        }
        return tab;
    }

    const afficherEpisodes = () => {
        const episodesAffichage = pagination();
        return episodesAffichage.map((episode) => (
            <EpisodeGenerateur key={episode.episodeId} episode={episode} onClick={() => navigate(`/episode/${episode.episodeId}`)} />
        ));
    };

    function EpisodeGenerateur({ episode, onClick }) {
        const historique = history.some((h) => h.episodeId === episode.episodeId);
        return (
            <div className="column is-3-desktop is-4-tablet is-6-mobile">
                <div className="card" style={{ display: "flex", flexDirection: "column", filter: historique ? "blur(2px) grayscale(100%)" : "none" }} onClick={onClick}>
                    <div className="card-image" style={{ flex: "1 1 auto" }}>
                        <figure className="image is-square" style={{ margin: 0 }}>
                            <img src={episode.imgUrl} alt={episode.title} style={{ height: "60%" }} />
                        </figure>
                    </div>
                    <div className="card-content has-text-centered">
                        <p className="title is-5" style={{ marginTop: "-5rem" }}>{episode.title}</p>
                        <p className="subtitle is-6" style={{ marginBottom: 0 }}>{episode.number}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {season && (
                <>
                    <h1 className="title has-text-centered">{season.tvshowTitle}</h1>
                    <h2 className="title has-text-centered">{season.seasonNumber}</h2>
                    <div className="columns is-multiline">
                        {afficherEpisodes()}
                    </div>

                    <nav className="pagination" role="navigation" aria-label="pagination">
                        <span
                            className="pagination-previous"
                            onClick={() => {
                                if (pageCourante > 1) setPageCourante(pageCourante - 1);
                            }}
                        >
                            {"<"}
                        </span>
                        <span
                            className="pagination-next"
                            onClick={() => {
                                if (pageCourante < totalPages) setPageCourante(pageCourante + 1);
                            }}
                        >
                            {">"}
                        </span>
                        <ul className="pagination-list">
                            {tabpages().map((p) => {
                                return (
                                    <li key={p}>
                                        <span
                                            className={pageCourante === p ? "pagination-link is-current" : "pagination-link"}
                                            aria-label={"Page " + p}
                                            onClick={() => setPageCourante(p)}
                                        >
                                            {p}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}
