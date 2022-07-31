import {Button, Modal} from "react-bootstrap";
import s from './Modal.module.scss';
import {useState} from "react";

type PropsType = {
    description: string
    show: boolean
    onHide: () => void
    name: string
    imageURL: string
    tagline: string
    foodPairing: string[]
    abv: number
}

function MyVerticallyCenteredModal(props: PropsType) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={s.main_block}>
                    <img src={props.imageURL}/>
                    <hr/>
                    <p className={s.text_description}>
                        {props.description}

                    </p>
                    <div className={s.text_food_pairing}>
                        <h4>Food pairing</h4>
                        <ul>
                            {props.foodPairing.map(el => <li>{el}</li>)}
                        </ul>
                    </div>
                    <h5 className={s.text_abv}>ABV: {props.abv}</h5>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <div className={s.tags_line}><span>{props.tagline}</span></div>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal