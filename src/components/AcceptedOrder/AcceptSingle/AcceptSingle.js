import AddressElement from "../../OrderReceived/AddressElement/AddressElement"
import { Button } from "react-bootstrap"
import CartElement from "../../OrderReceived/CartElement/CartElement"

const AcceptSingle = ({itemSingle, acceptHandler}) => {
    return (
        <tr>
            <td>{itemSingle.name}</td>
            <td>{<AddressElement address={itemSingle.address}></AddressElement>}</td>
            <td><CartElement cart={itemSingle.cart}></CartElement></td>
            <td><div><Button onClick={()=>{acceptHandler(itemSingle)}}>Deliver</Button></div></td>
        </tr>
    )
}

export default AcceptSingle