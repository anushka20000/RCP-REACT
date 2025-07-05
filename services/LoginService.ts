import api from "./apiClient";
import { LoginServiceResponse } from "../types/loginType";


const Login = async (email, phone, lang) => {

    const response = await api.post("login", { email, phone, lang });
    const result: LoginServiceResponse = response.data;
    console.log(response.data)
    if (result.success)
        return result.data;
    else return [];
}

const VerifyOTP = async (email, phone, otp, booking_token) => {

    //console.log(email)
    const response = await api.post("verify-otp", { email, phone, otp, booking_token });
    const result: LoginServiceResponse = response.data;
    if (result.success)
        return result.data;
    else console.log(result.error);
}

const LoginService = {
    Login,
    VerifyOTP
}
export default LoginService
