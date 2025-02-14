import axios from "axios";

const api = import.meta.env.VITE_API_URL;

// User
export const UserSignup = async (params) => {
    const signupEndpoint = `${api}/users/register`;

    const formData = new FormData();
    formData.append("firstName", params.firstName);
    formData.append("lastName", params.lastName);
    formData.append("gender", params.gender);
    formData.append("email", params.email);
    formData.append("password", params.password);
    formData.append("avatar", params.avatar); // Append image file

    try {
        const response = await fetch(signupEndpoint, {
            method: "POST",
            body: formData, // Send formData instead of JSON
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Signup error:", error);
        return null;
    }
};

export const UserLogin = async (params) => {
    const loginEndpoint = `${api}/users/login`;
    try {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
};

export const UserData = async (token) => {
    const dataEndpoint = `${api}/users/user`;
    try {
        const response = await axios.get(dataEndpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return error;
    }
};

export const forgoPassword = async (params) => { 
    const forgetPasswordEndpoint = `${api}/users/forgot-password`;
    try {
        const response = await fetch(forgetPasswordEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Forget password error:", error);
        return null;
    }
}

export const resetPassword = async (params, token) => {
    const resetPasswordEndpoint = `${api}/users/reset-password`;
    try {
        const response = await fetch(resetPasswordEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                newPassword: params
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Reset password error:", error);
        return null;
    }
}
