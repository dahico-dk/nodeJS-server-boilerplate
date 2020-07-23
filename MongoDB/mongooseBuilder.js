const mongoose = require('mongoose');
const config=require(__basedir+ "/server-config.json");
const mconnect = () => {
    mongoose
        .connect(
            config.mongo-db-connection-string,
            { useNewUrlParser: true, useUnifiedTopology: true }
        ).then(() => {
            console.log('then');
        })
        .catch(ex => {
            console.log(ex);
        });

    const db = mongoose.connection;
    db.on('error', function () {
        console.log('err');
    });
    db.once('open', function () {
        console.log('connected');
    });
}
module.exports = mconnect;