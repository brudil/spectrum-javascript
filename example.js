var SpectrumDocument = require('./dist/src/document.js').default;
var subtypes = require('./dist/src/subtypes');
var blocks = require('./dist/src/blocks');
var sections = require('./dist/src/sections');

var doc = new SpectrumDocument();

console.log(doc);

doc.content = new subtypes.ArticleSubtype();

doc.content.stream[0] = new sections.FreeformSection();
doc.content.stream[0].stream[0] = new blocks.HeadingBlock();
doc.content.stream[0].stream[1] = new blocks.ImageBlock();

var docJSON = JSON.stringify(doc.toJS());
console.log(docJSON);
console.log('-------------------');
var redoc = new SpectrumDocument();
redoc.parse(JSON.parse(docJSON));
var redocJSON = JSON.stringify(redoc.toJS());
console.log(redocJSON);
console.log('-------------------');
console.log(docJSON === redocJSON ? 'Same!' : 'differences');


console.log(doc.getElements());
