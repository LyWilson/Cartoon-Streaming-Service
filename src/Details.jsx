import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { svrURL } from './constants.js';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';

export function Details() {
    const { tvshowId } = useParams();
    const { data: tvshow, isLoading, error } = useQuery({
        queryKey: ['tvshow', tvshowId],
        queryFn: async () => {
            const response = await fetch(`${svrURL}/tvshow?tvshowId=${tvshowId}`);
            if (!response.ok) throw new Error('Failed to fetch TV show details');
            const data = await response.json();
            // Patch property names for compatibility
            if (data.imgURL) data.imgUrl = data.imgURL;
            if (data.audioURL) data.audioUrl = data.audioURL;
            if (data.roles) data.voiceActors = data.roles;
            if (data.seasons) {
                data.seasons = data.seasons.map(season => ({
                    ...season,
                    imgUrl: season.imgURL || season.imgUrl,
                }));
            }
            return data;
        }
    });

    function handleClick(seasonId) {
    window.location.href = `/season/${seasonId}`;
    }

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px"><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center">Error loading TV show details.</Typography>;
    if (!tvshow) return null;

    if (tvshow) {
        console.log('Image URL:', tvshow.imgUrl);
    }

    return (
        <div className="container" style={{ marginTop: 32 }}>
            {tvshow && (
                <div className="details">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
                        <div style={{ flex: '0 0 320px', maxWidth: 320 }}>
                            <img src={tvshow.imgUrl} alt={tvshow.title} style={{ width: '100%', borderRadius: 8 }} />
                        </div>
                        <div style={{ flex: '1 1 400px', minWidth: 320 }}>
                            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{tvshow.title}</div>
                            <div style={{ marginBottom: 8, color: '#888' }}>{tvshow.genres.map((t) => t.name).join(", ")}</div>
                            <div style={{ marginBottom: 8 }}>{tvshow.year}</div>
                            <div style={{ marginBottom: 8 }}>{tvshow.episodeCount} episodes <span style={{ marginLeft: 24 }}>{tvshow.tvParentalGuideline}</span></div>
                            <div style={{ marginBottom: 8 }}>Studio <span style={{ marginLeft: 24 }}>{tvshow.studio.name}</span></div>
                            <div style={{ marginBottom: 8 }}>{tvshow.plot}</div>
                            <div style={{ marginBottom: 8 }}>
                                <audio controls src={tvshow.audioUrl} style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Voice Actors Section */}
                    {tvshow.voiceActors && tvshow.voiceActors.length > 0 && (
                        <div style={{ overflow: 'auto', marginTop: 40, marginBottom: 40 }}>
                            <div style={{ display: 'flex', gap: 25, marginLeft: 8 }}>
                                {tvshow.voiceActors.map((actor) => (
                                    <div key={actor.roleId || actor.name} style={{ minHeight: 300, minWidth: 200, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', textAlign: 'center', padding: 16 }}>
                                        <img src={actor.imgURL || actor.imgUrl} alt={actor.name} style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />
                                        <div><b>{actor.name}</b></div>
                                        <div>{actor.character}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Seasons Section */}
                    {tvshow.seasons && tvshow.seasons.length > 0 && (
                        <div style={{ overflow: 'auto', marginTop: 40, marginBottom: 40 }}>
                            <div style={{ display: 'flex', gap: 25, marginLeft: 8 }}>
                                {tvshow.seasons.map((season) => (
                                    <div key={season.seasonId} style={{ minHeight: 300, minWidth: 200, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', textAlign: 'center', padding: 16, cursor: 'pointer' }} onClick={() => handleClick(season.seasonId)}>
                                        <img src={season.imgUrl} alt={`Season ${season.number}`} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                                        <div style={{ marginTop: 10, height: 50 }}>
                                            <span style={{ fontSize: 20, fontWeight: 600 }}>Season {season.number}</span>
                                        </div>
                                        <div style={{ marginTop: 10, height: 50 }}>
                                            <span>{season.episodeCount} episodes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
