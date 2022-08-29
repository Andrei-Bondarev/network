import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  createPost,
  getItemById,
  updatePost,
} from "../../pages/Posts/postsSlice";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";

type TPostProps = {
  body: string;
  title: string;
  id: number;
  userId: number;
};

const validationSchema = yup.object({
  title: yup
    .string()
    .min(8, "Title should be of minimum 8 characters length")
    .required("Title is required"),
  body: yup
    .string()
    .min(8, "Body should be of minimum 8 characters length")
    .required("Body is required"),
});

const Post: FC<TPostProps> = ({ id, body, title, userId }) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const item = useSelector(getItemById(id));

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      title: item?.title,
      body: item?.body,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.body && values.title) {
        await dispatch(
          updatePost({
            body: values.body,
            title: values.title,
            userId,
            id,
          })
        );
      }
    },
  });

  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? "simple-popover" : undefined;

  const navigate = useNavigate();
  const onPostClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "inline-block",
            }}
          >
            {title}
          </Typography>
          <IconButton onClick={handleClick}>
            <MoreVertIcon
              sx={{
                display: "inline-block",
              }}
              fontSize={"small"}
            />
          </IconButton>
          <Popover
            id={popoverId}
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button
              variant={"text"}
              sx={{
                p: 2,
                display: "block",
              }}
              onClick={onPostClick}
            >
              Open Details
            </Button>
            <Button
              onClick={handleOpen}
              variant={"text"}
              sx={{ p: 2, display: "block" }}
            >
              Update Post
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute" as "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 800,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align={"center"}
                >
                  Update Post
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    sx={{ marginBottom: 2 }}
                    required
                    id="body"
                    name="body"
                    label="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                    fullWidth
                    multiline
                    maxRows={30}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Modal>
            <Button variant={"text"} sx={{ p: 2, display: "block" }}>
              Delete Post
            </Button>
          </Popover>
        </Box>

        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
