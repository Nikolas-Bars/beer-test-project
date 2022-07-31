import React, {useState} from 'react';
import s from './ItemComponent.module.scss'
import MyVerticallyCenteredModal from "../Modal/Modal";
import {Button, Card} from "react-bootstrap";

export type ItemPropsType = {
    imgURL: string
    name: string
    description: string
    tagline: string
    foodPairing: string[]
    abv: number
}

const ItemConponent: React.FC<ItemPropsType> = (props) => {

    const [modalShow, setModalShow] = useState(false)

    return (
        <Card className={s.main_block}>
            <Card.Img className={s.img} variant="top" src={props.imgURL}/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className={s.description}>
                    <div onClick={() => {
                        setModalShow(true)
                    }}>{props.description.slice(0, 100)}...</div>
                </Card.Text>

            </Card.Body>
            <Button variant="primary" onClick={() => {
                setModalShow(true)
            }}>Learn more</Button>
            <MyVerticallyCenteredModal
                description={props.description}
                show={modalShow}
                onHide={() => setModalShow(false)}
                name={props.name}
                imageURL={props.imgURL}
                tagline={props.tagline}
                foodPairing={props.foodPairing}
                abv={props.abv}
            />
        </Card>
    );
};

export default ItemConponent;