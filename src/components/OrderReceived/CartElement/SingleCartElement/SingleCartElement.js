import {useEffect, useState} from 'react'
import {Spinner}  from 'react-bootstrap'
import classes from './SingleCartElement.module.css'

const SingleCartElement = ({single}) => {

    const [item, changeItem] = useState(false)

    useEffect(()=>{
        if(single.product){
            fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWithId`, {
                headers: {
                    productid: single.product
                }
            }).then((response)=>{
                return response.json()
            }).then((response)=>{
                changeItem(response)
            })
        }else{
            return
        }
    }, [])

    return (
        <div>

            {!item && <Spinner animation='border'></Spinner>}
            {item && 
            <>
                <div className={classes.imgDiv}>
                        <div className={classes.pContainer}>
                            <p>{ item.product.name } x {single.quantity}</p>
                        </div>
                        
                    </div>
            </>}

        </div>
    )
}

export default SingleCartElement