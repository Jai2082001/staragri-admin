import classes from './CurrentStock.module.css'
import { Spinner, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const CurrentStock = () => {

    const [loading, changeLoading] = useState(false);
    const [product, changeProduct] = useState([])

    useEffect(() => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWholeSeeds`).then((response) => {
            return response.json()
        }).then((response) => {
            changeProduct(response)
            changeLoading(false)
        })
    }, [])

    return (
        <>
            {loading && <Spinner animation='border'></Spinner>}
            {!loading && 
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Season</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((singleItem)=>{

                            return (
                                <tr>
                                <td>{singleItem.name}</td>
                                <td>{singleItem.price}</td>
                                <td>
                                    <>
                                    {singleItem.stock && 
                                    <>
                                        {((singleItem.stock === 'Out of Stock') || (singleItem.quantity === "0")) && <td>0</td>}
                                        {((singleItem.stock !== "Out of Stock") && (singleItem.quantity !== "0")) && <td>{singleItem.quantity}</td>}
                                    </>}
                                    {!singleItem.stock && <td>0</td>}
                                    </>
                                </td>
                                <td>{singleItem.name}</td>    
                                </tr>
                            )
                            
                        })}
                    </tbody>
                </Table>
            </div>}


        </>
    )
}

export default CurrentStock