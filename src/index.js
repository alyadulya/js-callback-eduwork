import Table, { app, capitalizeFirstLetter, getData, renameKey } from "./tablemodule.js";

getData("https://jsonplaceholder.typicode.com/users", function(d) {
    // console.log(d);
    for(var i in d) {
        delete d[i]['phone'];
        delete d[i]['website'];
        d[i]['address'] = d[i].address.street + ", " + d[i].address.suite + ", " + d[i].address.city;
        d[i]['company'] = d[i].company.name;
    }

    // console.log(d[0]);
    
    var cols = JSON.parse(JSON.stringify(d));
    cols.forEach(obj => {
        renameKey( obj, 'id', 'ID' );
        var key = Object.keys(obj);
        delete key[5];
        for(var i in key) {
            renameKey( obj, key[i], capitalizeFirstLetter(key[i]))
        }
    });
    // console.log(cols);
    var columns = Object.keys(cols[0]);
    var dt = JSON.parse(JSON.stringify(d));
    var data = [];
    
    for(var i in dt) {
        data.push(Object.values(dt[i]))
    }

    // console.log(data);

    const table = new Table({
        columns: columns,
        data: data
    });

    table.render(app);
})