import axios from 'axios';
import API from "../../consts/api";

export default async function getStocks() {
    const {data} = await axios.get(API.GET_STOCKS);
    return data;
}