export const setToken = (token)=>{
    localStorage.setItem("token", token)
}
export const setUser = (user)=>{
    localStorage.setItem("user", user)
}
export const getToken = ()=>{
    return localStorage.getItem("token")
}
export const getUser = ()=>{
    return localStorage.getItem("user")
}


export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        return {};
    }
}

export const isLogined = () => {
    const token = getToken();
    if (!token) return false;
    const { exp } = parseJwt(token);
    console.log(exp);
    return Date.now() < exp * 1000;
};
