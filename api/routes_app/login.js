const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require("axios");

router.post('/driver',(req, res, next) => {
      var user = {};
      var phone = req.body.phone || "";
      var password = req.body.password;
      var dataSql = [phone, password];
      var sql = `SELECT *,braParentID as parentId FROM seller_driver JOIN tblBranch ON braAutoID=braID WHERE phone = ? AND passwords = ? AND status_ = 1 AND typeAccount = 'driver' `
      pool.getConnection(function(err, connection) {
            if(err){
                  res.status(400).json({
                      message: err,
                  });
              }else{
                  connection.query(sql, dataSql, function (error, results, fields) {
                        connection.release();
                        if(error){
                              res.status(400).json({
                                  message: error,
                              });
                          }else{
                              if(results.length > 0 ){
                                    user = results[0];
                                    delete user.braAutoID;
                                    delete user.braName;
                                    delete user.braPhone;
                                    delete user.braEmail;
                                    delete user.braBranchName;
                                    delete user.braBranchPhone;
                                    delete user.braLocation;
                                    delete user.braAddress;
                                    delete user.braPercentageOutput;
                                    delete user.braPercentageInput;
                                    delete user.braHeadStatus;
                                    delete user.braParentID;
                                    delete user.braStatus;
                                    delete user.braLocationPoint;
                                    jwt.sign({data:user}, results[0].phone, (err, token) => {
                                            delete user.ID;
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
                  })
            }
      })
});

router.post('/seller',(req, res, next) => {
      var user = {};
      var phone = req.body.phone || "";
      var password = req.body.password;
      var dataSql = [phone, password];
      var sql = `SELECT * FROM seller_driver WHERE phone = ? AND passwords = ? AND status_ = 1 AND typeAccount = 'seller'`
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
                                if(results.length > 0 ){
                                    user = results[0];
                                    jwt.sign({data:user}, results[0].phone, (err, token) => {
                                        delete user.ID;
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
                  })
            }
      })
});

router.get('/get-sms/:phone', (req, res, next) => {
    var code = smsCodeGenerate()
    var phone = req.params.phone
    var data = {
        smsCode: code,
    }
    jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 5), 
        data: data
    }, phone, (err, token) => {
        sendSMS(code, phone);
        res.status(200).json({
            message:'success',
            token:token
        })
    });
});

router.post('/register', verifyTokenSMS, (req, res, next) => {
    var name = req.body.name || "";
    var phone = req.body.phone || "";
    var password = req.body.password || "";
    var bankName = req.body.bankName || null;
    var accountName = req.body.accountName || null;
    var accountNumber = req.body.accountNumber || null;
    checkPhoneDuplicate(phone, function (results) {
        if(results.code == 200){
            var sql = `
                INSERT INTO tblSeller(
                    selName, selPhone, selPassword, selBankName, selBankAccountNumber, 
                    selBankAccountName, selStatus, sel_braAutoID
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `
            var dataSql = [name, phone, password, bankName, accountNumber, accountName, 1, defultBranchID];
            pool.getConnection(function(err, connection) {
                if(err){
                    res.status(400).json({
                        message: err,
                    });
                }else{
                    connection.query(sql, dataSql, function (error, results, fields) {
                            connection.release();
                            if(error){
                                res.status(400).json({
                                    message: error,
                                });
                            }else{
                                if(results.insertId){
                                    res.status(200).json({
                                        message: 'success',
                                        data: {
                                                phone: phone,
                                                password: password,
                                        },
                                    });  
                                }else{
                                    res.status(400).json({
                                        message: 'something_wrong',
                                    });
                                }
                            }
                    })
                }
            })
        }else{
            res.status(results.code).json({
                ...results
            });
        }
    })
});

function smsCodeGenerate(){
    var val = Math.floor(100000 + Math.random() * 900000);
    return val;
    // return 123456;
}

function sendSMS(number, phone){
    var newPhone = phone.replace('+', '')
    var config = {
        method: 'get',
        url: 'https://api.mekongsms.com/api/sendsms.aspx?username=meas_sothea_sms@mekongnet&pass=72adde36428579521fdb3e43222743f1&sender=MST Express&smstext='+encodeURIComponent('MST Express សូមស្វាគមន៍ នេះជាលេខកូដផ្ទៀងផ្ទាត់របស់អ្នក: '+number+' ')+'&gsm='+newPhone+'&int=1',
        headers: { 
            'Accept': ''
        }
    };

    axios
    .get(config.url)
    .then((result) => {
        console.log('sms response', result);
    })
    .catch((err) => {
        console.log('sms error', err);
    });
}
module.exports = router;