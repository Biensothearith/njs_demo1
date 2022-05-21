const express = require("express")
const router = express.Router();

router.get("/get",(req, res, next) =>{
    var user = req.userDataFromToken;
    let id = user.ID;
    var sqlData = [id];
    sql = "SELECT driCurrentLocation AS location FROM `tblDriver` WHERE driAutoID = ?";
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
                        res.status(200).json({
                              message:"success",
                              results
                        })  
                  }
            })
      }
})
});

router.post("/",(req, res, next) =>{
      var user = req.userDataFromToken;
      let id = user.ID;
      let data = req.body.data;
      var sqlData = [data, id];
      sql = "UPDATE `tblDriver` SET `driCurrentLocation`= ? WHERE driAutoID = ?";
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

module.exports = router;