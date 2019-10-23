import React from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ProtectedRoute from './components/ProtectedRoute';

const Home = (props) => (
    <>
        <Navigation />
        <Switch>
            <Route exact path="/login" component={ Login } />
            <ProtectedRoute exact path="/chat" component={ Chat } />
            <Route component={ FrontPage } />
        </Switch>
    </>
)

export default Home;