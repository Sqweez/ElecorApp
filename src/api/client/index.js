import axios from 'axios';
import API from "../../consts/api";
import error from "../../consts/error";

export async function setPush(id, push_token) {
    await axios.patch(`${API.SET_PUSH}/${id}`, {
        push_token
    });
}


export async function getWelcomeMessage(id) {
    await axios.get(`${API.WELCOME}/${id}`);
}

export async function getClientData(id) {
    try {
        return await axios.get(`${API.GET_CLIENT_INFO}/${id}`);
    } catch (e) {
        return {
            error: true,
            status: e.response.status,
            message: error[e.response.status],
        }
    }
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

export async function makePay(paymentData) {
    const {data} = await axios.post(`${API.MAKE_PAY}`, paymentData);
    return data;
}