import {useEffect, useState, useRef} from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import CartElement from "./CartElement/CartElement"
import AddressElement from "./AddressElement/AddressElement"
import { Button, Form } from "react-bootstrap";
import classes from './OrderReceived.module.css'
import OrderReceivedParent from './OrderReceivedParent/OrderReceivedParent';


const OrderReceived = () => {
    
    const [products, changeProducts] = useState([])
    const[outerState, changeOuterState] = useState(0);
    const [loading, changeLoading] = useState(false)

    useEffect(() => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderReceived`).then((response) => {
            return response.json()
        }).then((response)=>{
            changeProducts(response)
            changeLoading(false)
        })    
    }, [outerState])

    const acceptHandler = (cartItem, length, width, weight, height) => {

        console.log(length);
        console.log(width);
        console.log(weight);
        console.log(height);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderAccept`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "length": length,
                "width": width,
                "weight": weight,
                "height": height   
            },
            body: JSON.stringify(cartItem)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.status === 'ok') {
                changeOuterState((prevState) => {
                    return prevState + 1
                })
            }
        })
    }

    const rejectHandler = (cartItem) => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderReject`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItem)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.status === 'ok') {
                changeOuterState((prevState) => {
                    return prevState + 1
                })
            }
        })
    }

    return (
        <>

        {loading && <Spinner animation='border'></Spinner>}
        {!loading && 
            <div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Cart</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((itemSingle) => {               
                            return (
                                <OrderReceivedParent itemSingle={itemSingle} acceptHandler={acceptHandler} rejectHandler={rejectHandler}></OrderReceivedParent>
                            )
                        })}      
                        {products.length === 0 && "No Order Received"}              
                        </tbody>
                    </Table>
                </div>
            </div>
        }
        
        </>
    )
}

export default OrderReceived