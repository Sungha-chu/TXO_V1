function register(){
	var acc=document.getElementById("account").value;
	var pwd=document.getElementById("password").value;
	var pwdC=document.getElementById("passwordCheck").value;

	if(acc!="" && pwd!="" && pwdC!="" && pwd==pwdC){
		alert("帳號: "+acc+"\n密碼: "+pwd+"\n確認密碼: "+pwdC);
		window.location.href="../HomePage/HomePage.html";
	}else alert("資料錯誤!");
	
}