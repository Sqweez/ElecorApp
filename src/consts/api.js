const BASE_URL = 'http://192.168.0.104:8001/api/';


/*
const BASE_URL = 'https://elecor.ariesdev.kz/api/';
*/


export default {
    GET_SMS: `${BASE_URL}mobile/auth`,
    GET_CLIENT_INFO: `${BASE_URL}mobile/client`,
    SET_PUSH: `${BASE_URL}clients/update`,
    GET_MESSAGES: `${BASE_URL}mobile/messages`,
    MESSAGES: `${BASE_URL}mobile/messages`,
    FEEDBACK: `${BASE_URL}feedback`,
    CONTACTS: `${BASE_URL}mobile/contacts`,
    GET_STOCKS: `${BASE_URL}stocks?mobile=true`,
    GET_SERVICES: `${BASE_URL}mobile/services?mobile=true`,
    CREATE_ORDER: `${BASE_URL}orders`,
    MAKE_PAY: `${BASE_URL}mobile/pay`,
    WELCOME: `${BASE_URL}mobile/welcome`
}