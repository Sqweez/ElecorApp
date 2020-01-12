import {action, computed, observable} from "mobx";
import {createContext} from 'react';
import getStocks from "../api/stocks";

class StocksStore {

    @observable stocks = [];
    
    @observable stock = {};

    @observable stocksLoaded = false;

    @computed get _stocks() {
        return this.stocks.filter(s => s.service_id === null);
    }

    @action async getStocks() {
        const stocks = await getStocks();
        this.setStocks(stocks);
    }

    @action setStocks(payload) {
        this.stocks = payload;
        this.stocksLoaded = true;
    }

    @computed get stocksCount() {
        return this._stocks.length;
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