import axios from 'axios';
import API from "../../consts/api";

export async function setPush(id, push_token) {
    const response = await axios.patch(`${API.SET_PUSH}/${id}`, {
        push_token
    });
    console.log(response);
}

export async function getClientData(id) {
    const response = await axios.get(`${API.GET_CLIENT_INFO}/${id}`);
    return response.data;
}

export async function getMessages(id) {
    const response = await axios.get(`${API.GET_MESSAGES}/${id}`);
    return response.data;
}

export async function markAsRead(id) {
    await axios.patch(`${API.MESSAGES}/${id}`, {
        read: 1
    })
}

export async function sendFeedback(feedback) {
    const response = await axios.post(`${API.FEEDBACK}`, {...feedback});
    console.log(response);
}

export async function getContacts() {
    const {data} = await axios.get(`${API.CONTACTS}`)
    return data;
}