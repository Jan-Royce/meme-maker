var canvas = document.getElementById('image');
var ctx = canvas.getContext('2d');
var img = new Image();

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
  for(j = 0; j < canvas.height; j++){
    for(i = 0; i < canvas.width; i++){
      let pixel = ctx.getImageData(i, j, 1, 1);
      let newPixel = ctx.createImageData(1, 1);
      newPixel.data[0] = 255 - pixel.data[0];
      newPixel.data[1] = 255 - pixel.data[1];
      newPixel.data[2] = 255 - pixel.data[2];
      newPixel.data[3] = 255;
      ctx.putImageData(newPixel, i, j);
      console.log(i,j);
    }
  }
});

function downloadImage()
{
  let dataURL = canvas.toDataURL();
  let fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  let mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
  let lowQuality = canvas.toDataURL('image/jpeg', 0.1);

  image_name = "test";
  let x = new XMLHttpRequest();
  x.open("GET", fullQuality, true);
  x.responseType = 'blob';
  x.onload = function(e){download(x.response, image_name + ".jpg", "image/jpeg" );}
  x.send();
}

document.querySelector("#download").addEventListener("click", function(){
downloadImage();});
