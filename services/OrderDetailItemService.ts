import api from "./apiClient";
import { OrderDetailItemServiceResponse } from "../types/OrderDetailItem";


const fetchOrderDetailItem = async (id:any, locale:string) => {
  
    const response = await api.get("order-detail-item/"+ id + "/" + locale);
    const result: OrderDetailItemServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return {};
}
export default fetchOrderDetailItem