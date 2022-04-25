import { Button, Container, Grid } from "@material-ui/core";

interface IProps {
  taskId: number;
  title: string;
  completed: boolean;
  onComplete?: any;
}

export default function Task(props: IProps) {
  const { taskId, title, completed, onComplete } = props;

  const handleAction = () => {
    onComplete(taskId);
  };

  return (
    <Container fixed>
      <Grid container>
        <Grid item xs={12} lg={8}>
          Title : {title}
        </Grid>
        <Grid item xs={12} lg={2}>
          Completed : {completed ? "Yes" : "No"}
        </Grid>
        {!completed ? (
          <Grid item xs={12} lg={2}>
            <Button color="primary" onClick={handleAction}>
              Complete
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}
