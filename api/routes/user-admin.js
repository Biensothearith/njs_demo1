const express = require('express');
const router = express.Router();

router.get('/view', (req, res, next) => {
    var userData = req.userDataFromToken;
    if(userData.usaType == 1){
        var sql = `SELECT 
                    usaAutoID AS id, 
                    usa_braAutoID AS braID, 
                    usaName AS name, 
                    usaEmail AS email, 
                    usaPassword AS password, 
                    usaType AS type, 
                    usaStatus AS status,
                    braParentID as parentID
                    FROM tblUserAdmin 
                    LEFT JOIN tblBranch on braAutoID=usa_braAutoID`;
    }else{
        var sql = `
        SELECT usaAutoID AS id, 
        usa_braAutoID AS braID, 
         usaName AS name, 
         usaEmail AS email, 
         usaPassword AS password, 
         usaType AS type, 
         usaStatus AS status,
         braParentID as parentID
        from tblBranch b 
        JOIN tblUserAdmin a on a.usa_braAutoID=b.braAutoID 
        WHERE braParentID=(SELECT a.usa_braAutoID from tblUserAdmin a WHERE a.usaAutoID="${userData.usaAutoID}") OR a.usaAutoID="${userData.usaAutoID}"`
    }
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(400).json({
                err: err,
            });
        }else{
            console.log(sql)
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
                        res.status(400).json({
                            message: 'no_user',
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
    var email = req.body.email || '';
    var password = req.body.password || '';
    var status = req.body.status;
    var sql = "INSERT INTO `tblUserAdmin`(`usaName`, `usaEmail`, `usaPassword`, `usaStatus`) VALUES (?, ?, ?, ?)";
    var dataSql = [name, email, password, status]
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
                    if(results.insertId){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'no_user',
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
    var email = req.body.email || '';
    var password = req.body.password || '';
    var status = req.body.status;
    var braID = req.body.braID;
    if(password){
        var sql = "UPDATE `tblUserAdmin` SET `usaName`= ?,`usaEmail`=?,`usaPassword`=?,`usaStatus`=?, `usa_braAutoID` = ? WHERE `usaAutoID` = ? AND `usaType` != 1";
        var dataSql = [name, email, password, status, braID, id]
    }else{
        var sql = "UPDATE `tblUserAdmin` SET `usaName`= ?,`usaEmail`=?,`usaStatus`=?, `usa_braAutoID` = ? WHERE `usaAutoID` = ? AND `usaType` != 1";
        var dataSql = [name, email, status, braID, id]
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
                    res.status(400).json({
                        error: error,
                    });
                }else{
                    if(results.affectedRows){
                        res.status(200).json({
                            message: 'success',
                        });
                    }else{
                        res.status(400).json({
                            message: 'no_user',
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
            message: 'invalid_user',
        });
    }else{
        var sql = "DELETE FROM `tblUserAdmin` WHERE `usaAutoID` = ? AND `usaType` != 1";
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
                                data:results
                            });
                        }else{
                            res.status(400).json({
                                message: 'no_user',
                            });
                        }
                    }
                });
            }
        });
    }
});

module.exports = router;