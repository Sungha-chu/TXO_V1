function register(){
	var acc=document.getElementById("account").value;
	var pwd=document.getElementById("password").value;
	var pwdC=document.getElementById("passwordCheck").value;

	if(acc!="" && pwd!="" && pwdC!="" && pwd==pwdC){
		var userId=randomChar()+"-"+randomNum();//三個英文字母+一個五位數數字
		alert("帳號: "+acc+"\n密碼: "+pwd+"\n確認密碼: "+pwdC+"\nUser ID: "+userId);
		window.location.href="../HomePage/HomePage.html";
	}else alert("資料錯誤!");
	
}

function randomChar(){
	return String.fromCharCode(Math.floor(Math.random()*25)+65)+String.fromCharCode(Math.floor(Math.random()*25)+65)+String.fromCharCode(Math.floor(Math.random()*25)+65);//產生三個英文字母
}

function randomNum(){
	return Math.floor(Math.random()*99999).toString();//產生一個五位數數字
}