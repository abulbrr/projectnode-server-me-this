function $(query) {
    return document.querySelector(query);
}

var table = function(count, position) {
    this.status     = '';
    this.count      = count;
    this.position   = position;
}

const TABLES_STATUS = {
    DONE        : 0,
    CANCELLED   : 1,
    FINISHED    : 2
}

const   TABLES_COUNT    = 20;


var ordersDiv   = $("#orders");
var tables = [];

function init() {
    let pos = 1;
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  2 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  4 ,   pos++));
    tables.push( new table (  8 ,   pos++));
    tables.push( new table (  8 ,   pos++));
    tables.push( new table (  8 ,   pos++));
    tables.push( new table (  8 ,   pos++));
    tables.push( new table (  8 ,   pos++));
    tables.push( new table (  12,   pos++));

    render();
}
function render() {
    ordersDiv.innerHTML = '';

    tables.forEach(t => {
        console.log(t)
        let status = "Done";
        if( t.status == TABLES_STATUS.CANCELLED ) status = "Cancelled";
        else if( t.status == TABLES_STATUS.FINISHED) status = "Finished";

        ordersDiv.innerHTML += 
        `
        table: ${t.position} , ${t.count} places, ${status} 
        <button id="${t.position}" onClick="onOrderClicked(event)">Order</button>
        <br> `;
    })
}

init();


function onOrderClicked(e) {
    console.log(e.target.id);
}





