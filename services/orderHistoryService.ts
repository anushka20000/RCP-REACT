import api from "./apiClient";
import { OrderHistoryServiceResponse } from "../types/OrderHistoryType";

const fetchOrderHistory = async (statusType, listType) => {
    // statusType=1;
    const response = await api.get("orders/"+statusType+"/"+listType);
    const result: OrderHistoryServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchOrderHistory