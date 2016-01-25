google.load("maps", "3.x", {"other_params":"sensor=false"});

function initialize() {
  var myLatLng = new google.maps.LatLng(35.44730, 139.63450); //マップの中心座標
  var myOptions = {
  zoom: 17, //ズームレベル
  center: myLatLng,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControlOptions: {
  mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'style']
  }
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  new google.maps.Marker({
  position: new google.maps.LatLng(35.44696, 139.63438), //アイコンの中心座標
  map: map,
  icon: "icon.png" //アイコン画像
  });
  var mapstyle = 
  //ここからJSON情報貼り付け
  [
  {
  featureType: "all",
  elementType: "all",
  stylers: [
  { saturation: -100 }
  ] 
  },{
  featureType: "all",
  elementType: "labels",
  stylers:[
  { visibility: "off" }
  ] 
  },{
  featureType: "administrative",
  elementType: "all",
  stylers: [
  { visibility: "on" }
  ] 
  },{
  featureType: "landscape",
  elementType: "all",
  stylers: [
  { visibility: "on" }
  ] 
  },{
  featureType: "transit",
  elementType: "all",
  stylers: [
  { visibility: "on" }
  ] 
  }
  ]
  //ここまで
  ;
  
  var myOptions = {
  name: "Monotone" //今回のスタイル名(地図右上に表示される名前)
  };
  
  var mapType = new google.maps.StyledMapType(mapstyle, myOptions);
  map.mapTypes.set('style', mapType);
  map.setMapTypeId('style');
  }
  google.setOnLoadCallback(initialize);