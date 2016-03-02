//Element ID 불러쓰기
function dEI(elementID){
	return document.getElementById(elementID);
}


//팝업레이어1
function view_show(num)
{
	dis_chk = eval("document.getElementById('dispay_view"+num+"')");
	dis_chk.style.display = "block";
//	document.getElementById("footerBG").style.display = "block";
}


function view_hide(num)
{
	dis_chk = eval("document.getElementById('dispay_view"+num+"')");
	dis_chk.style.display = "none";
//	document.getElementById("footerBG").style.display = "none";
}

