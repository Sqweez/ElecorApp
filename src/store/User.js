import {observable, action, computed} from "mobx";
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {setPush, getClientData, getMessages, markAsRead} from '../api/client/index';
import storage_keys from "../consts/storage_keys";


class UserStore {
    @observable user = null;

    @observable user_id = null;

    @observable messages = [];

    @action setUser(payload) {
        this.user = payload;
    }

    @action setUserId(payload) {
        this.user_id = payload;
    }

    @action setMessages(payload) {
        this.messages = payload;
    }

    @action async getMessages() {
        const messages = await getMessages(this.user_id);
        this.setMessages(messages);
    }

    @action
    async getClientData() {
        const client = await getClientData(this.user_id);
        this.setUser(client);
        const push_token = await AsyncStorage.getItem(storage_keys.PUSH_TOKEN);
        if (!client.push_token || push_token !== client.push_token) {
            console.log(push_token);
            console.log(this.user_id);
            await setPush(this.user_id, push_token);
        }
    }

    @action async markAsRead(id) {
        await markAsRead(id);
        this.messages = this.messages.map(m => {
            if (m.id === id) {
                m.read = true;
            }
            return m;
        })
    }

    @computed get isLoggedIn() {
        return !!this.user_id;
    }

    @computed get userLoaded() {
        return !!this.user;
    }

    @computed get unreadCount() {
        return this.messages.filter(m => !m.read).length;
    }

}

export default createContext(new UserStore());