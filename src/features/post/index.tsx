import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

type TPostProps = {
  body: string;
  title: string;
  id: number;
};

const Post: FC<TPostProps> = ({ id, body, title }) => {
  const navigate = useNavigate();
  const onPostClick = () => {
    navigate(`/posts/${id}`);
  };
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}
      onClick={onPostClick}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
