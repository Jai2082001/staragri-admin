import classes from './ImageEdit.module.css'
import Select from 'react-select'
import {Button} from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'

const ImageEdit = ( ) => {


    const [product, changeProduct] = useState([])
    const [single, changeSingle] = useState(false);
    const [file, changeFile] = useState(false)
    const fileRef = useRef()

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplayWhole`).then((res) => {
            return res.json()
        }).then((response) => {
            console.log(response)
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeProduct(array);
        })
    }, [])

    const submitHandler = () => {
        const newFileReader = new FileReader();
        newFileReader.readAsDataURL(file);
        newFileReader.onload = function(event){
            const data = {img: event.target.result, product: single}
            console.log(data)
            fetch(`${process.env.REACT_APP_FETCH_LINK}/updatePrimaryImage`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)            
            }).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
                window.location.reload()
            })
        }
    }

    console.log(product)
    console.log(file)

    return (
        <div className={classes.parentDiv}>
            <h2 className={'mt-2'}>Primary</h2>
            <Select className='mt-2' onChange={(value)=>{
                changeSingle(value.value)
            }} options={product}></Select>
            <input onChange={(event)=>{
                console.log(event.target.files)
                if(event.target.files.length>0){
                    changeFile(event.target.files[0])
                }
                }} type={'file'} ref={fileRef} accept={'image/*'} className={'mt-2'}></input>
            {file && single && <Button className={'d-block mt-2'} onClick={submitHandler}>Submit Change</Button>}
        </div>
    )
}

export default ImageEdit