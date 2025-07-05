import api from "./apiClient";
import { TourServiceResponse } from "../types/tourType";
import { MagazineServiceResponse } from "../types/magazineType";

const fetchMagazine= async (type_id:any) => {
    const response = await api.get("magazines/"+type_id);
    const result: MagazineServiceResponse = response.data;
    return result
}
const fetchType= async (lang: string,) => {
    const response = await api.get("types/"+ lang);
    const result = response.data;
    return result;
}
const storeSubscription= async (data:any) => {
    let response
    try{
        response  = await api.post("add-subscriber",data);
        const result: MagazineServiceResponse = response.data;

        return result
    }catch(e:any){
            return e.response.data
    }
}
const storeMagazine= async (data:any) => {
    let response
    try{
        response  = await api.post("magazine-submission/store",data);
        const result: MagazineServiceResponse = response.data;
  
        return result
    }catch(e:any){
            return e.response.data
    }
}

export  {fetchMagazine, storeSubscription, storeMagazine, fetchType}