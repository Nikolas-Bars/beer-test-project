import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from "../useDebounce/useDebounce";
import {changeSettingsPageTC, searchBeerTC} from "../../Store/reducers/get-beer-reducer";
import {useAppDispatch} from "../../Store/Store";
import {Form} from 'react-bootstrap';

const SearchComponent = () => {

    const dispatch = useAppDispatch()

    const [searchText, setSearchText] = useState<string>('')

    const debouncedValue = useDebounce<string>(searchText, 750)

    useEffect(() => {
        if(debouncedValue.trim() == ''){
            debugger
            dispatch(changeSettingsPageTC(25, 1))
        }else{
            dispatch(searchBeerTC(searchText))
        }
    }, [debouncedValue, dispatch])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value)
    }

    return (
        <div>
            <Form.Control style={{width: '300px', margin: '25px 25px auto auto'}} onChange={onChangeHandler} size="lg"
                          type="text" placeholder="Find your beer"/>
        </div>
    );
};

export default SearchComponent;