import axios, {AxiosResponse} from "axios"
import {ItemType} from "../Store/reducers/get-beer-reducer";


const instance = axios.create({
    baseURL: 'https://api.punkapi.com/v2',
})

export const beerApi = {
    currentPage(pageNumber: number, size: number){
        return instance.get<ItemType[]>(`/beers?page=${pageNumber}&per_page=${size}`)
    },
    searchBeer(title: string){
        return instance.get<ItemType[]>(`/beers?beer_name=${title}`)
    }
}
