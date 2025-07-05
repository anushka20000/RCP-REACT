import api from "./apiClient";
import { ContactServiceResponse } from "../types/ContactType";

const addContact = async (data) => {
    const {data:response} = await api.post("admin/contact/store", data);
    const result: ContactServiceResponse = response;
    return result
}
export {addContact}