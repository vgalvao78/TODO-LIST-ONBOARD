import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    makeStyles
  } from "@material-ui/core";
  import CheckIcon from "@material-ui/icons/Check";
  import { useEffect, useState } from "react";
  import { useHistory, withRouter } from "react-router-dom";
  import { ITodo } from "../models/todo";
  import { parse, stringify } from "flatted";
  
  const useStyles = makeStyles((theme) => ({
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    formControl: {
      margin: theme.spacing(3)
    },
    icon: {
      paddingLeft: 8,
      paddingRight: 8
    },
    noItems: {
      marginTop: "40vh"
    }
  }));
  
  function TaskList() {
    const history = useHistory();
    const pathname = history.location.pathname;
    var currentUser = (pathname.split("/").pop() as unknown) as number;
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const classes = useStyles();
  
    useEffect(() => {
      (async () => {
        if (window.localStorage.getItem(currentUser.toString()) !== null) {
          const localState = parse(
            window.localStorage.getItem(currentUser.toString()) as string
          ) as ITodo[];
          setTodos(localState);
        } else {
          await fetch(
            `https://jsonplaceholder.typicode.com/todos?userId=${currentUser}`
          )
            .then((resp) => {
              if (resp.status >= 400)
                throw new Error("Server responds with error!");
              return resp.json();
            })
            .then(
              (result) => {
                if (result !== null) {
                  setTodos(result);
                  try {
                    window.localStorage.setItem(
                      currentUser.toString(),
                      stringify(result) as string
                    );
                  } catch (err) {
                    setError(err as string);
                  }
                }
              },
              (err) => {
                setError(err);
              }
            );
        }
      })();
    }, [currentUser]);
  
    useEffect(() => {
      if (loading) {
        if (window.localStorage.getItem(currentUser.toString()) !== undefined) {
          const localState = parse(
            window.localStorage.getItem(currentUser.toString()) as string
          ) as ITodo[];
          setTimeout(async () => {
            setTodos(localState);
          }, 0);
        }
        setLoading(false);
      }
    }, [loading, currentUser]);
  
    useEffect(() => {
      if (error.length > 0) console.log(error);
    }, [error]);
  
    const handleChange = async (event: any) => {
      window.localStorage.removeItem(currentUser.toString());
      const todoId = Number(event.target.name);
      var items = Object.assign(todos as ITodo[]);
  
      for (const obj of items) {
        if (obj.id === todoId) {
          obj.completed = true;
          break;
        }
      }
      var newResult = null;
  
      try {
        newResult = stringify(items) as string;
        window.localStorage.setItem(currentUser.toString(), newResult);
      } catch (err) {
        setError(err as string);
      }
      setLoading(true);
    };
  
    return (
      <div id="todoList" className={classes.list}>
        <FormControl component="fieldset" className={classes.formControl}>
          {todos !== null ? (
            todos.map((todo: ITodo) => (
              <FormGroup
                aria-label="position"
                row
                key={"task_" + todo.id + "_" + todo.userId}>
                <FormControlLabel
                  control={
                    !todo.completed ? (
                      <Checkbox
                        key={"task_chbx" + todo.id + "_" + todo.userId}
                        name={todo.id.toString()}
                        checked={todo.completed}
                        onChange={handleChange}
                      />
                    ) : (
                      <CheckIcon color="primary" className={classes.icon} />
                    )
                  }
                  label={todo.title}
                />
              </FormGroup>
            ))
          ) : (
            <div className={classes.noItems}>No tasks available</div>
          )}
        </FormControl>
      </div>
    );
  }
  
  export default withRouter(TaskList);
  