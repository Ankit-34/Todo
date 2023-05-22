import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {

    const {Home} = props;
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('accessToken') !== "ankit.ganatra")
            navigate('/login');
    },[]);

  return (
    <>
        <Home />
    </>
  )
}

export default Protected