const mongoose = require('mongoose');

const mconnect = () => {
    mongoose
        .connect(
            "mongodb://localhost/test",
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