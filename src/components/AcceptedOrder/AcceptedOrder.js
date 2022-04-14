import classes from './AcceptedOrder.module.css'
import { useEffect, useState } from 'react'
import {Spinner} from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import AcceptSingle from './AcceptSingle/AcceptSingle'

const AcceptedOrder = () => {
    
    const [products, changeProducts] = useState([])
    const[outerState, changeOuterState] = useState(0);
    const [loading, changeLoading] = useState(false)

    useEffect(() => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderReceivedAccepted`).then((response) => {
            return response.json()
        }).then((newArr)=>{
            changeProducts(newArr)
            changeLoading(false)
        })    
    }, [outerState])

    const acceptHandler = (order) => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderDeliverySet`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",   
            },
            body: JSON.stringify(order)
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
                                <AcceptSingle itemSingle={itemSingle} acceptHandler={acceptHandler}></AcceptSingle>
                            )
                        })}      
                        {products.length === 0 && "No Order Accepted"}              
                        </tbody>
                    </Table>
                </div>
            </div>
        }
        
        </>
    )
}

export default AcceptedOrder