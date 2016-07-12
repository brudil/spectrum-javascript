var SpectrumDocument = require('./dist/src/document.js').default;
var subtypes = require('./dist/src/subtypes');

var doc = new SpectrumDocument();

console.log(doc);

doc.content = new subtypes.ArticleSubtype();


var docJSON = JSON.stringify(doc.toJS());
console.log(docJSON);
console.log('-------------------');
var redoc = new SpectrumDocument();
redoc.parse(JSON.parse(docJSON));
var redocJSON = JSON.stringify(redoc.toJS());
console.log(redocJSON);
console.log('-------------------');
console.log(docJSON === redocJSON ? 'Same!' : 'differences');

