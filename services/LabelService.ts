import api from "./apiClient";
import {languageServiceResponse} from "../types/language";

const fetchLabels = async () => {
    // const response = await api.get("labeldemo");
    const response = await api.get("labels");
    const result:languageServiceResponse = response.data;
    if(result.success)
        return result.data;
    else return [];
}
export default  fetchLabels
