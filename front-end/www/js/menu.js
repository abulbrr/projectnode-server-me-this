function $(query) {
    return document.querySelector(query);
}
var Menu    = {
    appetizers  : [],
    salads      : [],
    mainDishes  : [],
    drinks      : [],
    desserts    : []
};

const menuDiv = $('#menu');


function render() {
    menuDiv.innerHTML = ''
    for( menuItem in Menu ) {
        menuDiv.innerHTML += 
            `<h3>${menuItem}</h3>
            <input id="input${menuItem}"type="text" placeholder="item name">
            <button id=${menuItem} onClick="onAddItemClicked(event)">Add item</button>
                <div id="div${menuItem}"> </div>
            `
            // console.log(Menu[menuItem])
        for( beverage of Menu[menuItem] )
        {
            console.log(Menu[menuItem])
            let menuItemDiv = $('#div' + menuItem);

            let color = beverage.isDeleted ? "red" : "green";
            let isDeleted = beverage.isDeleted ? "Deleted" : "";
            let buttonText = beverage.isDeleted ? "ReAdd item" : "Remove item";

            menuItemDiv.innerHTML += 
            `<div style='border: 1px solid black'>
            <p style="background-color:${color}"> ${beverage.name} ${isDeleted} </p>
            <input id="inputRemove${beverage.name}" "type="text" placeholder="remove reason">
            <button id='${beverage.name}' menuType='${menuItem}' onClick='onRmoveItemClicked(event)' >${buttonText}</button>
            </div>
            `
        }
    }
    
}

function onAddItemClicked(e){
    let value = $('#input'+ e.target.id).value;
    if(value == '') return;

    var detail = {
        name        : value,
        isDeleted   : false,
        removeReason: ''
    }

    Menu[e.target.id].push(detail);
    render();
}

function onRmoveItemClicked(e) {
    let button      = e.target;
    let menuType    = button.getAttribute('menuType');
    let beverage    = button.id;

    let inputRemove = $('#inputRemove'+ beverage);

    console.log(Menu[menuType])
    let bev = Menu[menuType].find(m => {
        return m.name === beverage;
    })

    if( button.innerHTML == "ReAdd item" )
    {
        bev.isDeleted       = false;
        bev.removeReason    = ''; 
    } else {
        bev.isDeleted = true;
        bev.removeReason    = inputRemove.value; 
    }

    

    console.log(bev)
    render();
}


render();