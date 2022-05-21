const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/:type', (req, res, next)=>{
    var type = req.params.type
    if(type === 'seller'){
        type = `sidAppVersionSeller`
    }
    if(type === 'driver'){
        type = `sidAppVersionDriver`
    }

    var sql = "SELECT " + type + " as appVersion FROM `tblSiteDescription` WHERE `sidLang` = 'en'"
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
                            message:'success',
                            results:results[0]
                        })
                    }
                }
            })
        }
    })
});


module.exports = router;