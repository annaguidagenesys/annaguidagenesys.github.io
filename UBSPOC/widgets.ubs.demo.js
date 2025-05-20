
var v_Name= "";
var v_Account= "";
var v_Iban= "";
var v_customerPhone= "";

function cx_getElement(id) {
	var evalue = document.getElementById(id).value;
	//console.log(log_prefix + ' ' + evalue);
	return evalue;
}

{
    v_Name= cx_getElement("nome");
    v_Account= cx_getElement("conto");
    v_Iban= cx_getElement("iban");
    v_customerPhone= cx_getElement("telefono");
   
   ys = document.createElement('script'); ys.async = 1; ys.charset = 'utf-8'; document.head.appendChild(ys);
   
    let data;
    let url = 'https://6724f040c39fedae05b35190.mockapi.io/api/AnnaG/TestUBS/?ani=' + v_customerPhone;
    const res =  fetch(url);
  //  if (res.ok) {
     //  data =  res.json();
      console.log("pipppo" +res);
    
     //   body: JSON.stringify(data);
  
    document.getElementById("nome").innerHTML = res.name;
	document.getElementById("conto").innerHTML = res.account;
	document.getElementById("iban").innerHTML = res.iban;
};
    


