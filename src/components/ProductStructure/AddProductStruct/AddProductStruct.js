import {Form, Button, Spinner} from 'react-bootstrap'
import classes from './AddProductStruct.module.css'
import {useEffect, useState, useRef} from 'react'
import { Alert } from 'react-bootstrap';

const AddProductStruct = () => {
    const inputRef = useRef();
    const productRef = useRef();
    const productImgRef = useRef();
    const productTwoRef = useRef();
    const productThirdRef = useRef();
    const productThirdImgRef = useRef();
    const productTwoImgRef = useRef();
    const [loading2, changeLoading2] = useState(false);
    const [loading, changeLoading] = useState(false);
    const [loading3, changeLoading3] = useState(false);
    const [reload, changeReload] = useState(0);
    const [done, setDone] = useState(false);
    const [productType, changeProductType] = useState('');
    const [category, changeCategory] = useState({});
    const [filter, changeFilter] = useState([]);
    const [cat, setCat] = useState(false);
    const [fil, setFil] = useState(false);
    const [status, changeStatus] = useState(false);
    const [level, setLevel] = useState([]);
    const [level1, setLevel1] = useState([]);
    const [level2, setLevel2] = useState([]);

    const buttonHandler = (event) => {
        event.preventDefault();
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/addProductSeed`, {
            headers: {
                productType: inputRef.current.value
            }
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response);
            setDone(true)
            changeProductType(response.name)
            changeLoading(false)
        })
    }
    


    const submitStructure = () => {
        console.log("Submit Structure")
        changeStatus(false)
        changeLoading2(true)
        const obj =   {
            productType: productType,
            level: level,
            level1: level1,
            level2: level2
        }
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productStructSeed`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'addedby': 'Admin'  
            },
            method: "POST", 
            body: JSON.stringify(obj)
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            if(response.status === 'done'){
                changeStatus('Done')
            }else{
                changeStatus('Not Done')
            }
            changeLoading2(false)
            console.log(response);
        })
    }

    
    const addCategory = (event) => {
        event.preventDefault();
        if(productImgRef.current.files.length > 0){
            changeLoading3(true);
            const file = productImgRef.current.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (event){
                let obj = {};
                obj.img = event.target.result;
                obj.name = productRef.current.value;
                let prevCategory
                let prevValue = [];
                prevValue = level;
                prevValue.push(obj);
                setLevel(prevValue)
                console.log(level)
                changeReload((prevValue)=>{
                    return prevValue + 1
                })
            }
        }
    }

    return (
        <div className={classes.parentDiv}>
            <Form className={'mt-2 ms-2'}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Add the Product Type</Form.Label>
                    {!done && <Form.Control ref={inputRef}  placeholder="Enter Product Type" />}
                    {done && <Form.Control readOnly value={productType}></Form.Control>}
                </Form.Group>
                {!done &&                 
                <Button onClick={buttonHandler} variant="primary" type="submit">
                        {!loading && 'Submit the Category'}
                        {loading && <Spinner animation="border" role="status"></Spinner>}
                </Button>}
                {done && 
                <Form.Group className={classes.childParent}>
                    <div>
                        Category Adder
                        <div className={classes.categoryParent}>
                            <input ref={productRef} type='text' placeholder={'Enter Category'}></input>
                            <input ref={productImgRef} type='file'></input>
                            <button onClick={addCategory}>Submit SubCategory</button>
                        </div>
                    </div>
                    <div>
                    </div>
                </Form.Group>
                }
                
                { 
                    level.map((single)=>{
                        return (
                            <div className={classes.parentChild}>
                                Category Adder 2 Level
                                
                                <input value={single.name} readonly></input>
                                <input ref={productTwoRef} type={'text'} placeholder={"Enter Second Category"}></input>
                                <button onClick={(event)=>{
                                        event.preventDefault();
                                        let obj = {};
                                        obj.name = productTwoRef.current.value;
                                        obj.parentName = single.name;
                                        obj.level = 2
                                        let newArr = level1;
                                        newArr.push(obj);
                                        setLevel1(newArr);
                                        console.log(level1)
                                        changeReload((prevValue)=>{
                                            return prevValue + 1
                                        })
                                }}>Submit Second Level</button>
                            </div>
                        )
                    })
                }

                {
                    level1.map((single)=>{
                        return (
                            <div className={classes.parentChild}>
                                Category Adder 3 Level
                                <input value={single.name} readonly></input>
                                <input ref={productThirdRef} type={'text'} placeholder={'Enter Third Level Category'}></input>
                                <button onClick={(event)=>{
                                    event.preventDefault();
                                    let obj = {};
                                    obj.name = productThirdRef.current.value;
                                    obj.parentName = single.name;
                                    obj.level = 3
                                    let newArr = level2;
                                    newArr.push(obj);
                                    setLevel2(newArr);
                                    changeReload((prevValue)=>{
                                        return prevValue + 1
                                    })
                                }}>Submit Third Level</button>
                            </div>
                        )
                    })
                }

                {level2.map((singleItem)=>{
                    return (
                        <div className={classes.parentChild}>
                            Third Level Category
                            <input value={singleItem.parentName}></input>
                            <input value={singleItem.name}></input>
                        </div>
                    )
                })}

                {done  && 
                <>
                    <div className={classes.submitStructure}>
                        <Button onClick={submitStructure}>
                            {loading2 && <Spinner animation='border'></Spinner>}
                            {!loading2 && 'Submit Structure'}
                        </Button>
                    </div>
                </>}
            
            </Form>

        </div>
    )
}



