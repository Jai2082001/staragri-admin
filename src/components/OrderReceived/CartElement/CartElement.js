import classes from './CartElement.module.css'
import SingleCartElement from './SingleCartElement/SingleCartElement'

const CartElement = ({cart}) => { 

    console.log(cart)
    return (
        <div>
            {cart && 
            <>
                {cart.map((item) => {
                return (
                    <SingleCartElement single={item}></SingleCartElement>
                )
            })}
            </>}
            
        </div>
    )
}

export default CartElement