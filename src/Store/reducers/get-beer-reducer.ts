import {beerApi} from "../../Api/Api";
import {Dispatch} from "react";

export type ItemType = {
    abv: number
    id: number
    name: string
    tagline: string
    first_brewed: string
    description: string
    image_url: string
    ibu: number
    target_fg: number
    target_og: number
    ebc: number
    srm: number
    ph: number
    attenuation_level: number
    volume: {
        value: number
        unit: string
    }
    boil_volume: {
        value: number
        unit: string
    }
    method: {
        mash_temp:
            {
                "temp": {
                    "value": number,
                    "unit": string
                }
                duration: number
            }[],

        fermentation: {
            "temp": {
                "value": number,
                "unit": string
            }
        },
        twist: null | string
    }
    ingredients: {
        malt: {
            "name": string,
            "amount": {
                "value": number
                "unit": string
            }
        }[],

        hops: {
            "name": string,
            "amount": {
                "value": number,
                "unit": string
            },
            "add": string,
            "attribute": string
        }[],
        yeast: string
    }
    food_pairing: string[],
    brewers_tips: string
    contributed_by: string
}

export type StateType = {
    currentPage: number,
    pageSize: number,
    items: ItemType[]
}

let initialState = {
    currentPage: 1,
    pageSize: 25,
    items: [] as ItemType[]
}

export const getBeerReducer = (state: StateType = initialState, action: ActionBeerType): StateType => {
    switch (action.type) {
        case "CHANGE_SETTING_PAGE": {
            return {
                ...state,
                items: [...state.items, ...action.data],
                currentPage: action.currentPage,
                pageSize: action.pageSize
            }
        }
        case "SEARCH": {
            return {...state, items: action.data}
        }
        default: {
            return state
        }
    }
}

export const changeSettingsPageAC = (data: ItemType[], currentPage: number, pageSize: number) => ({
    type: 'CHANGE_SETTING_PAGE',
    data,
    currentPage,
    pageSize
} as const)

export const searchAC = (data: ItemType[]) => ({type: 'SEARCH', data} as const)

export type ActionBeerType = ReturnType<typeof changeSettingsPageAC> | ReturnType<typeof searchAC>

export const changeSettingsPageTC = (size: number, pageNumber: number) => (dispatch: Dispatch<ActionBeerType>) => {
    beerApi.currentPage(pageNumber, size)
        .then((res) => {
            dispatch(changeSettingsPageAC(res.data, pageNumber, size))
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const searchBeerTC = (title: string) => (dispatch: Dispatch<ActionBeerType>) => {
    debugger
    beerApi.searchBeer(title).then((res) => {
        debugger
        dispatch(searchAC(res.data))
    })
        .catch((err)=>{
            console.log(err)
        })

}