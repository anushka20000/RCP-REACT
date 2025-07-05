import api from "./apiClient";
import { CartServiceResponse } from "../types/cartType";


const GetCart = async (locale: string, booking_token: string) => {
    const response = await api.get("cart/" + locale + "?booking_token=" + booking_token);
    const result: CartServiceResponse = response.data;

    if (result.success)
        return result.data;
    else return [];
}

const AddToCart = async (data) => {
    const { data: response } = await api.post("add-to-cart", data);
    const result: CartServiceResponse = response;
    return result
}

const RemoveFromCart = async (data) => {
    const { data: response } = await api.post("remove-from-cart", data);
    const result: CartServiceResponse = response;
    return result
}

const addAddress = async (data) => {
    const { data: response } = await api.post("add-address", data);
    const result: CartServiceResponse = response.data;

    // if (result.success)
    //     return result.data;
    // else return [];
}

const AddToOrder = async () => {
    const { data: response } = await api.get("add-to-orders");
    const result: CartServiceResponse = response;
    return result;
}


const verifyPayment = async (data) => {
    const { data: response } = await api.post("verify-order", data);
    if (response.success)
        return response.datas;
    else return [];
}

const RemoveCartItems = async () => {
    const { data: response } = await api.delete("remove-carts");
    const result: CartServiceResponse = response.data;
    return result;
}

const CartService = {
    GetCart,
    AddToCart,
    RemoveFromCart,
    addAddress,
    AddToOrder,
    verifyPayment,
    RemoveCartItems
}
export default CartService
