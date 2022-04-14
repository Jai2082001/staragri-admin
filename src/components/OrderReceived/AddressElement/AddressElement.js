import {useState, useEffect} from 'react'
import { Spinner } from 'react-bootstrap'


const AddressElement = ({ address }) => {
    
    const [loading, changeLoading] = useState(false)

    console.log(loading)

    console.log(address)
    return (
        <div>
            <span>{address}</span>
        </div>
    )
}

export default AddressElement