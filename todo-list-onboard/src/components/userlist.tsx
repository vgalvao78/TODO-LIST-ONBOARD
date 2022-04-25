import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IUser } from '../models/user';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrowOutlined";
import { useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    (async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((resp) => {
          if (resp.status >= 400)
            throw new Error("Server responds with error!");

          return resp.json();
        })
        .then(
          (result) => {
            if (result !== null) setUsers(result);
            setLoading(false);
          },
          (err) => {
            setError(err);
            setLoading(false);
          }
        );
    })();
    setLoading(false);
  }, [loading, users]);

  useEffect(() => {
    if (error.length > 0) console.log(error);
  }, [error]);

  useEffect(() => {
    if (error.length > 0) console.log(error);
  }, [error]);

  useEffect(() => {
    history.push(`/user/${selectedUser}`);
  }, [selectedUser, history]);

  const handleUserselectedItem = (index: number) => {
    setSelectedUser(index);
  };

  return (
    <div className={classes.list}>
      <List component="nav" aria-label="userlist">
        {users.map((user: IUser, index) => (
          <ListItem
            key={"user_" + index}
            button
            selected={user.id === selectedUser}
            onClick={() => handleUserselectedItem(user.id)}
          >
            <ListItemText primary={user.name} />
            {user.id === selectedUser ? <DoubleArrowIcon /> : null}
          </ListItem>
        ))}
      </List>
      <Backdrop className={classes.backdrop} open={loading} />
    </div>
  );
}
