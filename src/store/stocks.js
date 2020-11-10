import {action, computed, observable} from "mobx";
import {createContext} from 'react';
import getStocks from "../api/stocks";
import AsyncStorage from '@react-native-community/async-storage';
import STORAGE_KEYS from "../consts/storage_keys";

class StocksStore {

    @observable stocks = [];
    
    @observable stock = {};

    @observable stocksLoaded = false;

    @observable readStocks = [];

    @computed get _stocks() {
        return this.stocks.filter(s => s.service_id === null)
    }

    @action async setReadStocks(id = null) {
        let _readStocks = await AsyncStorage.getItem(STORAGE_KEYS.STOCKS);
        if (_readStocks === null) {
            _readStocks = [];
        } else {
            _readStocks = JSON.parse(_readStocks);
        }
        console.log(_readStocks);
        this.readStocks = _readStocks;
    };

    @action async getStocks() {
        const stocks = await getStocks();
        this.setStocks(stocks);
    }

    @action setStocks(payload) {
        this.stocks = payload;
        this.stocksLoaded = true;
    }

    @computed get stocksCount() {
        return this._stocks.filter(s => {
            return !this.readStocks.includes(s.id);
        }).length;
    }

    @computed get banners() {
        return this.stocks.map(s => {
            return {
                id: s.id,
                illustration: s.image,
                service_id: s.service_id
            }
        });
    }
    
    @action setStock(id) {
        this.stock = this.stocks.find(s => s.id === id);
    }

}

export default createContext(new StocksStore());