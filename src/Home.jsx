import { svrURL } from "./constants.js";
import { Tvshow } from "./Anime.jsx";
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Pagination,
  Box
} from '@mui/material';

export function Home() {
    const [taillePage, setTaillePage] = useState(8);
    const [pageCourante, setPageCourante] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [studioFilterValue, setStudioFilterValue] = useState("");

    // Fetch studios
    const { data: studios = [], isLoading: studiosLoading, error: studiosError } = useQuery({
        queryKey: ['studios'],
        queryFn: async () => {
            const response = await fetch(svrURL + '/studios');
            if (!response.ok) throw new Error('Failed to fetch studios');
            return response.json();
        }
    });

    // Fetch tvshows
    const { data: tvshows = [], isLoading: tvshowsLoading, error: tvshowsError } = useQuery({
        queryKey: ['tvshows'],
        queryFn: async () => {
            const response = await fetch(svrURL + '/tvshows');
            if (!response.ok) throw new Error('Failed to fetch tvshows');
            return response.json();
        }
    });

    // Filtering
    const filteredTvshows = tvshows.filter(tvshow =>
        tvshow.title.toLowerCase().includes(filterValue.toLowerCase()) &&
        (studioFilterValue === "" || tvshow.studio.name.toLowerCase().includes(studioFilterValue.toLowerCase()))
    );

    const nbPages = Math.ceil(filteredTvshows.length / taillePage);
    const paginatedTvshows = filteredTvshows.slice((pageCourante - 1) * taillePage, pageCourante * taillePage);

    function handleTitleFilter(e) {
        setFilterValue(e.target.value);
        setPageCourante(1);
    }
    function handleStudioFilter(e) {
        setStudioFilterValue(e.target.value);
        setPageCourante(1);
    }

    return (
    <Container disableGutters maxWidth={false} sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Cartoon Streaming Service
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={filterValue}
                        onChange={handleTitleFilter}
                        placeholder="Enter title to filter..."
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="studio-label">Studio</InputLabel>
                        <Select
                            labelId="studio-label"
                            value={studioFilterValue}
                            label="Studio"
                            onChange={handleStudioFilter}
                        >
                            <MenuItem value="">All</MenuItem>
                            {studios.map((studio, index) => (
                                <MenuItem key={index} value={studio.name}>
                                    {studio.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {(studiosLoading || tvshowsLoading) && (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            )}
            {(studiosError || tvshowsError) && (
                <Typography color="error" align="center">
                    Error loading data.
                </Typography>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%', justifyContent: 'center' }}>
                {paginatedTvshows.map((p) => (
                    <div key={p.tvshowId} style={{ width: '300px', minWidth: '300px', maxWidth: '300px' }}>
                        <Tvshow tvshow={p} />
                    </div>
                ))}
            </div>

            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                <Pagination
                    count={nbPages}
                    page={pageCourante}
                    onChange={(e, value) => setPageCourante(value)}
                    color="primary"
                />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <FormControl>
                    <InputLabel id="taille-label">Shows per page</InputLabel>
                    <Select
                        labelId="taille-label"
                        value={taillePage}
                        label="Shows per page"
                        onChange={(e) => setTaillePage(parseInt(e.target.value))}
                    >
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Typography align="center" sx={{ mt: 2, color: 'text.secondary' }}>Wilson Ly</Typography>
        </Container>
    );
}
