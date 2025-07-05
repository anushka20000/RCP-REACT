import api from "./apiClient";
import { PujaKitsServiceResponse } from "../types/PujaKitTypes";

const fetchPujaKitDetails = async (slug:any, lang: string) => {
   
    const response = await api.get("samagri-packages/" + slug +"/"+ lang  );
    const result: PujaKitsServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchPujaKitDetails