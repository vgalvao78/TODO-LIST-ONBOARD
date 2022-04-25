import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";

interface IProps {
  children?: Element;
}

export default class Routes extends React.Component<IProps> {
  render() {
    return (
      <Switch>
        <Route path="/" component={App} />
        {this.props.children}
      </Switch>
    );
  }
}
