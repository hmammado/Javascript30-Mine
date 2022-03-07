// To play the video
// Query selector the button

const vid = document.querySelector('.player__video');

const playButton = document.querySelector('.player__button');

console.log(vid);
console.log(playButton);

//AddEvent eventlistener to button. When clicked play video

playButton.addEventListener('click', () => {
  const isPaused = vid.paused;
  vid[isPaused ? "play" : "pause"]();
} )


//To change volume

const volumeInput = document.querySelector('.player__slider');

volumeInput.addEventListener('change', () => {
  vid.volume = volumeInput.value;
  console.log(vid.volume);
} )



//To change the speed

const speed = document.querySelector('input[name="playbackRate"]');


//Query selector speed input

//Add event listener to input. When change we increase/decrease sound input value

speed.addEventListener('change', () => {
  vid.playbackRate = speed.value;
  console.log(vid.playbackRate);
})
//Seevideo.playback to input value


//Progress bar



vid.addEventListener('timeupdate', () => {
const progress = (vid.currentTime / vid.duration) * 100;
const progressBar = document.querySelector('.progress__filled');
progressBar.style.flexBasis = `${progress}%`;})


// Query selector progress bar
//Figure out video length
//Convert to percentage
//Set percentage to width of the progress bar




//+10 and +25

//Queryselect + Addevenet listener
// Incremenet video.
