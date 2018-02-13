var express = require("express");
var router = express.Router();
var db = require("./../common/SqlHelper");

router.get("/", function (objCountry, res) {
    db.executeStoredProcedure("GetAllCurrency", function (err, result) {
        if (err)
            res.send(JSON.stringify(err));
        else
            res.send(JSON.stringify(result.recordsets));
    });
});

router.get("/GetCountry/:id", function (objCountry, res) {
    const getCountryById = "Select * From CurrencyMaster Where CurrId = '" + objCountry.params.id + "'";
    db.executeQuery(getCountryById, function (err, result) {
        if (err)
            res.send(JSON.stringify(err));
        else
            res.send(JSON.stringify(result.recordsets));
    });
});

router.post("/AddCountry", function (objCountry, res) {
    const adddetail = "insert into CurrencyMaster(CurrName, Symbol, IsActive, IsMain) VALUES ('" + objCountry.body.CountryName + "', '" + objCountry.body.Symbol + "', 1, 1)";
    db.executeQuery(adddetail, function (err, result) {
        if (err)
            res.send(JSON.stringify(err));
        else
            res.send(JSON.stringify(result.recordsets));
    });
});

router.post("/DeleteCountry", function (objCountry, res) {
    const deleteQuery = "Delete From CurrencyMaster Where CurrId = '" + objCountry.body.CurrId + "'";
    db.executeQuery(deleteQuery, function (err, result) {
        if (err)
            res.send(JSON.stringify(err));
        else
            res.send(JSON.stringify(result.recordsets));
    });
});

module.exports = router;