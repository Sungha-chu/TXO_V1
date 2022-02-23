function login(){
	var acc=document.getElementById("account").value;
	var pwd=document.getElementById("password").value;
	if(acc==""||pwd=="") alert("資料錯誤!");
	else {
		alert("帳號: "+acc+"\n密碼: "+pwd);
		window.location.href="../Main/Main.html";
	}
	
}