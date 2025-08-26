import { Link } from "react-router-dom";
import { Box, CardContent, Typography } from '@mui/material';

export function Tvshow(props) {
    const tvshowUrl = `/details/${props.tvshow.tvshowId}`;

    return (
    <Link to={tvshowUrl} style={{ textDecoration: 'none' }}>
            <Box sx={{ width: '100%', aspectRatio: '1', bgcolor: props.tvshow.color }}>
                <img src={props.tvshow.imgUrl} alt={props.tvshow.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <CardContent>
                <Typography variant="h6" align="center" sx={{ minHeight: 48, color: 'text.primary' }}>
                    {props.tvshow.title}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Studio:</strong> {props.tvshow.studio.name}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Genres:</strong> {props.tvshow.genres.map((p) => p.name).join(", ")}
                </Typography>
            </CardContent>
        </Link>
    );
}
