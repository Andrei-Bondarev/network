import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type TPhotoProps = {
  title: string;
  url: string;
  thumbnailUrl: string;
};

const Photo: FC<TPhotoProps> = ({ title, url, thumbnailUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={url} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align={"center"}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Photo;
