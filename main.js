var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
var img = new Image();
var trckVal = 50;
var tintTrckVal = 50;
var tintVal = 0;
var imageDataArray = [];

document.querySelector('#fileSelect').addEventListener('change', function(){
  if(this.files.length > 0){
    let reader = new FileReader();
    reader.onload = function(){
        img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          let imageData = ctx.getImageData(img.x,img.y,img.width,img.height);
          imageDataArray.push(imageData);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(this.files[0]);

    document.querySelectorAll('.rbtn').forEach(function(el,i){
      el.disabled = false;
    });
    document.querySelector('#download').disabled = false;
    document.querySelector('#apply').disabled = false;
    document.querySelector('#undo').disabled = false;
    document.querySelector('#revert').disabled = false;
    document.querySelector('#slider').disabled = false;
  }
  else{
    document.querySelectorAll('.rbtn').forEach(function(el,i){
      el.disabled = true;
    });
    document.querySelector('#download').disabled = true;
    document.querySelector('#apply').disabled = true;
    document.querySelector('#undo').disabled = true;
    document.querySelector('#revert').disabled = true;
    document.querySelector('#slider').disabled = true;
  }
});

document.querySelectorAll('.rbtn').forEach(function(el,i){
  el.addEventListener('change',function(){
    if(this.value == "tint"){
      $('#tintSliderVal').val(0);
      $('#tintSlider').val(50);
      $('#tintSliderDiv').css('display','block');
      $('#sliderDiv').css('display','none');
    }
    else{
      $('#sliderVal').val(50);
      $('#slider').val(50);
      $('#sliderDiv').css('display','block');
      $('#tintSliderDiv').css('display','none');
    }
  });
});
document.querySelector('#slider').addEventListener('input', function(){
  trckVal = parseInt(this.value);
  $('#sliderVal').val(trckVal);
});
document.querySelector('#tintSlider').addEventListener('input', function(){
  tintTrckVal  = parseInt(this.value);
  tintVal = tintTrckVal < 51 ? 50 - tintTrckVal :
                tintTrckVal > 51 ? tintTrckVal - 51 : 0;
  $('#tintSliderVal').val(tintVal);
});

document.querySelector('#apply').addEventListener('click', function(){
  if($("input[name=filter]:checked").val() == "negative")
     negateImage();
  else if($("input[name=filter]:checked").val() == "contrast")
    adjustImageContrast();
  else if($("input[name=filter]:checked").val() == "bnw")
    desaturateImage();
  else if($("input[name=filter]:checked").val() == "noise")
    addNoise();
  else if($("input[name=filter]:checked").val() == "tint")
    addTint();
});
document.querySelector('#undo').addEventListener('click', function(){
  if(imageDataArray.length > 1){
    console.info("undo");
    imageDataArray.pop();
    ctx.putImageData(imageDataArray[imageDataArray.length-1], img.x, img.y);
  }
});
document.querySelector('#revert').addEventListener('click', function(){
  if(imageDataArray.length > 1){
    console.info("revert");
    origImageData = imageDataArray[0];
    imageDataArray = [origImageData];
    ctx.putImageData(origImageData, img.x, img.y);
  }
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
