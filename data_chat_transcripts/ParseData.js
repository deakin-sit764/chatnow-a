const fs = require('fs');
let filedata = '';

fs.readFile('./chatdata.txt', (err,data) => {
  filedata += data;
  let s1 = filedata.indexOf('Timestamp');
  let s2 = filedata.indexOf('=');

  const session_data = [];
  session_data.push(filedata.slice(s1,s2));
  while(true) {
    s1 = filedata.indexOf('Timestamp',s2);
    //We do not have anymore session data with customers
    if(s1 === -1) break;
    //Find the end of the session Now
    s2 = filedata.indexOf('=', s1);
    //Get the session dataType
    let temp_session = filedata.slice(s1,s2);
    session_data.push(temp_session);
  }
  session_data.forEach(showcountry);
});

function showcountry(data){
  //console.log(data);
  let index = data.indexOf('Country Name');
  let endindex = data.indexOf('\n',index);
  //console.log("starting index = " + index);
  //console.log("ending index = " + endindex);
  let country = data.slice(index+12,endindex);
  console.log(country);

}
