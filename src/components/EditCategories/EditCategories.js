import { Form, Button, ButtonGroup, Dropdown, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import classes from './EditCategories.module.css';
import Select from 'react-select';

const EditCategories = () => {


    const imgRef = useRef()

    const [data, changeData] = useState([])
    const [categoryAction, changeCategoryAction] = useState('addCategory');
    const [inputFocus, changeInputFocus] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remover, setRemover] = useState('');
    const [single, changeSingle] = useState()
    const [filter, changeFilter] = useState(0);

    const categoryNameRef = useRef();
    const categoryDescRef = useRef();
    const arrayNew = [];

    for(let i=0;i<filter;i++){
        arrayNew.push(i);
    }

    console.log(arrayNew)

    const filterOptions = [
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
        {value: 5, label: '5'},
        {value: 6, label: '6'},
        {value: 7, label: '7'},
        {value: 8, label: '8'},
        {value: 9, label: '9'},
        {value: 10, label: '10'},
    ]

    console.log(filter)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            changeDataArray(response);
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response)=>{
                return response.json()
            }).then((response)=>{
                response.push({name: 'Cycle'})
                changeData(response)
            })
        })
    }, [loading])

    const secondDataArray = data.map((item)=>{
        return {label: item.name, value: item}
    })

    const removeHandler = (itemName) => {
        setLoading(true)
        const array = dataArray.filter((item) => {
            return item.name !== itemName.name;
        })
        changeDataArray(array)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryRemove`, {
            headers: {
                name: itemName.name
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setError('removeDone');
            setLoading(false);
        })
    }
    const buttonHandler = (event) => {
        event.preventDefault();

        if (categoryNameRef.current.value === '') {
            setError('categoryName');
            return 
        } else {
            setLoading(true)
            const files = imgRef.current.files;
            if(files.length<=0){
                setError('img empty')
            }
            else {
                const files = imgRef.current.files[0]
                console.log(files)
                const parentName = single.name
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files);
                fileReader.onload = function (event){
                    const dataObj = {
                        name: categoryNameRef.current.value,
                        img: event.target.result,
                        desc: categoryDescRef.current.value,
                        parentName: parentName
                    }
                    
                    fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryAdd`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            addedBy: 'Admin'
                        },
                        body: JSON.stringify(dataObj)
                    }).then((response)=>{
                        return response.json()
                    }).then((response)=>{
                        console.log(response)
                        setLoading(false)
                    })
                }    
            }
           
        }
    }


    return (
        <div>
            <Form>

            <ButtonGroup className={'mt-2'}>
            <Button onClick={()=>{changeCategoryAction('addCategory')}}>Add Category</Button>
            <Button className='ms-3' onClick={()=>{changeCategoryAction('removeCategory')}}>Remove Category</Button>
            </ButtonGroup>
            {categoryAction === 'addCategory' && 
            
            <>
                <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control ref={ categoryNameRef } type="email" placeholder="Enter Category" />
                </Form.Group>

                <Form.Group className='mt-3 mb-3'>
                    <Form.Label>Parent Category Name</Form.Label>
                    <Select onChange={(value)=>{
                        changeSingle(value.value)
                    }} options={secondDataArray}></Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Filters You Want</Form.Label>
                    <Select options={filterOptions} onChange={(value)=>{
                        changeFilter(value.value)
                    }}></Select>
                </Form.Group>

                
                    <>
                        <div className={classes.parentDiv}>
                            {arrayNew.map((singleItem, idx)=>{
                                return (
                                    <div className={classes.inputDiv}>
                                        <Form.Group className={'mt-2'}>
                                            <Form.Control></Form.Control>
                                        </Form.Group>
                                    </div>
                                )
                            })}
                        </div>
                        <Form.Group className='mt-3 mb-3'>
                    <Form.Label>Category Description</Form.Label>
                        <Form.Control ref={categoryDescRef} as='textarea' placeholder='Enter Description'></Form.Control>
                    </Form.Group>


                    <p>Enter A Image For Display Purpose <input accept='image/jpg, image/png image/jpeg' type='file' ref={imgRef}></input></p>
                        
                    <Button onClick={buttonHandler} variant="primary" type="submit">
                            {loading && <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>} {!loading && 'Submit' }
                    </Button>

                    {error === 'imgEmpty' && <div>
                    <Alert variant='danger'>Input A Image</Alert>    
                    </div>}

                    { error === 'categoryName' && <div>
                    <Alert variant='danger'>Category Name Cannot Be Empty</Alert>
                    </div>}

                    </>
                
                

            </>
            
            }

                

            {categoryAction === 'removeCategory' &&
                <div className={'mt-3'}>
                <Form>
                    <Form.Control onChange={(event)=>{setRemover(event.target.value)}} onFocus={() => { changeInputFocus(true) }}  type='Name' ref={categoryNameRef} placeholder={ 'Enter Brand Name You Want To Delete' }></Form.Control>
                    { dataArray.length>0 &&  
                    
                    <Dropdown.Menu show={ inputFocus } style={{width: '100%', position: 'static'}} >
                            {dataArray.map((arrayItem) => {
                            if (arrayItem.name.includes(remover)) {
                                return (
                                     <div className={classes.deletableP}>
                                        <Button variant='info' key={arrayItem._id} onClick={() => { removeHandler(arrayItem) }}>{!loading && arrayItem.name}{ loading && <Spinner></Spinner> }</Button>
                                    </div>
                                );
                            }
                        })}
                    </Dropdown.Menu>
                    }
                    </Form>
                    {error === 'removeDone' && <Alert variant='info'>{ 'Successfully Removed' }</Alert>}
                </div>
            }
            
        </Form>
        </div>
    )
}

export default EditCategories