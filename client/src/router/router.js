import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../screens/home';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route component={ Home } />
            </Switch>
        </Router>
    )
}

export default AppRouter;