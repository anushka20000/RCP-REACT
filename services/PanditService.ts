import api from "./apiClient";
import { PujaServiceResponse } from "../types/pujaType";

const fetchPandit = async (lang: string) => {
    const response = await api.get("pandit/" + lang );
    const result = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPandit;