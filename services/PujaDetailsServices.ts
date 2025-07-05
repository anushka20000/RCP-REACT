import api from "./apiClient";
import { PujaServiceResponse } from "../types/pujaType";
import { PujaDetailsServiceResponse } from "../types/PujaDetailsTypes";

const fetchPujaDetails = async (slug:any, lang: string) => {
    const response = await api.get("puja/" + slug +"/"+ lang  );
    const result: PujaDetailsServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPujaDetails
