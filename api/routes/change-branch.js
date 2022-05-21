const express = require('express');
const router = express.Router();
const moment = require('moment');

router.post('/view', (req, res, next) => {
   
});

router.post('/update', (req, res, next) => {
    var userData = req.userDataFromToken;
    var id = req.body.id || '';
    var find = 'SMTC';
    var re = new RegExp(find, 'g');
    id = id ? id.replace(re,"") : '';
    var sql = "UPDATE `tblEnterData` SET end_braAutoID = ? WHERE endAutoID = ?";
    var dataSql = [
        userData.braAutoID, id
    ]
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
                            message: 'err_update',
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;