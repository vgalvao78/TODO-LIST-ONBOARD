import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import UserList from "../components/userlist";
import TaskListPage from "./TaskListPage";

const useStyles = makeStyles((theme) => ({
  listTitle: {
    textAlign: "left",
    paddingLeft: 15
  }
}));

export default function TodoPage() {
  const classes = useStyles();

  return (
    <Container fixed>
      <Typography variant={"h2"}>Onboarding tracker</Typography>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography variant={"h6"} className={classes.listTitle}>
            Users
          </Typography>
          <UserList />
        </Grid>
        <TaskListPage />
      </Grid>
    </Container>
  );
}
