// Tutorial from: http://blog.modulus.io/mongodb-tutorial
// This was also helpful: https://mongodb.github.io/node-mongodb-native/api-generated/collection.html

var request = require('request-json');
var mongodb = require('mongodb');

var url = 'mongodb://localhost:27017/personalblog';
var MongoClient = mongodb.MongoClient;
var client = request.createClient('http://harrywinser.com:80/');

console.log("Starting app");

client.get("get/articles/all", function(err, res, body){
  SaveToDb(body);
});


function SaveToDb(data){

  MongoClient.connect(url, function (err, db) {

    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {

      console.log('Connection established to', url);

      var collection = db.collection('posts');

      var size = data.articles.length;
      console.log("Array length: ", size);
      data.articles.forEach(function(article){
        console.log("Adding post:", article.title);

        collection.save(article, {w: 1}, function(err, result){
          if(err){
            console.log(err);
          }

          size --;
          if(size == 0){
            db.close();
          }
        });
      });
    }
  });
}
