import {action, computed, observable} from "mobx";
import {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {deleteMessage, getClientData, getMessages, markAsRead, setPush} from '../api/client/index';
import storage_keys from "../consts/storage_keys";


class UserStore {
    @observable user = null;

    @observable user_id = null;

    @observable messages = [];

    @observable accounts = [];

    @observable currentStep = 0;

    @observable connectedServices = [];

    @observable connections = [];
    
    @observable error = null;

    @action setUser(payload) {
        let _payload = payload;
        _payload.transactions = _payload.transactions.filter(p => p);
        this.user = _payload;
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

    @action setConnectedServices(payload) {
        const services = [];
        this.connections = payload;
        payload.forEach(p => {
           const i = services.findIndex(s => s.service_name === p.service_name);
           if (i === -1) {
               services.push({
                   service_name: p.service_name,
                   id: p.id,
                   balance: p.balance < 0 ? (p.balance - -1).toString() : '0',
                   accounts: [p.personal_account]
               })
           }
           else {
               services[i].accounts.push(p.personal_account);
           }
        });

        this.connectedServices = services;
    }

    @action
    async getClientData() {
        const response = await getClientData(this.user_id);
        if (response.error) {
            this.error = response.message;
            return response.status;
        }

        const client = response.data;



        this.setUser(client);
        this.setConnectedServices(client.connections);
        const push_token = await AsyncStorage.getItem(storage_keys.PUSH_TOKEN);
        if (!client.push_token || push_token !== client.push_token) {
            await setPush(this.user_id, push_token);
        }
        return true;
    }

    @action async deleteMessage(id) {
        this.messages = this.messages.filter(m => m.id !== id);
        await deleteMessage(id);
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

    @action resetStep() {
        this.currentStep = 0;
    }

    @action async logout() {
        await AsyncStorage.removeItem(storage_keys.USER_ID);
        this.user = null;
        this.user_id = null;
        this.messages = [];

        this.accounts = [];

        this.currentStep = 0;

        this.connectedServices = [];
    }

    @action incrementStep() {
        this.currentStep++;
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

    @computed get uniqueServices() {
        return [... new Set(this.connectedServices.map(c => c.service_name))];
    }

    @computed get hasConnections() {
        return this.connectedServices.length > 0;
    }

    @computed get transactions() {
        return this.user.transactions.slice(0, 10 * (this.currentStep + 1));
    }

    @computed get hasUnloadedTransactions() {
        return this.transactions.length < this.user.transactions.length;
    }


}

export default createContext(new UserStore());