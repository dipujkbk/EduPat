//This will prevent authenticated usets from accessing this route
// This allows unauthenticated users to access the content.

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function OpenRoute({children}) {
    const {token} = useSelector( (state)=> state.auth);

    if(token === null) {//loged in nehi he
        return children
    }
    else{
        return <Navigate to="/dashboard/my-profile" /> 

        /* i can use alo like this
        navigate('/dashboard/my-profile');
        return null; // You can return null or some loading indicator here */
    }
}

export default OpenRoute
