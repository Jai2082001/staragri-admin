import classes from './ImageSecEdit.module.css'
import Select from 'react-select';
import { Button } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';



const ImageSecEdit = () => {

    const [single, changeSingle] = useState(false);
    const [product, changeProduct] = useState([]);
    const [array, changeArray] = useState([])
    const [file, changeFile] = useState(false);
    const fileRef = useRef()

    useEffect(() => {
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

    console.log(file)

    const submitHandler = (event) => {
        event.preventDefault();

        if (file.length <= 0) {
            return
        } else {
            if (file.length > 0) {
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
                    delay(file[d])
                        .then(x => {
                            array.push(x);
                            d++;
                            if (d < file.length) {
                                doNextPromise(d)
                            }
                            else {
                                // const fileReader = new FileReader();
                                // const file = dispalyImageRef.current.files[0];

                                // fileReader.readAsDataURL(file);
                                // fileReader.onload = function (event) {
                                let dataObj;

                                dataObj = {
                                    img: array,
                                    product: single
                                }

                                console.log(array)

                                fetch(`${process.env.REACT_APP_FETCH_LINK}/updateSecImage`, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(dataObj)
                                }).then((response) => {
                                    return response.json()
                                }).then((response) => {
                                    console.log(response)
                                    window.location.reload()
                                })
                                // }
                            }

                        })

                }

                doNextPromise(0);
            }
        }

        // const dataobj = {}

    }

    return (
        <div className={classes.imageSec}>
            <Select className='mt-2' onChange={(value) => {
                changeSingle(value.value)
            }} options={product}></Select>
            <input onChange={(event) => {
                console.log(event.target.files)
                if (event.target.files.length > 0) {
                    changeFile(event.target.files)
                }
            }} type={'file'} ref={fileRef} accept={'image/*'} className={'mt-2'} multiple></input>
            {file && single && <Button className={'d-block mt-2'} onClick={submitHandler}>Submit Change</Button>}
        </div>
    )
}

export default ImageSecEdit