const express = require('express');
const router = express.Router();
const fs = require('fs');
var os = require("os");
var multer  = require('multer');
const BASE_PATH = process.env.PWD;

const upload_path = 'data/'
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {        
        cb(null, './'+upload_path)
    },
    
    filename: function (req, file, cb) {
        let date = Date.now();
        let name = date
        let path = name+'_'+makeName();
        cb(null, path+file.originalname)
        req.body.filename = 'images/'+path+file.originalname;
    }
});

const upload = multer({storage: storage});

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = "SELECT `driAutoID` AS id, `driName` AS name, `driPhone` AS phone, `driEmail` AS email, `driPassword` AS password, `driAddress` AS address, `driDocument` AS document, `driType` AS type, `driStatus` AS status FROM `tblDriver` "+
    "WHERE dri_braAutoID = "+userData.braAutoID
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

router.post('/insert', upload.single('document'), (req, res, next) => {
    var userData = req.userDataFromToken;
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var email = req.body.email || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var filename = req.body.filename || '';
    var type = req.body.type || '';
    var status = req.body.status || '';
    status = status == "true" ? 1:0;
    if(filename){
        filename = req.protocol+"://"+req.headers.host+'/'+filename
    }
    var sql = "INSERT INTO `tblDriver`(`driName`, `driPhone`, `driEmail`, `driPassword`, `driAddress`, `driDocument`, `driType`, `driStatus`, dri_braAutoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var dataSql = [name, phone, email, password, address, filename, type,  status, userData.braAutoID]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error["code"] === 'ER_DUP_ENTRY'){
                        res.status(400).json({
                            error:"duplicate"
                        })
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
                }else{
                    if(results.insertId){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'err_insert',
                        });
                    }
                }
            });
        }
    });
});

router.post('/update', upload.single('document'), (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var email = req.body.email || '';
    var password = req.body.password || '';
    var address = req.body.address || '';
    var filename = req.body.filename || '';
    var old_filename = req.body.old_filename || '';
    var type = req.body.type || '';
    var status = req.body.status || '';
    status = status == "true" || status == 1 ? 1:0;
    if(filename){
        filename = req.protocol+"://"+req.headers.host+'/'+filename
        old_filename = old_filename.split("/");
        fs.unlink(BASE_PATH+ '/data/'+old_filename[4], function (err) {            
            if (err) {                                                 
                console.error(err);                                    
            }                                                          
            console.log('File has been Deleted', appRoot+ '/data/'+old_filename[4]);                           
        });
    }else{
        filename = old_filename;
    }
    if(password){
        var sql = "UPDATE `tblDriver` SET `driName`= ?,`driPhone`= ?, `driEmail` = ?, `driPassword`= ?,`driAddress`= ?,`driDocument`= ?,`driType`= ?,`driStatus`= ? WHERE `driAutoID` = ?";
        var dataSql = [name, phone, email, password, address, filename, type,  status, id]
    }else{
        var sql = "UPDATE `tblDriver` SET `driName`= ?,`driPhone`= ?, `driEmail` = ?, `driAddress`= ?,`driDocument`= ?,`driType`= ?,`driStatus`= ? WHERE `driAutoID` = ?";
        var dataSql = [name, phone, email, address, filename, type,  status, id]
    }
    
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error["code"] === 'ER_DUP_ENTRY'){
                        res.status(400).json({
                            error:"duplicate"
                        })
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
                }else{
                    if(results.affectedRows > 0){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'err_update',
                        });
                    }
                }
            });
        }
    });
});

router.post('/delete', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || ""
    if(!id){
        res.status(400).json({
            message: 'invalid_buyer',
        });
    }else{
        var sql = "DELETE FROM `tblDriver` WHERE `driAutoID` = ?";
        var dataSql = [id]
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
    }
});

function makeName(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = router;