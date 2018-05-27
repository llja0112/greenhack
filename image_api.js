// Imports the Google Cloud vision library
const vision = require('@google-cloud/vision');
var fs = require('fs');

const client = new vision.ImageAnnotatorClient({
  keyFilename: './keys/palmoil-23773c6cbe20.json', 
});

exports.process = function (image, args, res) {
  
  // RECEIPT DEMO
  if (args=="receipt"){
    client
      .documentTextDetection(image)
      .then(results => {

        const textAnnotation = results[0].fullTextAnnotation;
        console.log(textAnnotation.text);
        res.send(textAnnotation);

        fs.writeFile('public/json/'+args+'.json', JSON.stringify(textAnnotation), function(err){
          if (err) throw err;
        });


      })
      .catch(err => {
        console.log('Error:', err);
      });

  // FACE DEMO
  } else if (args=="farmer"){
    client
      .faceDetection(image)
      .then(results => {
        const faceAnnotation = results[0].faceAnnotations;
        vertices = faceAnnotation[0].fdBoundingPoly.vertices;
        console.log(vertices);
        res.send(vertices);

        fs.writeFile('public/json/'+args+'.json', JSON.stringify(vertices), function(err){
          if (err) throw err;
        });

      })

      .catch(err => {
        console.log('Error:', err);
      
      });

  // OBJECT DETECTION DEMO
  } else if (args=="harvest"){
    client
      .labelDetection(image)
      .then(results => {
        const labels = results[0].labelAnnotations;
        labels.forEach(label => console.log(label.description));
        res.send(labels);

        fs.writeFile('public/json/'+args+'.json', JSON.stringify(labels), function(err){
          if (err) throw err;
        });

      })
      .catch(err => {
        console.log('Error:', err);
      
      });
  }
}

