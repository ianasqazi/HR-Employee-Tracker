
var cli = require("./public/initialize.js")


const logo = require('asciiart-logo');
 

console.log(
    logo({
        name: 'Employee Tracker',
        font: 'ANSI Shadow',
        lineChars: 25,
        padding: 2,
        margin: 3,
        borderColor: 'yellow',
        logoColor: 'bold-red',
        textColor: 'yellow',
    })
    // .emptyLine()
    // .center('<<< Employee Tracker >>>')
    .emptyLine()
    .right("@ianasqazi v1.0")
    .render()
);
