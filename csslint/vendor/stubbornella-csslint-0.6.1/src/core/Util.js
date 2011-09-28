/*
 * Utility functions that make life easier.
 */

/*
 * Adds all properties from supplier onto receiver,
 * overwriting if the same name already exists on
 * reciever.
 * @param {Object} The object to receive the properties.
 * @param {Object} The object to provide the properties.
 * @return {Object} The receiver
 */
function mix(reciever, supplier){
    var prop;

    for (prop in supplier){
        if (supplier.hasOwnProperty(prop)){
            receiver[prop] = supplier[prop];
        }
    }

    return prop;
}

/*
 * Polyfill for array indexOf() method.
 * @param {Array} values The array to search.
 * @param {Variant} value The value to search for.
 * @return {int} The index of the value if found, -1 if not.
 */
function indexOf(values, value){
    if (values.indexOf){
        return values.indexOf(value);
    } else {
        for (var i=0, len=values.length; i < len; i++){
            if (values[i] === value){
                return i;
            }
        }
        return -1;
    }
}