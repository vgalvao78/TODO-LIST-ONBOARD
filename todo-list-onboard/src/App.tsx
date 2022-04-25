import "./styles.css";
import TodoPage from "./pages/TodoPage";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function App() {
  const history = useHistory();
  useEffect(() => {
    history.push("/user/1");
  }, [history]);

  return (
    <div className="App">
      <TodoPage />
    </div>
  );
}