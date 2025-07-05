import api from "./apiClient";
import { AstrologyServiceResponse } from "../types/AstrologyType";

const fetchAstrology = async (lang: string, order: number, search: any) => {
    const response = await api.get("astrologies/" + lang + "?order=" + order + "&&search=" + search);
    const result: AstrologyServiceResponse = response.data;
    if (result.success)
        return result.data;
    else return [];
}

const fetchAstrologyProductBySlug = async (slug: any, locale: string) => {
    //console.log(locale)
    const response = await api.get("astrology-product/" + slug + "/" + locale);
    const result: AstrologyServiceResponse = response.data;
    if (result.success)
        return result;
    else return [];
}

const AstrologyService = {
    fetchAstrology,
    fetchAstrologyProductBySlug
}
export default AstrologyService