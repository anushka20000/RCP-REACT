import api from "./apiClient";
import { AddressServiceResponse } from "../types/UserAddressTypes";


const addAddress = async (data) => {
    const {data:response} = await api.post("add-address", data);
    const result: AddressServiceResponse = response;
    return result
}

const updateUser = async (data) => {
    let response;
    try{

         response = await api.put("profile-info/update", data);
         return response
        }catch(e:any){
            if(e.response.data){
                return e.response.data
            }
            // console.log(response)
    }
}

const getAddress = async () => {
    const response = await api.get("user-address");
    const result = response.data;
    if (result.success)
        return result.data;
    else return [];
}
const getUser = async () => {
    const response = await api.get("profile-info");
  
    const result = response.data;
    if (result.success)
        return result.data;
    else return [];
}

const setAddress = async (addressId) => {
    const response = await api.get("set-address-to-cart/" + addressId);
    const result = response.data;
    if (result.success){
        return result.data;
    }
    else {
        return [];
    }
}

const getProfileAddress = async () => {
    const response = await api.get("profile-info/address");
    const result = response.data;
    if (result.success){
        return result.data;
    }
    else {
        return [];
    }
}
const RemoveAddress = async (data) => {
    const response = await api.post("remove-address", data);
    const result = response.data;
    return result
}

const userAddress = {
    addAddress,
    getAddress,
    setAddress,
    getUser,
    updateUser,
    getProfileAddress,
    RemoveAddress
}
export default userAddress