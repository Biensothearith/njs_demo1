const express = require('express');
const router = express.Router();

function createUserBranch(name, email, password, status,branchId,callback){
    var sql = `INSERT INTO tblUserAdmin(usaName, usaEmail, usaPassword, usaStatus,usa_braAutoID) 
                VALUES (?, ?, ?, ?,?)`;
    var dataSql = [name, email, password, status,branchId];
    pool.getConnection(function(err, connection) {
        if(err){
           callback({code:400,error:err});
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    callback({code:400,error:error});
                }else{
                    if(results.insertId){
                        callback({code:200,message:'success'});
                    }else{
                        callback({code:400,error:'err_create_user'});
                    }
                }
            });
        }
    });
}

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    var sql = `SELECT 
	braAutoID AS id, 
    braName AS name,
    braPhone AS phone, 
    braEmail AS email, 
    braBranchName AS branchName, 
    braBranchPhone AS branchPhone, 
    braLocation AS branchLocation,
    braPercentageInput AS branchPercentageInput, 
    braPercentageOutput AS branchPercentageOutput, 
    braAddress AS branchAddress, 
    braStatus AS status,
    braParentID as prarent,
    braPrefix as prefix,
    braLocationPoint as mappoint
    FROM tblBranch`+(userData.usaType === 0?" WHERE braAutoID = "+userData.braAutoID+" OR braParentID=" +userData.braAutoID:"")
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
                            data:results,
                            userData:userData,
                            sql:sql
                        });
                    }else{
                        res.status(200).json({
                            message: 'success',
                            data:[],
                            sql
                        });
                    }
                }
            });
        }
    });
});

router.post('/insert', (req, res, next) => {
    var userData = req.userDataFromToken;
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var email = req.body.email || '';
    var branchName = req.body.branchName || '';
    var branchPhone = req.body.branchPhone || '';
    var branchLocation = req.body.branchLocation || '';
    var branchAddress = req.body.branchAddress || '';
    var branchPercentageInput = req.body.branchPercentageInput || 0;
    var branchPercentageOutput = req.body.branchPercentageOutput || 0;
    var braParentID=req.body.braParentID?req.body.braParentID:null;
    var mappoint=req.body.mappoint?req.body.mappoint:null;
    var status = req.body.status;
    var password= req.body.password || "123456";
    var prefix=req.body.prefix?req.body.prefix.toLocaleUpperCase():null;
    var sql = "INSERT INTO `tblBranch`(`braPrefix`,`braName`, `braPhone`, `braEmail`, `braBranchName`, `braBranchPhone`, `braLocation`, `braAddress`, `braPercentageInput`, `braPercentageOutput`, `braStatus`,`braParentID`,`braLocationPoint`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
    var dataSql = [prefix, name, phone, email, branchName, branchPhone, branchLocation, branchAddress, branchPercentageInput, branchPercentageOutput, status,braParentID,mappoint]
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error['errno']===1062){
                        res.status(400).json({
                            error: error,
                            message:'duplicate'
                        });
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
                }else{
                    if(results.insertId){
                        console.log(braParentID)
                        if(braParentID !== null && braParentID>0){
                            createUserBranch(name,email,password,1,results.insertId,(rs)=>{
                                if(rs.code===200){
                                    res.status(200).json({
                                        message: 'success',
                                    });
                                }else{
                                    res.status(400).json({
                                        message: 'err_insert',
                                        error:rs.error
                                    });
                                }
                            })
                        }else{
                            res.status(200).json({
                                message: 'success',
                            });
                        }
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

router.post('/update', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var name = req.body.name || '';
    var phone = req.body.phone || '';
    var email = req.body.email || '';
    var branchName = req.body.branchName || '';
    var branchPhone = req.body.branchPhone || '';
    var branchLocation = req.body.branchLocation || '';
    var branchAddress = req.body.branchAddress || '';
    var branchPercentageInput = req.body.branchPercentageInput || 0;
    var branchPercentageOutput = req.body.branchPercentageOutput || 0;
    var prefix=req.body.prefix?req.body.prefix.toLocaleUpperCase():null;
    var status = req.body.status;
    var mappoint=req.body.mappoint?req.body.mappoint:null;
    var sql = "UPDATE `tblBranch` SET `braPrefix`=?, `braLocationPoint`=?,`braName`= ?,`braPhone`= ?,`braEmail`= ?,`braBranchName`= ?,`braBranchPhone`= ?,`braLocation`= ?,`braAddress`= ?, `braPercentageInput` = ?, `braPercentageOutput` = ?, `braStatus`= ? WHERE `braAutoID` = ?";
    var dataSql = [prefix,mappoint,name, phone, email, branchName, branchPhone, branchLocation, branchAddress, branchPercentageInput, branchPercentageOutput, status, id]
    
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, dataSql, function (error, results, fields) {
                connection.release();
                if(error){
                    if(error['errno']===1062){
                        res.status(400).json({
                            error: error,
                            message:'duplicate'
                        });
                    }else{
                        res.status(400).json({
                            error: error,
                        });
                    }
                }else{
                    if(results.affectedRows){
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
        var sql = "DELETE FROM `tblBranch` WHERE `braAutoID` = ?";
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

module.exports = router;