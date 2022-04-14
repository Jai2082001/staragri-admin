import { Form, Button, Alert, Spinner, PopoverBody } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';


const AddProduct = () => {

    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const overPriceRef = useRef();
    const frontRef = useRef();
    const rearRef = useRef();
    const frameRef = useRef();
    const gearRef = useRef();
    const brakeRef = useRef();
    const tireRef = useRef();
    const weightRef = useRef();
    const lenghtRef = useRef();
    const widthRef = useRef();
    const heightRef = useRef();
    const inputRef = useRef();
    const suspensionRef = useRef();
    const dispalyImageRef = useRef();
    const descPoint1 = useRef();
    const descPoint2 = useRef();
    const descPoint3 = useRef();
    const descPoint4 = useRef();
    const gstRef = useRef();
    const hsnRef = useRef();
    const quantity = useRef()
    const charRef = useRef();
    const featureRef = useRef()
    let array = [];

    const [loading, changeLoading] = useState(false);
    const [quantityState, changeQuantityState] = useState(false);
    const [category, changeCategory] = useState([]);
    const [level, setLevel] = useState(false);
    const [level2, setLevel2] = useState(false)
    const [product, changeProduct] = useState({});
    const [coupon, changeCoupon] = useState([]);
    const [added, setAdded] = useState(false);
    const [categories, changeCategoryType] = useState(false);
    const [parentCategory, changeParentCategory] = useState([]);
    const [parentProductType, changeParentProductType] = useState([]);
    const [filterArray, changeFilterArray] = useState([]);
    const [season, changeSeason] = useState(false)
    let data = {};
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeParentCategory(response)
            changeParentProductType(response)
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.code, value: item }
            })
            changeCoupon(array)
        })
    }, [])


    const seasonType = [
        {label: "Summer", value: "Summer"},
        {label: "Kharif", value: "Kharif"},
        {label: "Rabi", value: "Rabi"}
    ]

    const stockType = [
        { label: 'In Stock', value: true },
        {label: 'Out of Stock', value: false}
    ]

    const typeProduct = parentProductType.map((singleItem)=>{
        return {label: singleItem.productType, value: singleItem}
    })

    const levelCategory = [];
    const levelCategory2 = [];

    if(categories){
        if(categories.value.category){
            categories.value.category.map((singleItem)=>{
                let obj =  {}
                obj.label = singleItem.name;
                obj.value = singleItem;
                levelCategory.push(obj)
            })
        }  
        if(level){
            categories.value.category.map((singleItem)=>{
                if(singleItem.name === level.name){
                    console.log("hello")
                    console.log(singleItem);
                    if(singleItem.category){
                        console.log('foo')
                        singleItem.category.map((singleItem)=>{
                            let obj = {};
                            obj.label = singleItem.name;
                            obj.value = singleItem
                            levelCategory2.push(obj)                        
                        })
                    }
                }
            })
            
        }
    }


    const buttonHandler = (event) => {
        event.preventDefault();
        
        if(inputRef.current.files <=0 || dispalyImageRef.current.files<=0){
            return
        }
        
        setAdded(false)
        changeLoading(true);
        const files = inputRef.current.files;        
        if (files.length > 0) {
                const delay = (file) => {
                return new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file)
                    fileReader.onload = function (event) {
                        resolve(event.target.result);   
                    };
                })
            }
        const doNextPromise = (d) => {
            delay(files[d])
                .then(x => {
                    array.push(x);
                    d++;
                    if (d < files.length) {
                        doNextPromise(d)
                    }
                    else {
                        const fileReader = new FileReader();
                        const file = dispalyImageRef.current.files[0];
                      
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (event) {
                        let date = new Date();
                        let dateText = date.toLocaleDateString();
                        let dataObj;
                        
                            dataObj = {
                                name: nameRef.current.value,
                                price: priceRef.current.value,
                                coupon: product.coupon,
                                char: charRef.current.value,
                                spec: featureRef.current.value,
                                desc: descRef.current.value,
                                overprice: overPriceRef.current.value,
                                images: array,
                                displayimages: event.target.result,
                                dateadded: dateText,
                                stock: product.stockType,
                                quantity: quantity.current.value,
                                categories: categories,
                                category: product.category,
                                weight: weightRef.current.value,
                                height: heightRef.current.value,
                                lenght: lenghtRef.current.value,
                                width: widthRef.current.value,
                                gst: gstRef.current.value,
                                hsn: hsnRef.current.value,
                                level: level,
                                level2: level2,
                                season: season
                            }

                    fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": 'application/json',
                            'addedby': 'Admin' 
                        },
                        body: JSON.stringify(dataObj)
                    }).then((response) => {
                        return response.json()
                    }).then((response) => {
                        changeLoading(false)
                        if (response.status) {
                            setAdded({ nature: 'error', msg: 'Already in the database' });
                        } else {
                            setAdded({ nature: 'success', msg: 'Added In The Database' });
                        }
                    })
                    }
                    }

                })
           
            }
         
        doNextPromise(0);        
        } else {
        const fileReader = new FileReader();
        const file = dispalyImageRef.current.files[0];         
        fileReader.readAsDataURL(file);
            fileReader.onload = function (event) {
                let dataObj;
                dataObj = {
                        name: nameRef.current.value,
                        price: priceRef.current.value,
                        coupon: product.coupon,
                        char: charRef.current.value,
                        spec: featureRef.current.value,  
                        desc: descRef.current.value,
                        overprice: overPriceRef.current.value,
                        images: array,
                        displayimages: event.target.result,
                        stock: product.stockType,
                        quantity: quantity.current.value,
                        categories: categories,
                        category: product.category,
                        weight: weightRef.current.value,
                        height: heightRef.current.value,
                        lenght: lenghtRef.current.value,
                        width: widthRef.current.value,
                        gst: gstRef.current.value,
                        hsn: hsnRef.current.value,
                        level: level,
                        level2: level2,
                        season: season
                }
                
                fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'addedby': 'Admin',
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(dataObj)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    changeLoading(false)
                    if (response.status) {
                        setAdded({ nature: 'error', msg: response.status });
                    } else {
                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                    }
                })
            }
        }
        
    }




    const FilterComponent = ({product, changeProduct, filter}) => {
        const onChangeHandler = (event) => {
            let prevProduct = product;
            prevProduct[filter] = event.target.value;
            changeProduct(prevProduct)
        }

        return (
            <Form.Group>
                <Form.Label>{`Enter ${filter}`}</Form.Label>
                <Form.Control onChange={onChangeHandler}></Form.Control>
            </Form.Group>
        )
    }


    return (
            
            <Form>

                <Alert variant='secondary' className={'mt-3 mb-3'}>Every Field is Important Dont Leave Any Field Unattended</Alert>

                {/* {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
                {(added && added.nature === 'success') && <Alert variant='info'>{added.msg}</Alert>} */}

                <Form.Group className='mb-3 mt-3'>
                    <Form.Label>Product Type</Form.Label>
                    <Select options={typeProduct} onChange={(value) => {
                        let productPrev = product;
                        productPrev.productType = value;
                        let newArray = parentCategory.filter((item)=>{
                            return item.parentName === value.value.name
                        })
                        newArray = newArray.map((item)=>{
                            return {label: item.name, value: item}
                        })
                        changeCategoryType(value)
                    }}></Select>
                </Form.Group>

                {categories && categories.value.category.length>0 && 
                <Form.Group className="mb-3">
                    <Form.Label>Category Level 1</Form.Label>
                    <Select options={levelCategory} onChange={(value)=>{
                        setLevel(value.value)
                    }}></Select>
                </Form.Group>}

                {categories && levelCategory2.length>0 && 
                <Form.Group className={"mb-3"}>
                    <Form.Label>Category Level 2</Form.Label>
                    <Select options={levelCategory2} onChange={(value)=>{
                        setLevel2(value.value) 
                    }}></Select>
                </Form.Group>}

                {categories &&
                    <Form.Group className='mb-3'>
                        <Form.Label>In Stock or not</Form.Label>
                        <Select options={stockType} onChange={(value) => {
                            if (value.value) {
                                changeQuantityState(true)
                            } else {
                                changeQuantityState(false)
                            }
                            let productPrev = product;
                            productPrev.stockType = value.value;
                            changeProduct(productPrev)
                        }}>
                        </Select>
                    </Form.Group>
                }

                {categories &&
                <Form.Group className={'mb-3'}>
                    <Form.Label>{"Season"}</Form.Label> 
                    <Select options={seasonType} onChange={(value)=>{
                        changeSeason(value.value)      
                    }}>

                    </Select>
                </Form.Group>}

                {categories && 
                <Form.Group className='mb-3'>
                    <Form.Label>HSN CODE</Form.Label>
                    <Form.Control type='number' ref={hsnRef} placeholder='Enter HSN Code'></Form.Control>
                </Form.Group>
                }

                {categories && 
                <Form.Group className='mb-3'>
                    <Form.Label>GST RATE</Form.Label>    
                    <Form.Control type='number' ref={gstRef} placeholder='Enter GST Rate'></Form.Control>
                </Form.Group>}

                {
                    !quantityState  && categories &&
                    <Form.Group className='mb-3'>
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                    </Form.Group>
                    }

                    {quantityState && categories &&
                    <Form.Group className='mb-3'>
                        <Form.Label>Product Quantity</Form.Label>
                        <Form.Control min='1' type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
                    </Form.Group>
                    }

                {categories &&
                <Form.Group className='mb-3'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} placeholder='Enter Product Name'></Form.Control>
                    </Form.Group>}
                {categories && <Form.Group className='mb-3'>
                    <Form.Label>Price of the Product</Form.Label>
                    <Form.Control type='number' ref={priceRef} placeholder='Enter price'></Form.Control>
                </Form.Group>}
                {categories && <Form.Group className='mb-3'>
                    <Form.Label>Overprice of the Product</Form.Label>
                    <Form.Control type='number' ref={overPriceRef} placeholder='Enter overprice'></Form.Control>
                </Form.Group>}
                
                {categories && <Form.Group className="mb-3">
                        <Form.Label>Coupon Applicable</Form.Label>
                            <Select isMulti={true} options={coupon} onChange={(value) => {
                                let productPrev = product;
                                productPrev.coupon = value;
                                changeProduct(productPrev);
                            }}></Select>
                        </Form.Group>
                    }
                
                {categories &&        
                <Form.Group className="mb-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" ref={descRef} placeholder="Enter Description" />
                </Form.Group>}
            
                {categories && 
                <Form.Group className={"mb-3"}>
                    <Form.Label>Characteristics</Form.Label>
                    <Form.Control type="text" ref={charRef} placeholder="Enter Characteristics"></Form.Control>
                </Form.Group>}

                {categories && 
                <Form.Group className={"mb-3"}>
                    <Form.Label>Special Features</Form.Label>
                    <Form.Control type="text" placeholder='Enter Special Features' ref={featureRef}></Form.Control>
                </Form.Group>}
                
                {/* {categories !== 'Cycle' && categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 1</Form.Label>
                    <Form.Control type='text' ref={descPoint1} placeholder='Enter Description Point 1'></Form.Control>
                </Form.Group>}
                
            
                {categories !== 'Cycle'&& categories  &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 2</Form.Label>
                    <Form.Control type='text' ref={descPoint2} placeholder='Enter Description Point 2'></Form.Control>
                </Form.Group>}
            
                {categories !== 'Cycle'&& categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 3</Form.Label>
                    <Form.Control type='text' ref={descPoint3} placeholder='Enter Description Point 3'></Form.Control>
                </Form.Group>}
            
                {categories !== 'Cycle'&& categories  &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 4</Form.Label>
                    <Form.Control type='text' ref={descPoint4} placeholder='Enter Description Point 4'></Form.Control>
                </Form.Group>} */}

                {categories && 
                <>
                    <Form.Group className="mb-3">
                            <Form.Label>Weight Of Product</Form.Label>
                            <Form.Control type="text" ref={weightRef} placeholder="Enter Weight of the Cycle" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Length Of Product</Form.Label>
                            <Form.Control type="text" ref={lenghtRef} placeholder="Enter Weight of the Cycle" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Width Of Product</Form.Label>
                            <Form.Control type="text" ref={widthRef} placeholder="Enter Weight of the Cycle" />
                        </Form.Group>   
                        <Form.Group className="mb-3">
                            <Form.Label>Height Of Product</Form.Label>
                            <Form.Control type="text" ref={heightRef} placeholder="Enter Weight of the Cycle" />
                        </Form.Group>     
                </>}    
                
            {categories &&
                <>
                <p>Main Display Image  <input type='file' className='mt-2 mb-2' ref={dispalyImageRef} accept='image/jpeg, image/png'></input></p>
                <p>Secondary Display Image  <input type="file" className='mb-2' multiple accept='image/jpeg, image/png' ref={inputRef} /></p>
                <Button variant="primary" type="submit" onClick={buttonHandler}>{!loading && 'Submit'}{loading && <Spinner animation='grow'></Spinner>}</Button>
                </>
            }
            </Form> 
        )
}

export default AddProduct;