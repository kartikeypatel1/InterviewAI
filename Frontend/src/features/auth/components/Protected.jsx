import React from 'react'
const {useAuth: useAuthHook} = require('../hooks/useAuth.jsx')
const {Navigate} = require('react-router');

const Protected = ({children}) => {
    const {loading, user} = useAuthHook();
    if(loading){
        return <div>Loading...</div>
    }
    if(!user){
        return <Navigate to="/login"/>
    }
  return children;
}

export default Protected
