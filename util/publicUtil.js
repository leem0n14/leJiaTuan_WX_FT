/**
 * 
 * @param {*} name 地点名称
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 */
function openMap(name, latitude, longitude) {
  let plugin = requirePlugin('routePlan');
  let key = '3LUBZ-GBP6W-FBSRJ-R3E5G-DYQ66-YCB5R'; //使用在腾讯位置服务申请的key
  let referer = '乐驾团'; //调用插件的app的名称
  let endPoint = JSON.stringify({ //终点
    'name': name,
    'latitude': Number(latitude),
    'longitude': Number(longitude)
  });
  wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=' + 1
  });
}

export default {
	openMap
}
