import api from "./apiClient";
import { LiveServiceResponse } from "../types/liveType";


const AddAttendee = async (meeting_id: string, user_id: string) => {
    const response = await api.post("create-attendee/"+meeting_id+'/'+user_id);
    const result: LiveServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}


const getjoineeDetailByAttendeeId = async (attendeeId) => {
    const response = await api.get("joinee-detail/attendeeId/"+ attendeeId);
    const result: LiveServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}

const getMeetingDetailByPujaId = async (puja_id) => {
    const response = await api.get("meeting-detail/puja-id/"+ puja_id);
    const result: LiveServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}

const getMeetingDetailByMeetingId = async (meetingId) => {
    const response = await api.get("meeting-detail/meeting-id/"+ meetingId);
    // console.log(response)
    const result: LiveServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}

const createJoineeDetails = async (inputData) => {
    const response = await api.post("create-joinee-detail", inputData);
    const result: LiveServiceResponse = response.data;
  
    if (result.success)
        return result.data;
    else return [];
}





const LiveService = {
    AddAttendee,
    getjoineeDetailByAttendeeId,
    getMeetingDetailByPujaId,
    getMeetingDetailByMeetingId,
    createJoineeDetails
}
export default LiveService
