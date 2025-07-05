import api from "./apiClient";
import { SeoServiceResponse } from "../types/seoType";

const fetchSeo = async () => {
    const response = await api.get("home/" );
    const result: SeoServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
const fetchSeoDetails = async (page:any)=>{
    const response = await api.get("seo/"+ page);
    const result: SeoServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export {fetchSeo, fetchSeoDetails}
