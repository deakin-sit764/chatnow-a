const fs = require('fs');
let filedata = '';
let filereader = function(callback) {
  let f1 = false;
  let f2 = false;
  let f3 = false;
  let f4 = false;
  let f5 = false;
  fs.readFile('./ChatData/1.text', (err,data) => {
    if(err) throw err;
    filedata += data;
    f1 = true;
    console.log("f1 finished");
    if(f1 && f2 && f3 && f4 && f5) callback();
  });

  fs.readFile('./ChatData/2.text', (err,data) => {
    if(err) throw err;
    filedata += data;
    f2 = true;
    console.log("f2 finished");
    if(f1 && f2 && f3 && f4 && f5) callback();
  });
  fs.readFile('./ChatData/3.text', (err,data) => {
    if(err) throw err;
    filedata += data;
    f3 = true;
    console.log("f3 finished");
    if(f1 && f2 && f3 && f4 && f5) callback();
  });
  fs.readFile('./ChatData/4.text', (err,data) => {
    if(err) throw err;
    filedata += data;
    f4 = true;
    console.log("f4 finished");
    if(f1 && f2 && f3 && f4 && f5) callback();
  });
  fs.readFile('./ChatData/5.text', (err,data) => {
    if(err) throw err;
    filedata += data;
    f5 = true;
    console.log("f5 finished");
    if(f1 && f2 && f3 && f4 && f5) callback();
  });
};

filereader( ()=>{

  console.log("Finished Reading the data");
  fs.writeFile("./chatdata.txt",filedata, (err) => {
    if(err) console.log("Error while writing file, " + err);
    console.log("file was saved");
  })




});
