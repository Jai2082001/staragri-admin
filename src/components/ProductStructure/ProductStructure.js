import { useEffect, useState } from 'react'
import classes from './ProductStructure.module.css'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import SingleProductStruct from './SingleProductStruct/SingleProductStruct'
import AddProductStruct from './AddProductStruct/AddProductStruct'


const ProductStructure = () => {

    const [loader, changeLoader] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const [data, changeData] = useState([])
    const [action, changeAction] = useState('add')

    useEffect(()=>{
        changeLoader(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeDataArray(response);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response)=>{
                return response.json()
            }).then((response)=>{
                response.push({name: 'Cycle'})
                changeData(response);
                changeLoader(false)
            })
        })
    }, [])

    const secondDataArray = data.map((singleItem)=>{
        return {label: singleItem.name, value: singleItem}
    })

    console.log(dataArray);
    console.log(data)
    
    return (
        <div className={classes.parentDiv}>
            Product Structure

            <Form>
                <Button onClick={()=>{changeAction('add')}}>Add Product Structure</Button>




                {action === 'add' && 
                <>
                    <AddProductStruct></AddProductStruct>       
                </>}

            </Form>       
        </div>
    )
}

export default ProductStructure