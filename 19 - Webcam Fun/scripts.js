const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// turn on the camera/ask for access
// display the video on the video div
// when you click take photo, addeventlistener to button which should take a photo of the video
// download photo you've taken if you want
// canvas.style.width = '800px';
// canvas.style.height = '800px';
//video.style.width = '800px';
//video.style.height = '800px';

function getVideo() {
  // const facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
  const constraints = {
    video: true,
    audio: false
  };

  /* Stream it to video element */
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err => alert('Error occurred: ', err));
}

function displayOnCanvas() {
  const height = video.videoHeight;
  const width = video.videoWidth;
  canvas.height = height;
  canvas.width = width;


 return setInterval(() => {
   ctx.drawImage(video, 0, 0,width, height);
   let pixels = ctx.getImageData(0, 0, width, height);
  //  pixels = rgbSplit(pixels);
  //  pixels = redEffect(pixels);

  pixels = grnScreen(pixels);
   ctx.putImageData(pixels, 0, 0);
  }, 16);

}

function takePhoto() {

 snap.currentTime = 0;
 snap.play();

 const data = canvas.toDataURL('image/jpeg');
 const link = document.createElement('a');
 link.href = data;

 link.setAttribute('download', 'selfie');
 link.innerHTML = `<img src='${data}' alt="selfie">`;
 strip.insertBefore(link, strip.firstChild);
};


function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}


function rgbSplit(pixels) {
 for (let i = 0; i < pixels.data.length; i+=4) {
   pixels.data[i - 150] = pixels.data[i+0];
   pixels.data[i + 500] = pixels.data[i+1];
   pixels.data[i - 550] = pixels.data[i+2];
 }
 return pixels
}


function grnScreen(pixels) {

  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  })

  for (let i = 0; i < pixels.data.length; i+=4) {
    red = pixels.data[i+0];
    green = pixels.data[i+1];
    blue = pixels.data[i+2];
    alpha = pixels.data[i+3];

    if (red >= levels.rmin
      && red <= levels.rmax
      && green >= levels.gmin
      && green <= levels.gmax
      && blue >= levels.bmin
      && blue <= levels.bmax )  {
        pixels.data[i+3] = 0;
      }

    }

    return pixels;

  }



getVideo();

video.addEventListener('canplay', displayOnCanvas);
