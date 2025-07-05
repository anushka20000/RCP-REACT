import api from "./apiClient";
import { PujaSamagriServiceResponse } from "../types/PujaSamagriType";

const fetchPujaSamagri = async (lang: string, order:number, search:any) => {
    const response = await api.get("puja-kits/" + lang + "?order=" + order + "&search=" + search);
    const result: PujaSamagriServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPujaSamagri
