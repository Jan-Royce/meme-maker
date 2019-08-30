function applyFilter(filter){
  var imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
  var dataArr = imageData.data;
  const { length } = dataArr;

  const changePixel = filter === "negative" ? (color) => negatePixel(color) :
                   filter === "bnw" ? (color) => desaturatePixel(color) :
                   filter === "contrast" ? (color) => adjustPixelContrast(color) :
                   filter === "noise" ? (color) => addNoise(color):
                   filter === "tint" ? (color) => addTint(color) :
                   null;

  for(let i = 0; i < length; i+= 4){
    let newColor= changePixel({
        r: dataArr[i],
        g: dataArr[i + 1],
        b: dataArr[i + 2],
    })

    dataArr[i] = clampRange(newColor.r);
    dataArr[i+1] = clampRange(newColor.g);
    dataArr[i+2] = clampRange(newColor.b);
  }

  ctx.putImageData(imageData, img.x, img.y);
  imageDataArray.push(imageData);
}



function negatePixel(oldColor){
    return {
            r : 255 - oldColor.r,
            g : 255 - oldColor.g,
            b : 255 - oldColor.b
          }
}



function adjustPixelContrast(oldColor, contrastLine = 128){
  var newR = oldColor.r >= contrastLine ? (oldColor.r + trckVal / 5) : (oldColor.r - trckVal / 5);
  var newG = oldColor.g >= contrastLine ? (oldColor.g + trckVal / 5) : (oldColor.g - trckVal / 5);
  var newB = oldColor.b >= contrastLine ? (oldColor.b + trckVal / 5) : (oldColor.b - trckVal / 5);

  return{
    r: newR,
    g: newG,
    b: newB
  }
}



function desaturatePixel(oldColor){
    let avg = (oldColor.r + oldColor.g + oldColor.b)/3;
    return {
      r: oldColor.r + (avg - oldColor.r) * (trckVal / 100),
      g: oldColor.g + (avg - oldColor.g) * (trckVal / 100),
      b: oldColor.b + (avg - oldColor.b) * (trckVal / 100)
    }
}



function addNoise(oldColor){
    return {
      r: oldColor.r + getRandomIntInclusive(trckVal*-1, trckVal),
      g: oldColor.g + getRandomIntInclusive(trckVal*-1, trckVal),
      b: oldColor.b + getRandomIntInclusive(trckVal*-1, trckVal)
    }
}



function addTint(oldColor){
  return{
    r : tintTrckVal < 51 ? oldColor.r + tintVal : oldColor.r,
    g : tintTrckVal > 51 ? oldColor.g + tintVal : oldColor.g,
    b : oldColor.b
  }
}


function addSepia(oldColor){
  let tempColor = desaturatePixel(oldColor)

}
