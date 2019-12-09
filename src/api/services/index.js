import axios from 'axios';
import API from "../../consts/api";

export async function getServices() {
    const { data } = await axios.get(API.GET_SERVICES);
    return data;
}

export async function createOrder(order) {
    await axios.post(API.CREATE_ORDER, order);
}
