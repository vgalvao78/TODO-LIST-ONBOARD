import { render } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders properly Title", () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(getByText("Onboarding tracker")).toBeInTheDocument();
});
