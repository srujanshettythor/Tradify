const express=require('express');
const {handleImageUpload,addProduct,fetchProduct,editProduct,deleteProduct,deleteFeatureImage}=require('../../controllers/admin/product-controller')

const {upload}=require('../../helpers/cloudinary');

const router=express.Router();
router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct)
router.get('/get',fetchProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.delete('/delete-feature-image/:id', deleteFeatureImage);



module.exports=router;