export default AddProductStruct




















// {
//     category.first && 
//     category.first.map((singleItem)=>{

//         const submitCategory = (item) => {
//             if(productTwoImgRef.current.files.length > 0){
//                 const file = productTwoImgRef.current.files[0]
//                 const fileReader = new FileReader();
//                 fileReader.readAsDataURL(file);
//                 fileReader.onload = function (event){
//                     let obj = {};
//                     console.log(event.target.result);
//                     obj.img = event.target.result;
//                     obj.name = productTwoRef.current.value;
//                     obj.parentName = item.name;
//                     let prevCategory = category;
//                     if(prevCategory.second){
//                         console.log('hello')
//                         let newArr = [];
//                         newArr = prevCategory.second;
//                         newArr.push(obj);
//                         prevCategory.second  = newArr;
//                     }else{
//                         let prevValue = [];
//                         prevValue.push(obj)
//                         prevCategory.second = prevValue;
//                     }
//                     changeCategory(prevCategory)

//                 }
//             }
//         }

//         return (
//             <div className={classes.parentDiv}>
//                 <input readonly value={singleItem.name}></input>
//                 <input type="text" ref={productTwoRef}></input>
//                 <input type="file" ref={productTwoImgRef}></input>
//                 <button onClick={(event)=>{event.preventDefault();submitCategory(singleItem)}}>Submit Second Level Category</button>
//             </div>
//         )
//     })}

//     {category.second && category.second.map((singleItem)=>{
//         const submitCategory = (item) => {
//             if(productThirdImgRef.current.files > 0){
//                 const file = productThirdImgRef.current.files[0]
//                 const fileReader = new FileReader();
//                 fileReader.readAsDataURL(file);
//                 fileReader.onload = function (event){
//                     let obj = {};
//                     console.log(event.target.result);
//                     obj.img = event.target.result;
//                     obj.name = productThirdRef.current.value;
//                     obj.parentName = item.name;
//                     let prevCategory = category;
//                     if(prevCategory.third){
//                         console.log('hello')
//                         let newArr = []
//                         newArr = prevCategory.third;
//                         newArr.push(obj);
//                         prevCategory.third = newArr;
//                     }else{
//                         let prevValue = [];
//                         prevValue.push(obj)
//                         prevCategory.third = prevValue;
//                     }
//                     changeCategory(prevCategory)
//                 }
//             }
//         }

//         return (
//           <div className={classes.parentName}>
//                 <input readOnly value={singleItem.name}></input>
//                 <input type="text" ref={productThirdRef}></input>
//                 <input type='file' ref={productThirdImgRef}></input>
//                 <button onClick={(event)=>{event.preventDefault(); submitCategory(singleItem)}}>Submit Third Level Category</button>
//             </div>
//         )
//     })}


// const List = ({category}) => {
    //     console.log(category)
    //     return (
    //         <>
    //             {category.map((singleItem)=>{
    //                 return (
    //                     <div>
    //                         {singleItem.name}
    //                     </div>
    //                 )
    //             })}
    //         </>
    //     )
    // }








