import React from 'react';

const IndexPage = (props) =>{
    React.useEffect(()=>{
        const token=localStorage.getItem("Token");
        console.log('Token-->',token);
        if(!token){
            props.history.push('/login');
        }else{
            props.history.push('/dashboard')
        }
    },[0])
    return <div>Index Page</div>
};

export default IndexPage;