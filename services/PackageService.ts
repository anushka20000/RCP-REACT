import api from "./apiClient";
import { PujaServiceResponse } from "../types/pujaType";

const fetchPackage = async (slug:any , lang: string) => {
    // slug = 'satyanarayan-puja'
    const response = await api.get("puja-packages/" + slug + '/' + lang );
    const result: PujaServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPackage