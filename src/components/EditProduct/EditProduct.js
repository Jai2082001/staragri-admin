import { Form, Button, Modal, ModalBody, Spinner, Alert } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import Select from 'react-select';

const EditProduct = () => {

    const [product, changeProduct] = useState([]);
    const [singleProduct, changeSingleProduct] = useState(false);
    const [coupons, changeCoupons] = useState(false);
    const [category, changeCategory] = useState(false);
    const [modalLoading, changeModalLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const [quantityState, setQuantityState] = useState(false);
    const [images, changeImages] = useState('');
    const [secImages, changeSecImages] = useState([])
    const overPriceRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const quantity = useRef();
    const imgRef = useRef();
    const imgSecRef = useRef();

    useEffect(() => {
        changeModalLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWhole`).then((res) => {
            return res.json()
        }).then((response) => {
            console.log(response)
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeProduct(array);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
                return response.json();
            }).then((response) => {
                const array = response.map((item) => {
                    return { label: item.code, value: item }
                })
                changeCoupons(array);
                fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
                    return response.json();
                }).then((response) => {
                    const array = response.map((item) => {
                        return { label: item.name, value: item }
                    })
                    changeCategory(array);
                    changeModalLoading(false);
                })
            })
        })
    }, [])

    const stockType = [
        { label: 'In Stock', value: true },
        { label: 'Out of Stock', value: false }
    ]

    console.log(singleProduct);

    const productSelector = (value) => {
        changeModalLoading(true)
        setTimeout(() => {
            changeSingleProduct(value.value)
            changeModalLoading(false);
            setAdded(false)
        }, 2000);
    }

    console.log(singleProduct)

    const submitHandler = () => {
        changeModalLoading(true);
        console.log(singleProduct)
        if (singleProduct) {

            let dataObj = {}


            dataObj = {
                id: singleProduct._id,
                name: nameRef.current.value ? nameRef.current.value : singleProduct.name,
                overprice: overPriceRef.current.value ? overPriceRef.current.value : singleProduct.overprice,
                price: priceRef.current.value ? priceRef.current.value : singleProduct.price,
                desc: descRef.current.value ? descRef.current.value : singleProduct.desc,
                categories: singleProduct.categories,
                stock: singleProduct.stock,
                coupon: singleProduct.coupon,
                emi: singleProduct.emi,
                quantity: quantity.current.value ? quantity.current.value : singleProduct.quantity,
                category: singleProduct.category,
                brand: singleProduct.brand
            }
            // // fetch(`${process.env.REACT_APP_FETCH_LINK}/updateProduct`)
            // const fileReader = new FileReader();

            // fileReader.readAsDataURL(imgRef.current.files)
            fetch(`${process.env.REACT_APP_FETCH_LINK}/updateProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    product: singleProduct.categories
                },
                body: JSON.stringify(dataObj)
            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response)
                if (response.status) {
                    setAdded({ nature: 'error', msg: response.status });
                } else {
                    setAdded({ nature: 'success', msg: 'Edited in the database' });
                }
                changeModalLoading(false)
            })
        } else {
            changeModalLoading(false)
            return
        }
    }

    return (
        <>
            {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
            {(added && added.nature === 'success') && <Alert variant='info'>{added.msg}</Alert>}


            <Modal show={modalLoading} background='static' keyboard={false}>
                <ModalBody>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </ModalBody>
            </Modal>

            <Alert variant='secondary' className='mt-3 mb-3'>Dont Leave Any Field Unattended</Alert>

            <div>
                {!modalLoading && <><Form.Group className="mb-3 mt-3">
                    <Form.Label>Select Product</Form.Label>
                    <Select defaultValue={singleProduct.name} options={product} onChange={(value) => { productSelector(value) }}></Select>
                </Form.Group>


                    {singleProduct &&
                        <Form.Group>
                            <Form.Label>Product Parent Categories</Form.Label>
                            <Form.Control type='text' readOnly placeholder={singleProduct.categories.label}></Form.Control>
                        </Form.Group>}

                    <Form.Group className="mb-3 mt-3">
                        {singleProduct && <> <Form.Label>Product Name</Form.Label> <Form.Control type="text" readOnly placeholder={singleProduct.name} />
                            <Form.Control ref={nameRef} placeholder={'Edit the Name'} className={'mt-2'}></Form.Control></>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {singleProduct && <><Form.Label>Overprice</Form.Label>
                            <Form.Control type="number" min="0" readOnly placeholder={singleProduct.overprice} />
                            <Form.Control ref={overPriceRef} placeholder={'Edit the Overprice'} className={'mt-2'}></Form.Control></>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {singleProduct && <>  <Form.Label>Product Price</Form.Label><Form.Control type="number" min="1" readOnly placeholder={singleProduct.price} />
                            <Form.Control ref={priceRef} placeholder={'Edit the price'} className={'mt-2'}></Form.Control></>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {singleProduct && <> <Form.Label>Product Description</Form.Label>  <Form.Control type="text" readOnly placeholder={singleProduct.desc} />
                            <Form.Control ref={descRef} placeholder={'Edit the Description'} className={'mt-2'}></Form.Control></>}
                    </Form.Group>
                    {quantityState &&
                        <>

                            <Form.Group className='mb-3'>
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                            </Form.Group>
                        </>
                    }
                    {
                        !quantityState && singleProduct &&
                        <>
                            <Form.Group className='mb-3'>
                                <Form.Label>Product Quantity</Form.Label>
                                <Form.Control type='number' className='mb-2' readonly value={singleProduct.quantity}></Form.Control>
                                <Form.Control type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
                            </Form.Group>
                        </>
                    }

                    {singleProduct &&
                        <Form.Group className="mb-3">
                            <>
                                <Form.Label>Quantity Type</Form.Label>
                                <Select options={stockType} onChange={(value) => {
                                    let productPrev = singleProduct;
                                    if (value.value) {
                                        setQuantityState(false);
                                    } else {
                                        setQuantityState(true);
                                    }
                                    productPrev.stock = value.label;
                                    changeSingleProduct(productPrev)
                                }}></Select>
                            </>
                        </Form.Group>
                    }

                    {/* {singleProduct &&
                        <>
                            <Form.Group className={'mb-3'}>
                                <Form.Label>{'Primary Image '}</Form.Label>
                                <input type={'file'}></input>
                            </Form.Group>
                        </>}

                    {singleProduct &&
                        <>
                            <Form.Group>
                                <Form.Label>{"Secondary Images"}</Form.Label>
                                <input type={'file'} multiple></input>
                            </Form.Group>
                        </>} */}

                    {singleProduct && <Button variant="primary" type="submit" onClick={submitHandler}>
                        Submit
                    </Button>}
                </>}

            </div>
        </>
    )
}

export default EditProduct