function forget(){
	var acc=document.getElementById("account").value;
	var userId=document.getElementById("userId").value;
	if(acc!="" && userId!=""){
		alert("帳號:"+acc+"\nUser ID:"+userId);
		window.location.href="../Reset/Reset.html";
	}else alert("資料錯誤!");
	
}