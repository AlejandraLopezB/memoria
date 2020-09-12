const { db } = require("./pgAdaptor");

db.one('select * from persona where idpersona = 2')
    .then(res => {
        console.log(res);
    });