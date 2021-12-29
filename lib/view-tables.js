const db = require('../db/connection');

viewDepts = () => {
    db.connect(function(err) {
        if (err) throw err;
        db.query(`SELECT*FROM departments;`, function (err, result, fields) {
        if (err) throw err;
        console.table(result);
        });
    });
};

module.exports = { viewDepts };