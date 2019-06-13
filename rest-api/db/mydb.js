const fs = require('fs');
const ARTIFACTS_PATH = '../db/artifacts';

const generateId = () => {
    return Math.random().toString(36).substring(2,10);
}
var Database = function() {

    if(!fs.existsSync(ARTIFACTS_PATH)) {
        fs.mkdirSync(ARTIFACTS_PATH);
    }
};

Database.prototype.select = function(document, whereCollection, filterObject) {
    var rawDatabaseCollection       = (fs.readFileSync(`${ARTIFACTS_PATH}/${document}`)).toString();
    var parsedDatabaseCollection    = rawDatabaseCollection.split('\n');
    parsedDatabaseCollection.pop();

    var collection  = [];
    var filterCollection    = [];

    for (let i = 0; i < parsedDatabaseCollection.length; i++) {
        var document = JSON.parse(parsedDatabaseCollection[i]);

        if(whereCollection) {
            for(var index in whereCollection) {
                if(document[index] == whereCollection[index]) {
                    collection.push(document);
                }
            }
        } else {
            collection.push(document);
        }
    }

    var filterCollection = collection.splice(0);

    if(filterObject.skip) {
        var skipInnerCollection = [];
        for (let index = filterObject.skip; index < filterCollection.length; index++) {
            const element = filterCollection[index];
            skipInnerCollection.push( element );
        }
        filterCollection = skipInnerCollection;
    }

    if(filterObject.limit) {
        var limitInnerCollection = [];

        for (let index = 0; index < filterObject.limit; index++) {
            const element = filterCollection[index];
            limitInnerCollection.push( element );
        }
        filterCollection = limitInnerCollection;
    }

    return filterCollection;
};

Database.prototype.insert   = function(document, object) {
// TODO: verify object is JSON.

    // generate id
    var __id = generateId();
    
    // stringfy document object
    var processEntity = object;
    processEntity.__id = __id;

    var storeEntity = JSON.stringify(processEntity) + '\n'; 

    // insert into proper document
    fs.writeFileSync(`${ARTIFACTS_PATH}/${document}`, storeEntity,{flag: 'a'});

    return processEntity;
}

Database.prototype.update   = function(document, object) {
    var rawDatabaseCollection       = (fs.readFileSync(`${ARTIFACTS_PATH}/${document}`)).toString();
    var parsedDatabaseCollection    = rawDatabaseCollection.split('\n');
    parsedDatabaseCollection.pop();

    var collection = []

    for (let i = 0; i < parsedDatabaseCollection.length; i++) {
        var doc = JSON.parse(parsedDatabaseCollection[i]);
            if(doc.__id == object.__id) {
                collection.push(JSON.stringify(object));
            } else {
                collection.push(JSON.stringify(doc) + '\n');
            }
    }
        // // insert into proper document
        fs.writeFileSync(`${ARTIFACTS_PATH}/${document}`, collection.join('\n') );
    
        return collection;
    }

Database.prototype.delete   = function(document, object) {
    var rawDatabaseCollection       = (fs.readFileSync(`${ARTIFACTS_PATH}/${document}`)).toString();
    var parsedDatabaseCollection    = rawDatabaseCollection.split('\n');
    parsedDatabaseCollection.pop();

    var collection = []

    for (let i = 0; i < parsedDatabaseCollection.length; i++) {
        var doc = JSON.parse(parsedDatabaseCollection[i]);
            if(doc.__id != object.__id) {
                collection.push(JSON.stringify(doc) + '\n');
            }
    }
        // // insert into proper document
        fs.writeFileSync(`${ARTIFACTS_PATH}/${document}`, collection.join('\n') );
    
        return collection;
    }
module.exports = new Database();
