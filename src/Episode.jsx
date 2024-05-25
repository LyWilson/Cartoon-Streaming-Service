import {useEffect} from "react";
import { svrURL } from './constants.js';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from './Auth.jsx';

export function Episode() {
    const [episode, setEpisode] = useState(null);
    const { episodeId } = useParams();
    const { authToken } = useAuth();


    useEffect(() => {
        async function getEpisodes() {
            const rep = await fetch(
                `${svrURL}/viewepisode?episodeId=${episodeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (rep.ok) {
                const data = await rep.json();
                console.log(data);
                setEpisode(data.videoURL);
            } else if (rep.status === 401) {
                navigate("/login");
            }
        }
        if (authToken) {
            getEpisodes();
        }
    }, []);

    if (!authToken) {
        console.log("Please log in to access this page.");
        return (
            <div className="has-text-centered">
                <h1 className="title">Vous devez vous connecter pour accéder à cette page.</h1>
                <Link to="/login">Se connecter</Link>
            </div>
        );
    }


    return (
        <div>
            {episode && (
                <div className="has-text-centered">
                    <video controls width="1500" height="1000">
                        <source src={episode} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}
