import React, { FC } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import { useAppDispatch } from "../../store";
import { setTitle, toggleTodoStatus } from "../../pages/Todos/todosSlice";
import TextField from "@mui/material/TextField";

type TTodoProps = {
  title: string;
  completed: boolean;
  id: number;
};

const Todo: FC<TTodoProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  const status = completed ? "completed" : "in progress";

  const [checked, setChecked] = React.useState(completed);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(toggleTodoStatus(id));
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle({ id, title: event.target.value }));
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 1400, margin: "10px auto" }}>
      <CardContent>
        <TextField
          id="title"
          label="title"
          value={title}
          onChange={handleChangeTitle}
        />
        <Switch checked={checked} onChange={handleChange} />
        <Typography variant="body2" sx={{ display: "inline-block" }}>
          {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Todo;
