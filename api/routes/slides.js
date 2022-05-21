const express = require('express');
const router = express.Router();
const fs = require('fs');
var multer  = require('multer');
// const unlinkAsync = promisify(fs.unlink);
const BASE_PATH = process.env.PWD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, file_upload_path+'slide/');
    },
    
    filename: function (req, file, cb) {
        
        let date = Date.now();
        let name = "images"+date
        let path = generateAlias(name);
        cb(null, path+file.originalname);
        req.body.FileName = path+file.originalname;
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg  or png"),false);
    }
}

const upload = multer({storage: storage, fileFilter : fileFilter});

router.get('/view', (req, res, next) => {
    var lang = req.query.currentLanguage
    var sql = `
        SELECT sliAutoID as autoID, sliName as name, sliImage as image, sliOrder as orderSlide, 
        sliStatus as status FROM tblSlides ORDER BY sliOrder ASC
    `;
    var dataSql = [lang]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results.length > 0){
                        res.status(200).json({
                            message: 'success',
                            data:results
                        });
                    }else{
                        res.status(200).json({
                            message: 'success',
                            data:[]
                        });
                    }
                }
            });
        }
    });
});

router.post('/insert', upload.single('image'), (req, res, next) => {
    var image = req.body.FileName
    var name = req.body.name
    var orderSlide = req.body.orderSlide
    var status = req.body.status
    if(image){
        image = req.body.FileName
        console.log("path",image)
    }
    var sql = "INSERT INTO `tblSlides`(`sliName`, `sliImage`, `sliOrder`, `sliStatus`) VALUES (?, ?, ?, ?)";
    var dataSql = [name, image, orderSlide, status]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    res.status(200).json({
                        message: "success",
                    })
                }
                
            });
        }
    });
});

router.post('/update',upload.single('image'), (req, res, next) => {
    var image = req.body.FileName
    var nameOldImage = req.body.nameOldImage
    var autoID = req.body.autoID
    var name = req.body.name
    var orderSlide = req.body.orderSlide
    var status = req.body.status

    if(image){
        const fileNameOld = nameOldImage
        fs.unlink(BASE_PATH+"/data/"+fileNameOld,(err)=>{
           if(err){
               console.log('error',err)
           }else{
               console.log("update success !")
           }
        });
    }else{
        image = nameOldImage
    }    
    var sql = "UPDATE `tblSlides` SET `sliName`=?,`sliImage`=?,`sliOrder`=?,`sliStatus`=? WHERE sliAutoID = ?";
    var dataSql = [name, image, orderSlide, status, autoID]
    console.log(dataSql)
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results.affectedRows > 0){
                        res.status(200).json({
                            message:'success',
                            results
                        });
                    }
                }
                
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var autoID = req.body.autoID
    var sql = 'DELETE FROM `tblSlides` WHERE `sliAutoID` = ?'
    var dataSql = [autoID]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results.affectedRows > 0){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'err_delete',
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;