import {Avatar, Card, CardActionArea, CardContent, Typography} from "@mui/material";

function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Actor = ({actor, index}) => {
    const { first_name: firstName, last_name: lastName, age } = actor;
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
                        {firstName} {lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        age: {age}
                    </Typography>
                </CardContent>
                <Avatar {...stringAvatar(`${firstName} ${lastName}`)} style={{
                    marginRight: "20px"
                }}/>
            </CardActionArea>
        </Card>

    )
}

export default Actor;