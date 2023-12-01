import { useEffect, useRef, useState } from 'react'
import {Spinner} from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import classes from './InTransit.module.css'
import Select from 'react-select'
import AcceptSingle from '../AcceptedOrder/AcceptSingle/AcceptSingle'

const AcceptedOrder = () => {
    
    const [products, changeProducts] = useState([])
    const [originalProducts, changeOriginalProducts] = useState([])
    const [outerState, changeOuterState] = useState(0);
    const [loading, changeLoading] = useState(false)
    const [filterType, changeFilterType] = useState(false);

    const phoneRef = useRef()

    useEffect(() => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderInTransit`).then((response) => {
            return response.json()
        }).then((newArr)=>{
            changeProducts(newArr)
            changeOriginalProducts(newArr)
            changeLoading(false)
        })    
    }, [outerState])


    const nameFilter = (event) => {
        const ogProducts = originalProducts;
        const prevProducts = products;
        let newProducts = [];
        ogProducts.map((singleItem)=>{
            if(singleItem.name.toLowerCase().includes(event.target.value.toLowerCase())){
                newProducts.push(singleItem)
            }
        })
        changeProducts(newProducts)
    }

    const phoneFilter = (event) => {
        const oldProducts =  originalProducts;
        const newProducts = [] 
        oldProducts.map((singleItem)=>{
            if(singleItem.number === phoneRef.current.value){
                newProducts.push(singleItem)
            }
        })
        changeProducts(newProducts)
    }

    const options = [
        {label: 'Date', value:'Date'},
        {label: 'Name', value:"Name"},
        {label: 'Phone', value:"Phone"},
        {label: 'No Filter', value: "No Filter"}
    ]

    const resetHandler = () => {
        changeProducts(originalProducts)
    }

    const dateHandler = (event) => {
        console.log(event.target.value)
        const date = event.target.value.split('-');
        console.log(date);
        const oldProducts = originalProducts;
        const newProducts = [];
        oldProducts.map((singleItem)=>{
            const singledate = singleItem.date.split("/");
            console.log(singledate)
            if(parseInt(singledate[0]) === parseInt(date[2]) && parseInt(singledate[1]) === parseInt(date[1]) && parseInt(singledate[2]) === parseInt(date[0])){
                newProducts.push(singleItem)
            }
        })
        changeProducts(newProducts)
    }


    const acceptHandler = (order) => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/orderDelivered`, {
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
                <div className='mt-2'>
                    <div className={classes.selectDiv}>
                        <button className='mb-2' onClick={resetHandler}>Reset Records</button>
                        <Select onChange={
                            (value)=>{
                                changeProducts(originalProducts)
                                if(value.value === "No Filter"){
                                    changeFilterType(false)
                                }else{
                                    changeFilterType(value.value)
                                }
                            }
                        } options={options}></Select>
                        {filterType === 'Name' && <input placeholder='Name' className={'mt-3'}  type="text" onChange={nameFilter}></input>}
                        {filterType === 'Date' && <>Date to Find<input onChange={dateHandler} type='date' className={'mt-3'}></input></>}
                        {filterType === 'Phone' && <><input placeholder='Phone Number' ref={phoneRef} className={'mt-3'} type={'text'} ></input><button onClick={phoneFilter}>See Number</button></>}
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Cart</th>
                                <th>Courier Service</th>
                                <th>Courier Id</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((itemSingle) => {               
                            return (
                                <AcceptSingle status={'Delivered'} itemSingle={itemSingle} acceptHandler={acceptHandler}></AcceptSingle>
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