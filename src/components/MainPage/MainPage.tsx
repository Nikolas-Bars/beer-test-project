import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {changeSettingsPageTC, ItemType} from "../../Store/reducers/get-beer-reducer";
import {AppStoreType, useAppDispatch} from "../../Store/Store";
import ItemConponent from "../ItemComponent/ItemConponent";
import s from './MainPage.module.scss'
import SearchComponent from "../SearchComponent/SearchComponent";

const MainPage = () => {

    let items = useSelector<AppStoreType, ItemType[]>(state => state.beerReducer.items)

    const [fetching, setFetching] = useState<boolean>(true)

    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        if (fetching) {
            dispatch(changeSettingsPageTC(25, currentPage))
            setCurrentPage(prevState => prevState + 1)
            setFetching(false)
        }

    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const dispatch = useAppDispatch()

    const scrollHandler = (): void => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <div className={s.mainBlock}>
            <SearchComponent/>

            <div onScroll={scrollHandler} className={s.item_block}>
                {items.map((el, index) => <div key={index}>
                        <ItemConponent abv={el.abv} foodPairing={el.food_pairing} tagline={el.tagline} imgURL={el.image_url}
                                       name={el.name} description={el.description}/>
                    </div>
                )}

            </div>

        </div>
    );
};

export default MainPage;