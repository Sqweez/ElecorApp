import {observable, action, computed} from "mobx";
import {createContext} from 'react';
import {getServices} from "../api/services";

class ServiceStore {
    @observable services = [];
    @observable service = {};

    @computed get mainServices() {
        return this.services.filter(s => !s.main_id);
    }

    @computed get additionalServices() {
        return this.services.filter(s => s.main_id === this.service.id);
    }

    @action
    async getServices() {
        const services = await getServices();
        this.setServices(services.map(s => {
            s.additional_information = s.additional_information ? JSON.parse(s.additional_information) : [];
            return s;
        }))
    }

    @action setServices(payload) {
        this.services = payload;
    }

    @action setService(payload) {
        this.service = this.services.find(s => s.id === payload);
    }

}

export default createContext(new ServiceStore());