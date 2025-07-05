import api from "./apiClient";
import { PujaServiceResponse } from "../types/pujaType";

const fetchPuja = async (lang: string, location:number, catrgory:number, search:any) => {
    const response = await api.get("pujas/" + lang + '?location='+ (location > 0 ? location : '') + '&category=' + (catrgory > 0 ? catrgory : '') + '&search=' + search );
    const result: PujaServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPuja
