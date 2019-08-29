function negateImage(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];

    var newR = 255 - r;
    var newG = 255 - g;
    var newB = 255 - b;

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}

function adjustImageContrast(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  const contrastLine = 128;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];

    var newR = r >= contrastLine ? (r + trckVal / 5) : (r - trckVal / 5);
    var newG = g >= contrastLine ? (g + trckVal / 5) : (g - trckVal / 5);
    var newB = b >= contrastLine ? (b + trckVal / 5) : (b - trckVal / 5);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}

function desaturateImage(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  for(i=0;i<dataArr.length;i+=4){
    var avg = 0;
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];

    avg = (r+g+b)/3;
    var newR = r + (avg - r) * (trckVal / 100);
    var newG = g + (avg - g) * (trckVal / 100);
    var newB = b + (avg - b) * (trckVal / 100);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}

function addNoise(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  var trckVal_rand = Math.floor(Math.random() * 100);//temp;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];
    var b = dataArr[i+2];

    var newR = r + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);
    var newG = g + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);
    var newB = b + getRandomIntInclusive(trckVal_rand*-1, trckVal_rand);

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
    dataArr[i+2] = clampRange(newB);
  }
  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}

function addTint(){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  var trckVal_rand = Math.floor(Math.random() * 100);//temp;
  for(i=0;i<dataArr.length;i+=4){
    var r = dataArr[i];
    var g = dataArr[i+1];

    var newR = tintTrckVal < 51 ? r + tintVal : r;
    var newG = tintTrckVal > 51 ? g + tintVal : g;

    dataArr[i] = clampRange(newR);
    dataArr[i+1] = clampRange(newG);
  }
  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}
