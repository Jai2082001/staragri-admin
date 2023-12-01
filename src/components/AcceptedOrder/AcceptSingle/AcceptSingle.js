import AddressElement from "../../OrderReceived/AddressElement/AddressElement"
import { Button } from "react-bootstrap"
import CartElement from "../../OrderReceived/CartElement/CartElement"
import { useRef } from "react"

const AcceptSingle = ({itemSingle, acceptHandler, status}) => {


    const service = useRef()
    const id = useRef()


    return (
        <>
        {status === 'Put In Transit' && 
            <tr>
            <td>{itemSingle.name}</td>
            <td>{itemSingle.number}</td>
            <td>{itemSingle.date}</td>
            <td><input ref={service} placeholder="Courier Service"></input></td>
            <td><input ref={id} placeholder="Courier Id"></input></td>
            <td>{<AddressElement address={itemSingle.address}></AddressElement>}</td>
            <td><CartElement cart={itemSingle.cart}></CartElement></td>
            <td><div><Button onClick={()=>{acceptHandler(itemSingle, service.current.value, id.current.value)}}>{status}</Button></div></td>
        </tr>
        }
        {status === 'Delivered' &&
        <tr>
            <td>{itemSingle.name}</td>
            <td>{itemSingle.number}</td>
            <td>{itemSingle.date}</td>
            <td>{itemSingle.service}</td>
            <td>{itemSingle.coid}</td>
            <td>{<AddressElement address={itemSingle.address}></AddressElement>}</td>
            <td><CartElement cart={itemSingle.cart}></CartElement></td>
            <td><div><Button onClick={()=>{acceptHandler(itemSingle)}}>{status}</Button></div></td>
        </tr>
        }
        {status === 'History' &&
            <tr>
                <td>{itemSingle.name}</td>
                <td>{itemSingle.number}</td>
                <td>{itemSingle.date}</td>
                <td>{itemSingle.service}</td>
                <td>{itemSingle.coid}</td>
                <td>{<AddressElement address={itemSingle.address}></AddressElement>}</td>
                <td><CartElement cart={itemSingle.cart}></CartElement></td>
                <td>{itemSingle.deliveryDate}</td>
            </tr>
        }
        
        </>
    )
}

export default AcceptSingle