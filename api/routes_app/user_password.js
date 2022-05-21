const express = require('express');
const router = express.Router();

router.post('/password', (req, res, next) => {
    var userData = req.userDataFromToken;
    let id = userData.ID;
    let password = req.body.passwordNEW;
    let typeAccount=userData.typeAccount;
    var sqlData = [password, id];
    var sql="";
    if(typeAccount === "driver"){
      sql = "UPDATE `tblDriver` SET `driPassword`= ? WHERE driAutoID = ?";
    }else{
      sql = "UPDATE `tblSeller` SET `selPassword`= ? WHERE selAutoID = ?";
    }
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            connection.query(sql, sqlData, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results && results.affectedRows > 0){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'invalid_user',
                        });
                    }
                }
            });
        }
    });
});

router.post('/validatePassword', (req, res, next) => {
    var response = {};
    var userData = req.userDataFromToken;
    let password = req.body.password;
    let typeAccount=userData.typeAccount;
    let memAutoID = userData.ID;
    var sqlData = [memAutoID, password];
    var sql="";
    if(typeAccount==="driver"){
        sql = "SELECT driPassword FROM `tblDriver` WHERE driAutoID = ? AND `driPassword`= ?";
    }else{
        sql = "SELECT selPassword  FROM `tblSeller` WHERE selAutoID  = ? AND `selPassword`= ?";
    }
    
    pool.getConnection( function(err, connection) {
        if(err){
            response = (err);
            res.status(400).json(response);
        }else{
            connection.query(sql, sqlData,  function (error, results, fields) {
                connection.release();
                if(error){
                    response = (error);
                    res.status(400).json(response);
                }else{
                    if(results && results.length > 0){
                        response = {
                            message: 'success'
                        }
                        res.status(200).json(response);
                    }else{
                        response = {
                            message:'invalid_password'
                        }
                        res.status(400).json(response);
                    }
                }
            });
        }
    });
})
module.exports = router;