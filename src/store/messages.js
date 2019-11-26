import {observable, computed, action} from 'mobx'
import React, {createContext} from 'react';

class MessageStore {
    @observable messages = [
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: true,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
        {
            title: 'Элекор',
            date: '22.10.2019',
            text: 'Услуга "Системы противопожарной безопасности была успешно подключена',
            isActive: false,
        },
    ];

    @computed get allMessages() {
        return this.messages.map((m, id) => {
            m.id = id;
            return m;
        });
    }

    @action checkAsRead(id) {
        this.messages = this.messages.filter((m, i) => {
            if (i == id) {
                m.isActive = false;
            }
            return m;
        })
    }

    @computed get messageCount() {
        return this.messages.filter(m => m.isActive).length;
    }
}

const MessageStoreContext = createContext(new MessageStore());

export const MessageProvider = MessageStoreContext.Provider;
export const MessageConsumer = MessageStoreContext.Consumer;

export default MessageStoreContext;

