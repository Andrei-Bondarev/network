import React, { FC } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

type TCommentProps = {
  name: string;
  email: string;
  body: string;
};

const Comment: FC<TCommentProps> = ({ name, email, body }) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}>
      <CardContent>
        <Typography variant="body1">
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {name}
          </span>
          : {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
