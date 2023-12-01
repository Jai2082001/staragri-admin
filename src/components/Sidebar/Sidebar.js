import classes from './Sidebar.module.css'
import { Button } from 'react-bootstrap'


const Sidebar = ({ changeCurrentFunc, currentFunc }) => {

    const addAccessoriesHandler = (event) => {
        console.log(event.target.id)
        changeCurrentFunc(event.target.id);
    }

    return (
        <div className={classes.sidebarDiv}>
            {/* {currentFunc === 'chart' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='chart' onClick={addAccessoriesHandler}>Home</Button>}
            {currentFunc !== 'chart' && <Button id='chart' onClick={addAccessoriesHandler} className={classes.sideBtn}>Home</Button>} */}


            {currentFunc === 'productStru' && <Button style={{ backgroundColor: 'rgba(0,0,0,0.4)', boxShadow: 'rgb(0,0,0 / 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='productStru' onClick={addAccessoriesHandler}>Product Structure</Button>}
            {currentFunc !== 'productStru' && <Button className={classes.sideBtn} id='productStru' onClick={addAccessoriesHandler}>Product Structure</Button>}

            {currentFunc === 'orderReceived' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='orderReceived' onClick={addAccessoriesHandler}>Order Received</Button>}
            {currentFunc !== 'orderReceived' && <Button id='orderReceived' onClick={addAccessoriesHandler} className={classes.sideBtn}>Order Received</Button>}

            {currentFunc === 'accepted' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='accepted' onClick={addAccessoriesHandler}>Accepted Products</Button>}
            {currentFunc !== 'accepted' && <Button className={classes.sideBtn} id='accepted' onClick={addAccessoriesHandler}>Accepted Products</Button>}

            {currentFunc === 'transit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='transit' onClick={addAccessoriesHandler}>In Transit</Button>}
            {currentFunc !== 'transit' && <Button className={classes.sideBtn} id='transit' onClick={addAccessoriesHandler}>In Transit</Button>}

            {currentFunc === 'history' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='history' onClick={addAccessoriesHandler}>Delivery History</Button>}
            {currentFunc !== 'history' && <Button className={classes.sideBtn} id='history' onClick={addAccessoriesHandler}>Deliver History</Button>}


            {currentFunc === 'addProduct' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='addProduct' onClick={addAccessoriesHandler}>Add Product</Button>}
            {currentFunc !== 'addProduct' && <Button className={classes.sideBtn} id='addProduct' onClick={addAccessoriesHandler}>Add Product</Button>}

                        
            {/* {currentFunc === 'removeProduct' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='removeProduct' onClick={addAccessoriesHandler}>Remove Product</Button>}
            {currentFunc !== 'removeProduct' && <Button className={classes.sideBtn} id='removeProduct' onClick={addAccessoriesHandler}>Remove Product</Button>} */}

            {currentFunc === 'editProduct' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='editProduct' onClick={addAccessoriesHandler}>Edit Product</Button>}
            {currentFunc !== 'editProduct' && <Button className={classes.sideBtn} id='editProduct' onClick={addAccessoriesHandler}>Edit Product</Button>}

            {currentFunc === 'couponEdit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='couponEdit' onClick={addAccessoriesHandler}>Edit Coupons</Button>}
            {currentFunc !== 'couponEdit' && <Button className={classes.sideBtn} id='couponEdit' onClick={addAccessoriesHandler}>Edit Coupons</Button>}

            {currentFunc === 'imagePrEdit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='imagePrEdit' onClick={addAccessoriesHandler}>Image Primary Edit</Button>}
            {currentFunc !== 'imagePrEdit' && <Button className={classes.sideBtn} id='imagePrEdit' onClick={addAccessoriesHandler}>Image Primary Edit</Button>}

            {currentFunc === 'imageSecEdit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='imageSecEdit' onClick={addAccessoriesHandler}>Image Secondary Edit</Button>}
            {currentFunc !== 'imageSecEdit' && <Button className={classes.sideBtn} id='imageSecEdit' onClick={addAccessoriesHandler}>Image Secondary Edit</Button>}

            
               
            {currentFunc === 'currentStock' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='currentStock' onClick={addAccessoriesHandler}>Current Stock</Button>}
            {currentFunc !== 'currentStock' && <Button id='currentStock' onClick={addAccessoriesHandler} className={classes.sideBtn}>Current Stock</Button>}
     
            {/* 

{currentFunc === 'deliveryFunc' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='deliveryFunc' onClick={addAccessoriesHandler}>Delivered Products</Button>}
            {currentFunc !== 'deliveryFunc' && <Button className={classes.sideBtn} id='deliveryFunc' onClick={addAccessoriesHandler}>Delivered Products</Button>} */}

            {/* {currentFunc === 'categoryEdit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='categoryEdit' onClick={addAccessoriesHandler}>Category Edit</Button>}
            {currentFunc !== 'categoryEdit' && <Button className={classes.sideBtn} id='categoryEdit' onClick={addAccessoriesHandler}>Category Edit</Button>}
             */}
            {/* 
            {currentFunc === 'brandNameEdit' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='brandNameEdit' onClick={addAccessoriesHandler}>Brand Name Edit</Button>}
            {currentFunc !== 'brandNameEdit' && <Button id='brandNameEdit' onClick={addAccessoriesHandler} className={classes.sideBtn}>Brand Name Edit</Button>} */}



            {/* 
            {currentFunc === 'bulkUpload' && <Button id='bulkUpload' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} onClick={addAccessoriesHandler}>Bulk Upload</Button>}
            {currentFunc !== 'bulkUpload' && <Button id='bulkUpload' onClick={addAccessoriesHandler} className={classes.sideBtn}>Bulk Upload</Button>}
             */}

            {currentFunc === 'delivery' && <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.4) ', boxShadow: 'rgb(0, 0, 0/ 20%) 0px 0px 3px 0px' }} className={classes.sideBtn} id='delivery' onClick={addAccessoriesHandler}>Delivery Availability</Button>}
            {currentFunc !== 'delivery' && <Button id='delivery' onClick={addAccessoriesHandler} className={classes.sideBtn}>Delivery Availability</Button>}
            {/*         
            {currentFunc === 'imgCustom' && <Button id="imgCustom"  style={{backgroundColor: 'rgba(0,0,0,0.4)', boxShadow: 'rgb(0,0,0/20%) 0px 0px 3px'}} className={classes.sideBtn} onClick={addAccessoriesHandler}>Front Image Slider</Button>}
            {currentFunc !== 'imgCustom' && <Button  id="imgCustom" className={classes.sideBtn} onClick={addAccessoriesHandler}>Front Image Slider</Button>} */}

        </div>
    )
}

export default Sidebar