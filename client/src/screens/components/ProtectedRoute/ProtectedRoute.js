import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ user, ...props }) => {
    console.log(user);
    return (user.isLoggedIn) ? 
        (<Route {...props} />)
        :
        (<Redirect to="/login" />)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
} 

export default connect(mapStateToProps)(ProtectedRoute);