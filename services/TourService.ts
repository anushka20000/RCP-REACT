import api from "./apiClient";
import { TourServiceResponse } from "../types/tourType";

const fetchTour = async (lang: string, search:any, location:any) => {
   
    const response = await api.get("religious-tours/" + lang + "?search=" + search + "&location="+location );
    

    const result: TourServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}
export default fetchTour