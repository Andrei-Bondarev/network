import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getItemById } from "../../pages/Posts/postsSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import postPhoto from "../../assets/postPhoto.jpg";
import Typography from "@mui/material/Typography";
import { TComment } from "../../@types/comments";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Comment from "../comment";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const post = useSelector(getItemById(Number(postId)));
  const [items, setItems] = useState([]);
  const isMounted = useRef(false);
  useEffect(() => {
    const fetchComments = async (id: number) => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        setItems(data);
      } catch (e) {
        console.log(e);
      }
    };
    if (!isMounted.current) fetchComments(Number(postId));
    isMounted.current = true;
  }, [postId]);
  return (
    <Card sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}>
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <img
                  src={postPhoto}
                  alt="Post"
                  style={{
                    maxHeight: 800,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"h5"} align={"center"}>
                {post?.title}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <Typography variant={"body2"}>{post?.body}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <ThumbUpIcon />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
              >
                <Typography variant={"h5"}>Comments</Typography>
                <div>
                  {items.map((comment: TComment) => (
                    <Comment
                      name={comment.name}
                      email={comment.email}
                      body={comment.body}
                      key={comment.id}
                    />
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostDetails;
