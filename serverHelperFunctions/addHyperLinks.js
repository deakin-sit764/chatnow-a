AddLinks = function(s){

  let startofLink = s.indexOf("http");
  if(startofLink === -1) return s;
  let endofLink = s.lastIndexOf("/");

  //console.log("start = " + startofLink);
  //console.log("end = "+ endofLink);

  let link = s.slice(startofLink,endofLink+1);
  //console.log("Link = " + link);
  let newlink = '<a href="'+link+'"></a>';
  console.log(newlink);

  let newstring = s.replace(link,newlink);
  //console.log(newstring);

  return newstring;
}

AddLinks("In order to apply for a personal loan with NOW FINANCE applicants must our eligibility criteria. It can be find out at https://nowfinance.com.au/eligibility/");
