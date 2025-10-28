
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
   
    async function crmget()  {
	   let data;
	   if ( v_customerPhone.includes("@");)
	   {
    let url = 'https://6724f040c39fedae05b35190.mockapi.io/api/AnnaG/TestUBS/?email_address=' + v_customerPhone;
	}
	else {
		let url = 'https://6724f040c39fedae05b35190.mockapi.io/api/AnnaG/TestUBS/?ani=' + v_customerPhone;
	}
    const res = await fetch(url);
    if (res.ok) {
       data = await res.json();
      console.log("pippo" + JSON.stringify(data));
    }
   // const response = {
  //   body:  JSON.stringify(data),
 //   };
	v_Name = data[0].name;
	v_Account= data[0].account;
	v_Iban= data[0].iban;
	
	document.getElementById("nome").value = v_Name;
	document.getElementById("conto").value = v_Account;
	document.getElementById("iban").value = v_Iban;
	
	return  true;
	}
      
  
    body = crmget ();
	
};
    


