import React, { FC } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type TTodoProps = {
  title: string;
  body: string;
};

const Todo: FC<TTodoProps> = ({ title, body }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Todo;
