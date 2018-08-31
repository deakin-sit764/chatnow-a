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
  let = session_counter = 0;
  let final_conversations = '';
  let index = data.indexOf('(2018-');
  let android = 0;
  let iphone = 0;
  let windows = 0;
  let mac = 0;

  session_data.forEach((data)=> {

    if(data.indexOf('iPhone') != -1) iphone++;
    if(data.indexOf('Macintosh') != -1) mac++;
    if(data.indexOf('Linux') != -1) android++;
    if(data.indexOf('Windows') != -1) windows++;


    //console.log("starting index = " + index);
    let conversation = data.slice(index);
    session_counter++;
    final_conversations += '\n+++++++++++++++++++++++++Session '+session_counter+'++++++++++++++++++++++++++\n';
    //console.log("Session: "+session_counter);
    //console.log(conversation);
    final_conversations  += conversation;
  })

  final_conversations += "Number of Android Customers = " + android + '\n';
  final_conversations += "Number of iPhone Customers = " + iphone + '\n';
  final_conversations += "Number of Mac Customers = " + mac + '\n';
  final_conversations += "Number of Windows Customers = " + windows + '\n';
  console.log(final_conversations);
  fs.writeFile('./session_data.txt',final_conversations, (err)=>{
    throw err;
  })
});

function showsessions(data){
  //console.log(data);
  let index = data.indexOf('(2018-');
  //console.log("starting index = " + index);
  let conversation = data.slice(index);
  console.log(conversation);
}
function showcountry(data) {
  //console.log(data);
  let index = data.indexOf('Country Name');
  let endindex = data.indexOf('\n',index);

  //console.log("ending index = " + endindex);
  let country = data.slice(index+13,endindex);
  console.log(country);
}
