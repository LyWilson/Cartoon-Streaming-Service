import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { svrURL } from "./constants.js";
import { useAuth } from "./Auth";
import { useHistoryContext } from "./History";
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Pagination,
  CircularProgress,
  Button
} from '@mui/material';

export function Historique() {
    const [pageCourante, setPageCourante] = useState(1);
    const [taillePage] = useState(6);
    const { authToken } = useAuth();
    const { setHistory } = useHistoryContext();

    const { data: history = [], isLoading, error } = useQuery({
        queryKey: ['history', authToken],
        queryFn: async () => {
            if (!authToken) return [];
            const response = await fetch(`${svrURL}/user/history`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (!response.ok) throw new Error('Failed to fetch history');
            const data = await response.json();
            setHistory(data);
            return data;
        }
    });

    const totalEpisodes = history.length;
    const totalPages = Math.ceil(totalEpisodes / taillePage);
    const episodesAffichage = history.slice((pageCourante - 1) * taillePage, pageCourante * taillePage);

    function EpisodeGenerateur({ episode }) {
        return (
            <Grid item xs={12} sm={6} md={4} key={episode.episodeId}>
                <Card>
                    <CardContent>
                        <img src={episode.imgUrl} alt={episode.title} style={{ width: '100%', borderRadius: 8 }} />
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            <Link to={`/details/${episode.tvshowId}`}>{episode.tvshowTitle}</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px"><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center">Error loading history.</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>Historique</Typography>
            <Grid container spacing={3}>
                {episodesAffichage.map((episode) => (
                    <EpisodeGenerateur key={episode.episodeId} episode={episode} />
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                <Pagination
                    count={totalPages}
                    page={pageCourante}
                    onChange={(e, value) => setPageCourante(value)}
                    color="primary"
                />
            </Box>
        </Container>
    );
}
