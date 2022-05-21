const express = require('express');
const router = express.Router();
var fs = require('fs');
var moment = require('moment');
var sort = require('fast-sort');

router.get('/', (req, res, next) => {
    fs.readFile('./api/routes/tracker.json',function(err,content){
        if(err) throw err;
        var html = "<style>* { box-sizing: border-box; margin: 0; padding: 0; } body { font-size: 16px; } main { padding: 10px; } /* Table */ .customer-table { font-size: 0.625em; width: 100%; max-width: 1024px; margin: 100px auto; border-collapse: collapse; text-align: center; box-shadow: 0 2px 2px #e6e6e6; } caption { font-weight: bold; padding: 10px; background-color: #3b6978; } thead th { background-color: #204051; } caption, thead th { color: #fff; } th { padding: 10px 5px; } tfoot { text-align: left; background-color: #e7dfd5; font-weight: lighter; font-size: 0.8em; } tbody th, tbody td { text-align: center; } tbody tr { border-bottom: 2px solid transparent; } tbody tr:hover { border-bottom: 2px solid #84a9ac; } tbody tr:nth-of-type(even) { background-color: #e7dfd5; } /* Media Queries */ @media (max-width: 320px) { .customer-table { font-size: 0.55em; } } @media (min-width: 411px) { .customer-table { font-size: 0.71875em; /*11.5px*/ } } @media (min-width: 768px) { body { font-size: 1.125em; /*16px*/ } caption { padding: 20px; } } @media (min-width: 1024px) { body { font-size: 1.25em; /*20px*/ } }</style>"
        html += '<main> <table class="customer-table"> <caption>Immigrant System Request Tracker</caption> <thead><tr><th>IP</th><th>DateTime</th><th>URL</th><th>Parameter</th><th>Body</th></tr></thead><tbody>'; 
        var parseJson =JSON.parse(content)
        parseJson = sort(parseJson).desc('datatime');
        for (i=0; i < parseJson.length ; i++){
            html += "<tr>"+
                       "<th>"+parseJson[i].ip+"</th>"+
                        "<td>"+moment(parseJson[i].datatime).format("DD-MMM-YYYY, hh:mm:s a")+"</td>"+
                        "<td>"+parseJson[i].url+"</td>"+
                        "<td>"+JSON.stringify(parseJson[i].parameter)+"</td>"+
                        "<td>"+JSON.stringify(parseJson[i].body)+"</td>"+
                    "</tr>";
        }
        html += "</tbody></table></main>";
        res.set('Content-Type', 'text/html');
        res.send(new Buffer(html));
    }) 
});
module.exports = router;