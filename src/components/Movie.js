import { Card, CardActionArea, CardContent, Typography} from "@mui/material";

const Movie = ({movie, index}) => {
    const date1 = new Date(movie.release_date);
    const releaseDate = getFormattedDate(date1);
    return (
        <Card sx={{ maxWidth: 345, maxHeight: "140px", marginBottom: "30px" }}>
            <CardActionArea style={{
                display:"flex",
                flexDirection: "inherit",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        release date: {releaseDate}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

const getFormattedDate = (date) => {
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

export default Movie;