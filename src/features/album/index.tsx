import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import albumPhoto from "../../assets/albumNoPhoto.png";
import { useNavigate } from "react-router-dom";

type TAlbumProps = {
  title: string;
  albumId: number;
};

const Album: FC<TAlbumProps> = ({ title, albumId }) => {
  const navigate = useNavigate();
  const onAlbumClick = () => {
    navigate(`/album/${albumId}/photos`);
  };
  return (
    <Card sx={{ maxWidth: 345 }} onClick={onAlbumClick}>
      <CardMedia
        component="img"
        height="140"
        image={albumPhoto}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align={"center"}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Album;