{/* {category.map((singleItem)=>{
                                return (
                                    <>
                                    <Form.Control readOnly value={singleItem.name}></Form.Control>
                                    <button onClick={(event)=>{event.preventDefault(); categoryAdder(1, singleItem.name)}}>{singleItem.name} +</button>
                                        {singleItem.filterArray && 
                                        <>
                                            {singleItem.filterArray.map((single)=>{
                                                return 
                                                (
                                                    <>
                                                        <Form.Control readonly value={single}></Form.Control>
                                                    </>
                                                )
                                            })}
                                        </>}

                                    </>
                                    )
                            })}
                            {cat && <CategoryAdder></CategoryAdder>} */}



                                // const FilterAdder = ({categories}) => {
    //     let filterRef = useRef()
    //     const changeFilterInput = () => {
    //         let prevArray = category;
    //         if(filterRef.current.value.length > 2){
    //             prevArray.map((singleItem)=>{
    //                 if(singleItem.name === categories){
    //                     if(singleItem.filterArray){
    //                         singleItem.filterArray.push(filterRef.current.value)
    //                     }else{
    //                         singleItem.filterArray = [];
    //                         singleItem.filterArray.push(filterRef.current.value)
    //                     }
    //                 }
    //             })
    //             console.log(prevArray)
    //             changeCategory(prevArray)
    //         }else{
    //             return
    //         }
    //     }

    //     return (
    //         <div>
    //             <Form.Control ref={filterRef}></Form.Control>
    //             <Button onClick={changeFilterInput}>Add Filter</Button>
    //         </div>
    //     )
    // }

    // const CategoryAdder = ({level, parent}) => {
    //     let categoryRef = useRef();
    //     let imageRef = useRef();
    //     const [loading, changeLoading] = useState(false)
    //     const [show, changeShow] = useState(false);
    //     const changeCategoryInput = () => {
    //         changeLoading(true)
    //         console.log('here')
    //         let prevArray = category;
    //         if(categoryRef.current.value.length > 2){

    //             let includes = false;
    //             prevArray.map((singleItem)=>{
    //                 if(singleItem.name === categoryRef.current.value){
    //                     includes = true
    //                 }
    //             })

    //             if(includes === false){
    //                 console.log("includes false")
    //                 if(imageRef.current.files.length > 0){
    //                     console.log('done nnn')
    //                     const obj = {}
    //                     obj.level = level;
    //                     obj.productType = parent;
    //                     obj.name = categoryRef.current.value;
    //                     const file = imageRef.current.files[0];
    //                     const fileReader = new FileReader();
    //                     fileReader.readAsDataURL(file);
    //                     fileReader.onload = function(event){
    //                         obj.img = event.target.result
    //                         prevArray.push(obj);
    //                         changeCategory(prevArray);
    //                         changeLoading(false)
    //                         console.log(category)
    //                     }    
    //                 }else{
    //                     changeLoading(false)
    //                     return
    //                 }
                    
    //             }else{
    //                 changeLoading(false)
    //             }
                
    //         }else{
    //             changeLoading(false)
    //             return
    //         }
    //     }

    //     const showHandler = () => {
    //         changeShow(true)
    //     }

    //     const hideHandler = () => {
    //         changeShow(false)
    //     }

    //     console.log(category)

    //     return (
    //         <>
    //         {show && 
    //         <>
    //             <div>
    //                 <Form.Control ref={categoryRef}></Form.Control>
    //                 <Form.Control ref={imageRef} type='file'></Form.Control>
    //                 <Button onClick={changeCategoryInput}>{loading && <Spinner animation='border'></Spinner>}{!loading && 'Add Category'}</Button>
    //                 <button onClick={hideHandler}>Hide</button>
    //             </div>
    //         </>}
    //         {
    //         !show && 
    //         <div>
    //             <button onClick={showHandler}>Show</button>
    //         </div>
    //         }
    //         </>
    //     )
    // }

    // const categoryAdder = () => {
    //     setCat((prevState)=>{
    //         return !prevState
    //     })
    // }

    // const filterAdder = (event) => {
    //     event.preventDefault()
    //     setFil((prevState)=>{
    //         return !prevState
    //     })
    // } 
