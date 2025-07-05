import api from "./apiClient";
import { SettingServiceResponse } from "../types/SettingType";

const fetchSettingDetails = async () => {
   
    const response = await api.get("setting-details/1");
    const result: SettingServiceResponse = response.data;
    return result;
    
}
export default fetchSettingDetails