import api from "./apiClient";
import { PujaServiceResponse } from "../types/pujaType";

const fetchApi = async (slug:any , lang: string) => {
  
    const response = await api.get("cms/" + slug + '/' + lang );
    const result: PujaServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchApi