function showUserInfo(){	//顯示用戶資料
	var acc=getAcc();
	var pwd=getPwd();
	var userId=getUserID();
	swal("使用者資料",`Account :  ${acc}`+`\nPassword :  ${pwd}`+`\nUser ID :  ${userId}`,"info");
}

function getAcc(){	//從Server取得帳號
	return "12345678@gmail.com"
}

function getPwd(){	//從Server取得密碼
	return "12345678"
}

function getUserID(){	//從Server取得User ID
	return "FWD-66666";
}

function newDevice(){	//新增裝置
	var deviceID,deviceLocation,deviceIdentityType;
	swal("請輸入Device ID:", {content: "input",}).then((value) => {
		deviceID=value.split(" ").join("");
		if (deviceID.length==5) {
			//先將輸入的資料儲存至Server
			//呼叫newSelect刷新裝置列表
			swal("Success", `裝置 ${deviceID}新增成功`, "success");
		}
		else swal("Error", "裝置新增失敗!", "error");
  });
}

function newSelect(){	//設置裝置列表
	var list=getList();
	var select=document.getElementById("deviceList");
	if(select.options.length==1) for(var i=0;i<list.length;i++) select.options.add(new Option(list[i], i+1));//避免重複click導致選項重複新增
}

function getList(){		//從Server取得裝置該用戶所有裝置	
	var list=new Array();
	list.push("A0000");
	list.push("A0001");
	list.push("A0002");
	list.push("A0003");
	list.push("A0004");
	return list;
}

function selected(){	//依照選擇的裝置來顯示裝置狀態
	var select=document.getElementById("deviceList");
	var index=select.selectedIndex;
	var selectedValue=select.options[index].value;
	if(deviceState(getCamState(),getAudio1State(),getAudio2State(),getLcdState()))	swal(`裝置 ${select.options[index].text} 正常`,getDeviceStateInfo(),"success");
	else swal(`裝置${select.options[index].text}異常`,getDeviceStateInfo(),"error");
	
	setLocationLabel();	//初始化裝置架設地點
	setCheckBox();	//初始化用戶辨識項目
	setEventHistory();	//初始化事件瀏覽紀錄
}

function deviceState(cam,audio1,audio2,lcd){	//比對所有設備狀態是否皆為正常
	return cam==audio1==audio2==lcd==true?true:false;
}

function getCamState(){		//從Server取得相機狀態
	return true;
}

function getAudio1State(){	//從Server取得音響1狀態
	return true;
}

function getAudio2State(){	//從Server取得音響2狀態
	return true;
}

function getLcdState(){		//從Server取得LCD狀態
	return true;
}

function getDeviceStateInfo(){	//取得裝置整體狀態
	var state=["異常","異常","異常","異常"];
	if(getCamState())state.splice(0,1,"正常");
	if(getAudio1State())state.splice(1,1,"正常");
	if(getAudio2State())state.splice(2,1,"正常");
	if(getLcdState())state.splice(3,1,"正常");
	
	return "相機 :"+state[0]+"\n音響1:"+state[1]+"\n音響2 :"+state[2]+"\nLCD :"+state[3];
}

function setLocationLabel(){	//選擇裝置後顯示裝置架設地點
	var deviceLocation = getDeviceLocation();


	// Initialize user_frame
	var user_frame = document.getElementById("user_frame");
	
	user_frame.innerHTML = "";
	
	//user_frame.location.reload();
	
	var label = document.createElement("label");
	label.id="locationLabel";
	label.style.fontSize = "20px";
	label.appendChild(document.createTextNode("架設地點 :"));
	
	var location = document.createElement("input");
	location.type = "text";
	location.style="height:25px;border-top-right-radius:5px;border-bottom-right-radius: 5px;background-color:#DDDDDD;font-size:20px;boder:0;";
	if(deviceLocation == null || deviceLocation == "") location.placeholder = "請輸入架設地點...";
	else location.value = deviceLocation;	//如果之前有輸入過會顯示之前的地點
	
	var label2 = document.createElement("label");
	label2.appendChild(document.createTextNode("選擇辨識項目:"));
	label2.style.fontSize = "20px";
	
	// <br>
	var br = document.createElement("br");
	
	
	
	
	user_frame.appendChild(label);
	user_frame.appendChild(location);
	user_frame.appendChild(br);
	user_frame.appendChild(label2);
	
}

function getDeviceLocation(){	//回傳裝置架設地點
	return "";
}


function setCheckBox(){	//選擇裝置後顯示辨識項目
	var identityTypeName = getIdentityType();	//取得所有辨識項目清單
	var identityChecked = getIdentityChecked().split(",");	//取得使用者選擇的辨識項目
	var identityCheckedIndex = 0;

    // Initialize container
	var container = document.getElementById("container");
	
	container.innerHTML = "";

	var checkbox = new Array(identityTypeName.length);
	
	for(var i=0;i<identityTypeName.length;i++){
		// Initialize checkbox
		checkbox[i] = document.createElement("input");
		checkbox[i].type = "checkbox";
		checkbox[i].style="width:20px;height:20px;";
		checkbox[i].name = identityTypeName[i];
		checkbox[i].value = i+1;
		checkbox[i].id = i;
		
		if(identityChecked[identityCheckedIndex] == checkbox[i].value){
			checkbox[i].checked = "true";
			identityCheckedIndex++;
		}
		
		checkbox[i].onclick = function() {
			// The trigger event you want
			alert(this.value);
		}
		// Initialize checkbox label
		var label = document.createElement("label");
		label.appendChild(document.createTextNode(i+1+". "+identityTypeName[i]));
		label.style.fontSize = "25px";
		// <br>
		var br = document.createElement("br");
		// Add to container
		container.appendChild(checkbox[i]);
		container.appendChild(label);
		container.appendChild(br);

	}
	
	//Initialize save button
	var button = document.createElement("button");
	button.style.fontSize="20px";
	button.innerHTML="儲存變更";
	button.onclick = function(){
		alert("儲存變更");
	}
	container.appendChild(button);
		
}

function getIdentityType(){	//回傳所有辨識項目清單
	var type = new Array();
	type.push("cat");
	type.push("dog");
	type.push("bird");
	type.push("elephant");
	type.push("mask");
	
	return type;
}

function getIdentityChecked(){	//回傳使用者選擇的辨識項目
	return "1,3,5";
}

function setEventHistory(){
	var event_list = document.getElementById("event_list");
	
	var table = document.createElement("table");
	
	//設定事件Bar
	var rowBar = document.createElement("tr");
	var idBar = document.createElement("td");
	var timeBar = document.createElement("td");
	var typeBar = document.createElement("td");
	var imgBar = document.createElement("td");

	idBar.innerHTML = "事件ID";
	timeBar.innerHTML = "觸發時間";
	typeBar.innerHTML = "事件類別";
	imgBar.innerHTML = "圖片連結";
	
	idBar.style = "width:200px; border:1px solid red;";
	timeBar.style = "width:200px; border:1px solid red;";
	typeBar.style = "width:200px; border:1px solid red;";
	imgBar.style = "width:400px; border:1px solid red;";
	
	rowBar.appendChild(idBar);
	rowBar.appendChild(timeBar);
	rowBar.appendChild(typeBar);
	rowBar.appendChild(imgBar);
	table.appendChild(rowBar);
	
	
	//新增事件清單
	var id = document.createElement("td");
	var time = document.createElement("td");
	var type = document.createElement("td");
	var img = document.createElement("td");

	//事件 I D : 202202221336300000
	//觸發時間 : 20220222133630
	//事件類別 : 動物靠近

	var testImg = document.createElement('img');
    testImg.src = "https://movies.yahoo.com.tw/i/o/production/movie-photos/December2021/uqDC8TmNySYPeFOoYRhF-1499x1080.jpg";
	testImg.style = "width:400px";

	id.innerHTML = "202202221336300000";
	time.innerHTML = "20220222133630";
	type.innerHTML = "動物靠近";
	img.appendChild(testImg);
	
	var row = document.createElement("tr");
	row.appendChild(id);
	row.appendChild(time);
	row.appendChild(type);
	row.appendChild(img);
	table.appendChild(row);
	
	event_list.appendChild(table);
}

function getEvent(){
	var data = [ 
		{ id : "202202221336300001", time : "2022.02.22 13:36:30", type : "動物靠近", img : "https://movies.yahoo.com.tw/i/o/production/movie-photos/December2021/uqDC8TmNySYPeFOoYRhF-1499x1080.jpg"},
		{ id : "202202221336300002", time : "2022.02.22 13:38:30", type : "動物靠近", img : "https://movies.yahoo.com.tw/i/o/production/movie-photos/December2021/uqDC8TmNySYPeFOoYRhF-1499x1080.jpg"},
		{ id : "202202221336300003", time : "2022.02.22 13:39:30", type : "動物靠近", img : "https://movies.yahoo.com.tw/i/o/production/movie-photos/December2021/uqDC8TmNySYPeFOoYRhF-1499x1080.jpg"},
	]
	return data;
}