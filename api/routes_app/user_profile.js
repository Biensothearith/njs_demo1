const express = require('express');
const router = express.Router();
var fs = require('fs');
var base64Img = require('base64-img');

router.post('/', (req, res, next) => {
    var userData = req.userDataFromToken;
    let oldImageName = req.body.oldImageName || '';
    let newImageData = req.body.newImageData || '';
    var memAutoID = userData.ID;
    var pictureName = memAutoID+'_'+makeName();
    var sql = '';
    var path = '';
    var sqlData = [pictureName, memAutoID];
    if(userData['typeAccount'] === 'seller'){
        sql_ = "UPDATE `tblSeller` SET `selImage`= ? WHERE `selAutoID` = ?";
        path = 'seller/'
    }else{
        sql_ = "UPDATE `tblDriver` SET `driImage`= ? WHERE `driAutoID` = ?";
        path = 'driver/'
    }
    if(newImageData != ''){
        base64Img.img(newImageData, file_upload_path+path, pictureName, function(err, filepath) {
            if (err){
              profile.status = 0;
              res.json({
                  results: err,
                  message: 'success',
              });
            }
            if(filepath){
              pool.getConnection(function(err, connection) {
                  if(err){
                      res.status(500).json({
                          err: err,
                      });
                  }else{
                      connection.query(sql, sqlData, function (error, results, fields) {
                          connection.release();
                          if(error){
                              res.status(200).json({
                                  error: error.code,
                              });
                          }
                          if(results){
                              if(oldImageName != ''){
                                  try {
                                      fs.unlink(file_upload_path+path+oldImageName, function(err, ressults){
                                        // if no error, file has been deleted successfully
                                        if(err){
                                            console.log('err', err);
                                        }else{
                                           
                                        }
                                    });
                                  } catch (error) {
                                      console.log('error', error);
                                  }
                                   res.status(200).json({
                                        message: 'success',
                                        results: pictureName+'.png',
                                    });
                              }else{
                                  res.status(200).json({
                                      message: 'success',
                                      results: pictureName+'.png',
                                  });
                              }
                          }
                      });
                  }
              });
            }
        });
    }else{
        res.status(400).json({
            message: 'invalid_input_data',
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