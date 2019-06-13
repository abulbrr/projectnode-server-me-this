const express       = require('express');
const bodyParser    = require('body-parser');

const api           = {
    Menu: require('../api/menu/script')
}


const app = new express();
const PORT = 3012;

app.use(bodyParser.json());

const db = require('../db/mydb.js');

/**
 * Endpoint BOOKS
 */
api.Menu(app, db);

app.listen(PORT, () => {
    console.log(`Application server running on ${PORT}`);
})
