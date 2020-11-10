import {observable, action} from 'mobx'
import React, {createContext} from 'react';
class MessageModal {
    @observable modal = {
        show: false,
        message: {}
    };

    @action showModal(message) {
        this.modal.show = true;
        this.modal.message = message;
    }

    @action closeModal() {
        this.modal.show = false;
        this.modal.message = {};
    }
}

export const MessageModalContext = createContext(new MessageModal());