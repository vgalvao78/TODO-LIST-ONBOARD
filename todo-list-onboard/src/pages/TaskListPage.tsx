import { Grid, makeStyles, Typography } from "@material-ui/core";
import TaskList from "../components/tasklist";

const useStyles = makeStyles((theme) => ({
  listTitle: {
    textAlign: "left",
    paddingLeft: 15
  }
}));

export default function TaslListPage() {
  const classes = useStyles();
  return (
    <Grid item xs={12} lg={6}>
      <Typography variant={"h6"} className={classes.listTitle}>
        Task List
      </Typography>
      <TaskList />
    </Grid>
  );
}
