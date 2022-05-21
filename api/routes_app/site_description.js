const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    var sql = "SELECT `sidSiteName` AS name, `sidKeyword` AS keyword, "+
    "`sidCopyRight` AS copyRight, `sidEmail` AS email, `sidReceiveEmail` AS receiveEmail, `sidPhone` AS phone, `sidAddress` AS address, "+
    "`sidLogo` AS logo, `sidAppVersionBuyer` AS appVersion, "+
    "`sidBuyTrainUrl` AS buyTrainUrl, `sidPrivacyPolicy` AS privacyPolicy, sidRate as dollarRate FROM `tblSiteDescription` WHERE  `sidAutoID` = '"+1+"'";
    pool.getConnection(function(err, connection) {
        if(err){
            res.status(500).json({
                err: err,
            });
        }else{
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if(error){
                    res.status(500).json({
                        error: error,
                    });
                }
                res.status(200).json({
                    results: results,
                    message:"success"
                });
            });
        }
    });
});

module.exports = router;