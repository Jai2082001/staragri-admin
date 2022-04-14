import classes from './SingleProductStruct.module.css'
import {Form, Button} from 'react-bootstrap'
import Select from 'react-select'
import { useState, useEffect } from 'react'


const SingleProductStruct = ({secondDataArray}) => {
    const [singleStruct, changeSingleStruct] = useState(false)
    console.log(singleStruct)
    return (
        <div className={classes.singleProduct}>
            <div className={'mt-3'}>
                    <h3>Edit Product Structure</h3>
                    <Form.Group className={'mt-2'}>
                        <Select options={secondDataArray} onChange={(value)=>{
                            changeSingleStruct(value)
                        }}></Select>
                    </Form.Group>
                    {singleStruct && <SingleStruct singleStruct={singleStruct}></SingleStruct>}  
            </div>
        </div>
    )
}


const SingleStruct = ({singleStruct}) => {
    
    const [loader, changeLoader] = useState(false);
    const [categories, changeCategories] = useState([]);


    useEffect(() => {
        changeLoader(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoriesDisplay`, {
            headers: {
                single: singleStruct.label
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeCategories(response);
            changeLoader(false)
        })
    }, [])
    
    return (
        <>
        {loader && <h5>{'Loading....'}</h5>}            
        {!loader && 
        <div className={classes.parentStructure}>
            <div className={classes.categoryDiv}>
                <h2>Categories</h2>
                <div>
                    {categories.map((singleItem)=>{
                        return (
                            <div className={classes.singleItem}>

                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.filterProperty}>
                <h2>Filter Property</h2>
            </div>
        </div>}
        </>
    )


}

export default SingleProductStruct