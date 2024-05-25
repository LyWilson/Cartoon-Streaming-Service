import { svrURL } from "./constants.js";
import { Tvshow } from "./Anime.jsx";
import React, { useEffect, useState } from "react";

export function Home() {
    const [tvshows, setTvshows] = useState([]);
    const [filteredTvshows, setFilteredTvshows] = useState([]);
    const [taillePage, setTaillePage] = useState(8);
    const [pageCourante, setPageCourante] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [studioFilterValue, setStudioFilterValue] = useState("");
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        async function fetchStudios() {
            try {
                const response = await fetch(svrURL + "/studios");
                if (response.ok) {
                    const data = await response.json();
                    setStudios(data);
                } else {
                    console.error("Failed to fetch studios:", response.status);
                }
            } catch (error) {
                console.error("Error fetching studios:", error);
            }
        }

        fetchStudios();
    }, []);

    function nbPages() {
        return Math.ceil(filteredTvshows.length / taillePage);
    }

    function pagination() {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return filteredTvshows.slice(debut, fin);
    }

    function tabpages() {
        const tab = [];
        for (let i = 1; i <= nbPages(); i++) {
            tab.push(i);
        }
        return tab;
    }

    async function fetchData() {
        try {
            const response = await fetch(svrURL + "/tvshows");
            if (response.ok) {
                const data = await response.json();
                setTvshows(data);
                setFilteredTvshows(data);
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleTitleFilter(e) {
        const value = e.target.value;
        setFilterValue(value);
        filterTvshows(value, studioFilterValue);
    }

    function handleStudioFilter(e) {
        const value = e.target.value;
        console.log(value);
        setStudioFilterValue(value);
        filterTvshows(filterValue, value);
    }

    function filterTvshows(title, studio) {
        const filtered = tvshows.filter(tvshow =>
            tvshow.title.toLowerCase().includes(title.toLowerCase()) &&
            (studio === "" || tvshow.studio.name.toLowerCase().includes(studio.toLowerCase()))
        );
        setFilteredTvshows(filtered);
        setPageCourante(1);
    }

    return (
        <div className="container">
            <div className="section">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-half">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Title:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Enter title to filter..."
                                            value={filterValue}
                                            onChange={handleTitleFilter}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Studio:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select">
                                            <select
                                                value={studioFilterValue}
                                                onChange={handleStudioFilter}
                                            >
                                                <option value=""></option>
                                                {studios.map((studio, index) => (
                                                    <option key={index} value={studio.name}>
                                                        {studio.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row columns is-multiline is-mobile">
                {pagination().map((p) => {
                    return <Tvshow key={p.tvshowId} tvshow={p} />;
                })}
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
                        if (pageCourante < nbPages())
                            setPageCourante(pageCourante + 1);
                    }}
                >
                {">"}
            </span>
                <ul className="pagination-list">
                    {tabpages().map((p) => {
                        return (
                            <li key={p}>
                            <span
                                className={
                                    pageCourante === p
                                        ? "pagination-link is-current"
                                        : "pagination-link"
                                }
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
            <div className="field has-text-centered">
                <div className="control">
                    <div className="select">
                        <select
                            value={taillePage}
                            onChange={(e) => setTaillePage(parseInt(e.target.value))}
                        >
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                </div>
            </div>
            <p className="has-text-centered">e2254323</p>
        </div>
    );

}
