import api from "./apiClient";
import { homeServiceResponse } from "../types/homeType";
import { useQuery } from "react-query";

const fetchHome = async (lang: string) => {
    const response = await api.get("home/" + lang );
    const result: homeServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}
export default fetchHome
