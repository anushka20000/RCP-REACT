import { TourDetailsServiceResponse } from "../types/TourDetailType";
import api from "./apiClient";

const fetchTourDetails = async (slug:any, lang: string) => {
    // slug = 'ganpati-puja'
    const response = await api.get("religious-tour/" + slug + "/" + lang );

    const result: TourDetailsServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}
export default fetchTourDetails