import classes from './BrandNameEdit.module.css'
import { Button, ButtonGroup, Form, Dropdown, Alert, InputGroup, Badge } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import Select from 'react-select'

const BrandNameEdit = () => {
    const imgRef = useRef();
    const nameRef = useRef();
    const subNameRef = useRef();
    const cycleBox = useRef();
    const accessBox = useRef();
    const [input, changeInput] = useState('');
    const [inputFocus, changeInputFocus] = useState(false);
    const [dataArray, changeDataArray] = useState([]); 
    const [brandAction, changeBrandAction] = useState('addName');
    const [warning, changeWarning] = useState(false);
    const [done, setDone] = useState(false);
    const [brand, changeBrand] = useState();

    // console.log(warning + done)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/brandDisplay`).then((response) => {
            return response.json()
        }).then((response) => { 
            changeDataArray(response);
        })
    }, [done])

    const removeOptions = dataArray.map((singleItem)=>{
        return {
            label: singleItem.name,
            value: singleItem
        }
    })

    const removeHandler = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/removeBrandName`, {
            headers: {
                name: brand.value.name,
                subname: brand.value.subName
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response)
            setDone('removeDone');
        })
    }
    const buttonHandler = (event) => {
        event.preventDefault();
        if (cycleBox.current.checked === false && accessBox.current.checked) {
            setDone('addCycleAndAccess');
            return 
        }

        if (nameRef.current.value === '') {
            setDone('nameEmpty');
            return
        }

        if (subNameRef.current.value === '') {
            setDone('subNameEmpty');
            return
        }
        if (imgRef.current.files.length === 0) {
            if (imgRef.current.files.length === 0 && warning === 'seen') {
                // console.log('here')
                const dataFetch = { name: nameRef.current.value, subName: subNameRef.current.value , imgFile: '', cycle: cycleBox.current.checked, accessories: accessBox.current.checked};
                fetch(`${process.env.REACT_APP_FETCH_LINK}/brandAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'addedBy': 'Admin'
                    },
                    body: JSON.stringify(dataFetch)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    if (response.status) {
                        setDone('error');
                    } else {
                        setDone('approved')
                    }
                })                
            } else {
                changeWarning(true)
            }
        } else {
            const file = imgRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                const data = event.target.result;
                const dataFetch = { name: nameRef.current.value, subName: subNameRef.current.value, imgFile: data }
                fetch(`${process.env.REACT_APP_FETCH_LINK}/brandAdd`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'addedBy': 'Admin'
                    },
                    body: JSON.stringify(dataFetch)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    if (response.status) {
                        setDone('error');
                    } else {
                        setDone('approved')
                    }
                })
            }
        }
    }
    return (
        <div>
            <ButtonGroup className={'mt-2'}>
            <Button onClick={()=>{changeBrandAction('addName')}}>Add Brand Name</Button>
            <Button className='ms-3' onClick={()=>{changeBrandAction('removeName')}}>Remove Brand Name</Button>
            </ButtonGroup>

            {brandAction === 'addName' &&
                <div>
                
                {
                  (warning === true && warning !== 'seen') &&  
                    <Alert variant="warning" onClose={() => changeWarning('seen')} dismissible>
                    <Alert.Heading>Are You Sure?</Alert.Heading>
                    <p>
                        You have Not Inputed the Logo of the Brand so are you sure about that
                    </p>
                </Alert>}
                <Form className={'m-3'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Add Brand Name</Form.Label>
                        <Form.Control ref={ nameRef } type="Name" placeholder="Enter Name of the brand" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Add Sub-Brand Name</Form.Label>
                        <Form.Control type="Name" ref={ subNameRef } placeholder="Enter Name of the Sub-brand" />
                    </Form.Group>
                     <div className={classes.displayFlex}>
                        <input type="checkbox" name="cycle" ref={cycleBox} id="cycle" className={classes.checkBoxer} />
                        <span>Cycle</span>
                    </div>
                     <div className={classes.displayFlex}>
                        <input type="checkbox" name="accessories" ref={accessBox} id="accessories" className={classes.checkBoxer} />
                        <span>Accessories</span>
                    </div>
                    <Form.Group className={ 'mb-3' }>
                        <Form.Label className={ 'm-2' }>Add Logo</Form.Label>
                        <input type="file" ref={ imgRef } accept='image/png, image/jpeg, image/jpg' name='Image' id="Image" />
                    </Form.Group>
                    <Button onClick={ buttonHandler } variant="primary" type="submit">
                        Submit
                    </Button>

                    {done === 'approved' && <Alert className={'mt-5'} variant='success'>The Brand Has been successfully added</Alert>}
                    
                    {done === 'error' && <Alert variant='danger' className={'mt-5'}>
                        The Brand is Already in the database
                    </Alert>}
                    
                    {done === 'addCycleAndAccess' && <Alert variant='danger' className={'mt-5'}>
                        Check Atleast One Box between cycle or accessories
                    </Alert>}

                    {done==='nameEmpty' && <Alert variant='danger' className={'mt-5'}>
                        Name Field Cannot Be Empty
                    </Alert>}

                    {done==='subNameEmpty' && <Alert variant='danger' className={'mt-5'}>
                        SubName Field Cannot Be Empty
                    </Alert>}

                </Form>
            </div>}
            {brandAction === 'removeName' &&
                <div className={'mt-3'}>
                
                <Select onChange={(value)=>{
                    console.log(value)
                    setDone('foo')
                    changeBrand(value)
                }} options={removeOptions}></Select>
                
                <Button className='mt-3' onClick={removeHandler}>Remove the brand</Button>
                {done === 'removeDone' && <Alert className='mt-5' variant='info'>Brand is Deleted</Alert>}

                </div>
            }

        </div>
    )
}

export default BrandNameEdit
