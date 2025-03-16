


export const getToken=()=>{
    return localStorage.getItem('token');
}

export const removeToken =()=>{
    localStorage.removeItem('token')
    
}

export const setToken=(token)=>{
    localStorage.setItem('token',token);
}

export const setUserToken =(user)=>{
    localStorage.setItem('user',JSON.stringify(user));
}

export const getUserToken =()=>{
    const user = localStorage.getItem('user');
    return user?JSON.parse(user):null;
}

export const removeUserToken=()=>{
    localStorage.removeItem('user');
}

export const getUserRole =()=>{
    const user = getUserToken();
    return user? user.role:null;
}

export const getUserName =()=>{
    const user = getUserToken();
    return user? user.name:null;
}
export const getUserAvatar =()=>{
    const user = getUserToken();
    return user? user.avatar:null;
}


export const checkAPI = () => {
    console.log(process.env.REACT_APP_API_URL_LOCAL);
    console.log(process.env.REACT_APP_API_URL_PROD);
};


