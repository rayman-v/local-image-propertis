/*
 * @description 获取本地图片属性的类
 * @sample LocalPicture('fileId', 'imgId')
 * @param fileId string ‘<input=file>’元素的id
 * @param imgId string ‘<img>’元素的id
*/
function LocalPicture(fileId, imgId) {
  if (this instanceof LocalPicture) {
    this.fileEle = document.getElementById(fileId);
    this.imgEle = document.getElementById(imgId);
  }else{
    return new LocalPicture(fileId, imgId);
  }
}

/*
 * @description 每次选择图片后的回调
 * @sample LocalPicture('fileId', 'imgId').load(function(p)) {}
 * @param callback function 回调函数，回调函数中带一个形参，所有图片属性都在该形参内
*/
LocalPicture.prototype.load = function(callback){
  var _this = this;
  this.fileEle.onchange = function(e) {
    var obj = {};
    obj.file = e.target.files[0];
    obj.url = window.URL.createObjectURL(obj.file);
    obj.size = obj.file.size;
    _this.imgEle.src = obj.url;
    
    obj.type = (function () {
      var split = obj.file.name.split('.');
      return split[split.length - 1].toLowerCase();
    })();
    
    obj.isImage = (function(){
      var types = ['jpg', 'png', 'jpeg', 'gif', 'bmp'];
      for (var i = types.length - 1; i >= 0; i--) {
        if (types[i] === obj.type) {
          return true;
        }
      }
      return false;
    })();
    
    var image = new Image();
    image.src = obj.url;
    image.onload = function (){
      obj.width = image.width;
      obj.height = image.height;
      callback(obj);
      image = null;
    }
  }
}

// example:
// LocalPicture('fileId', 'imgId').load(function(p) { alert(p) })
