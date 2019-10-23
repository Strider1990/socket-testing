import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/UserActions';
import Input from '../Input';

const Login = ({ onLoginClicked }) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, []);

    return (
        <div className="flex max-w-3xl flex-col mx-auto">
            <Input
                className="my-2 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300"
                placeholder="Email"
                name="email"
                value={ values.email }
                onChange={ handleInputChange } />
            <Input
                className="my-2 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-300"
                placeholder="Password"
                name="password"
                type="password"
                value={ values.password }
                onChange={ handleInputChange } />
            <button
                type="button"
                className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1"
                onClick={() => onLoginClicked(values)}>
                Login
            </button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginClicked: (values) => {
            dispatch(loginUser(values))
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);