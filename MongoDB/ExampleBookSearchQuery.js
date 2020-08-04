const exampleSchma = require("./Models/BookSchema")

var Eg = mongoose.model('Book', exampleSchma);


Eg.find(
//find all fields where ex_name property is equal to Terry Pratchett!
    { 'Author': 'Terry Pratchett' },
    //return book_name and publish_year
    'BookName PublishDate',
    function (err, books) {
        if (err) return handleError(err);
        //books contain the data
        

    })