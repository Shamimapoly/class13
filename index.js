const express =require('express')
const app =express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const port=8000
const cors=require('cors')
const cloudinary =require('cloudinary').v2




    
    cloudinary.config({ 
        cloud_name: 'dz6mb5kkp', 
        api_key: '575795312266681', 
        api_secret: 'hJ3UDGIs4GhB8S6F4iBJ-AYTuKs' 
    });
    
    
// --------all middleware-----//
app.use(express.json())
app.use(cors())
// ------api---------------//
app.post('/sendimage',upload.single('avatar'), async(req, res)=>{

     const uploadResult = await cloudinary.uploader.upload(
           req.file.path, {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);


    res.status(200).send(req.file.path)
    // res.status(200).json({ url: uploadResult.secure_url });

})
// -----server running-------///
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log(`this server is running at${port}`);
        
    }
})