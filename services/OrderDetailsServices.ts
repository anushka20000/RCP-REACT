import { OrderDetailServiceResponse } from "../types/OrderDetailsTypes";
import api from "./apiClient";

const fetchOrderDetail = async (id:any, locale:string) => {
    const response = await api.get("order-details/"+ id + "/" + locale);
    const result: OrderDetailServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
const fetchInvoice = async (id:any,locale:any) => {
    const response = await api.get("invoice/"+ id+"/"+locale);
    const result = response.data;
    return result
}
export {fetchOrderDetail, fetchInvoice}