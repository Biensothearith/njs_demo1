const express = require('express');
const router = express.Router();
const fs = require('fs');
var multer  = require('multer');
// const unlinkAsync = promisify(fs.unlink);
const BASE_PATH = process.env.PWD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, file_upload_path+'site/');
    },
    
    filename: function (req, file, cb) {
        console.log('storage', file);
        let date = Date.now();
        let name = "images"+date
        let path = generateAlias(name);
        cb(null, path+file.originalname);
        if(file.fieldname == 'logo'){
            req.body.logoFileName = path+file.originalname;
        }else if(file.fieldname == 'appImage'){
            req.body.appImageFileName = path+file.originalname;
        }else if(file.fieldname == 'loginImage'){
            req.body.loginImageFileName = path+file.originalname;
        }
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
    var sql = `
    SELECT sidAutoID as autoID, sidID as id, sidLang as lang, sidSiteName as siteName, 
    sidKeyword as keyword, sidCopyRight as copyRight, sidEmail as email, sidReceiveEmail as receiveEmail, 
    sidPhone as phone, sidAddress as address, sidLogo as logo, sidAppVersionSeller as sellerVersion, 
    sidAppVersionDriver as driverVersion, sidBuyTrainUrl as trainUrl, sidPrivacyPolicy as privacyPolicy, 
    sidRate as rate FROM tblSiteDescription`;
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, function (error, results, fields) {
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

router.post('/update', upload.single('logo'), (req, res, next) => {
    var logoImage = req.body.logoFileName || false
    var nameOldLogo = req.body.nameOldLogo || null
    var siteName = req.body.siteName
    var keyword = req.body.keyword
    var copyRight = req.body.copyRight
    var email = req.body.email
    var receiveEmail = req.body.receiveEmail
    var phone = req.body.phone
    var address = req.body.address
    var sellerVersion = req.body.sellerVersion
    var driverVersion = req.body.driverVersion
    var trainUrl = req.body.trainUrl
    var privacyPolicy = req.body.privacyPolicy
    var rate = req.body.rate
    if(logoImage){
        logoImage = req.body.logoFileName
        if(nameOldLogo !== null){
            fs.unlink(BASE_PATH+"/data/"+nameOldLogo,(err)=>{
                if(err){
                    console.log('error',err)
                }else{
                    console.log("update success !")
                }
            });
        }
    }else{
        logoImage = nameOldLogo
    }
    var sql =  `
        UPDATE tblSiteDescription SET 
        sidSiteName=?,sidKeyword=?,sidCopyRight=?,sidEmail=?,sidReceiveEmail=?,sidPhone=?,
        sidAddress=?,sidLogo=?,sidAppVersionSeller=?,sidAppVersionDriver=?,
        sidBuyTrainUrl=?,sidPrivacyPolicy=?,sidRate=?
    `;
    var dataSql = [
        siteName, keyword, copyRight, email, receiveEmail, phone,
        address, logoImage, sellerVersion, driverVersion,
        trainUrl, privacyPolicy, rate
    ]
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

module.exports = router;