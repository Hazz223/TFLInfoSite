
var tfl = require('tfl');


console.log("Starting tfl...");

tfl.tube.status({
    'incidents': true,
}).then(function(lines) {
    console.log(lines);
});
