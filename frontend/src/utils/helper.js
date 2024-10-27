// Sử dụng localStorage để lưu trữ token
export const setToken = (token) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
};

// Sử dụng localStorage để lưu trữ thông tin user
export const setUser = (user) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

// Lấy token từ localStorage
export const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
};

// Lấy thông tin user từ localStorage
export const getUser = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
};

// Xóa token và user từ localStorage
export const clearAuthData = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Giải mã JWT token
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

// Kiểm tra người dùng đã đăng nhập hay chưa dựa trên token
export const isLogined = () => {
    const token = getToken();
    if (!token) return false;
    const { exp } = parseJwt(token);
    return Date.now() < exp * 1000;
};
