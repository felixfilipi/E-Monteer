const express = require('express');
var distance = require('google-distance');
 

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
	if(!error){
distance.get(
  {
    origin: '-7.841879,110.409193',
    destination: '-7.741194,110.342588'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
  }
	else
		console.log("Error occurred, server can't start", error);
	}
);

