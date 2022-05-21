const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    var user = {};
    var email = req.body.email || "";
    var password = req.body.password;
    var sql = `
        SELECT usaAutoID, braAutoID, braParentID as parent,usaName AS name, usaEmail email, usaPassword, usaType, usaStatus, braHeadStatus AS headStatus,(SELECT sidRate FROM tblSiteDescription LIMIT 1) as dollarRate
    FROM tblUserAdmin LEFT JOIN tblBranch ON braAutoID = usa_braAutoID
    WHERE usaEmail = ? AND usaPassword = ? AND usaStatus = 1`;
    var dataSql = [email, password];
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
                        user = results[0];
                        jwt.sign({data:user}, results[0].email, (err, token) => {
                            delete user.usaAutoID;
                            // delete user.braAutoID;
                            delete user.usaPassword;
                            // delete user.usaType;
                            delete user.usaStatus;
                            res.status(200).json({
                                message: 'success',
                                data: user,
                                token: token
                            });
                        });
                    }else{
                        res.status(400).json({
                            message: 'user_not_match',
                        });
                    }
                }
            });
        }
    });
});


module.exports = router;