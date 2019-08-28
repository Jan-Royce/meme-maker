var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
var img = new Image();
var trckVal = 100; //temp

document.querySelector('#fileSelect').addEventListener('change', function(){
  let reader = new FileReader();
  reader.onload = function(){
      img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = reader.result;
  };
  reader.readAsDataURL(this.files[0]);
});

document.querySelector('#negative').addEventListener('click', function(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];
    var a = dataArr[i+3];

    var newR = 255 - r;
    var newG = 255 - g;
    var newB = 255 - b;

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
});

document.querySelector('#contrast').addEventListener('click', function(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  const contrastLine = 128;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];
    var a = dataArr[i+3];

    var newR = r >= contrastLine ? (r + trckVal / 5) : (r - trckVal / 5);
    var newG = g >= contrastLine ? (g + trckVal / 5) : (g - trckVal / 5);
    var newB = b >= contrastLine ? (b + trckVal / 5) : (b - trckVal / 5);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
});

document.querySelector('#bnw').addEventListener('click', function(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  for(i=0;i<dataArr.length;i+=4){
    var avg = 0;
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];
    var a = dataArr[i+3];

    avg = (r+g+b)/3;
    var newR = r + (avg - r) * (trckVal / 100);
    var newG = g + (avg - g) * (trckVal / 100);
    var newB = b + (avg - b) * (trckVal / 100);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
});

document.querySelector('#noise').addEventListener('click', function(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  var trckVal_rand = Math.floor(Math.random() * 100);//temp;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];
    var a = dataArr[i+3];

    var newR = r + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);
    var newG = g + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);
    var newB = b + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
});

document.querySelector("#download").addEventListener("click", function(){
downloadImage();});

function downloadImage(){
  let dataURL = canvas.toDataURL();
  let fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  let mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
  let lowQuality = canvas.toDataURL('image/jpeg', 0.1);

  image_name = Date.now();
  // image_name = "test";
  let x = new XMLHttpRequest();
  x.open("GET", fullQuality, true);
  x.responseType = 'blob';
  x.onload = function(e){download(x.response, image_name + ".jpg", "image/jpeg" );}
  x.send();
}

function getRandomIntInclusive(min, max) { //tnx mdn
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function clampRange(number){
  return Math.min(Math.max(parseInt(number), 0), 255);
}
