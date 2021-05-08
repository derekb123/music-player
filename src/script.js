const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const songListContainer = document.querySelector('.song-list-container');
// const songListItem = document.createElement('li');


//UI Class: Display UI Items
class UI {

  static addSongToList(song) {
    const list = document.querySelector('.song-list-container');
    const row = document.createElement('div');

    row.classList('song-item')

    row.innerHTML = `
    <div>${song.title}</div>
    <div>${song.duration}</div>
    `
  }

  static displaySongs() {
    songs.forEach((song) => UI.addSongToList(song));
  }
}


//Song Class
class Song {
  constructor(title) {
    this.title = title;
    this.image = 'general.jpeg';
    this.mp3 = 'general.mp3';
    this.likes = 0;
    this.dislikes = 0;
  }

  //Like a song
  likeSong(){
    this.likes ++;
  }

  //Dislike a song
  dislikeSong(){
    this.dislikes ++;
  }

  //Get likes
  getLikes(){
    return this.likes;
  }

  //Get dislikes
  getdisLikes(){
    return this.dislikes;
  }

  //Edit Song Title
  editSongTitle(newTitle){
    this.title = newTitle;
  }

  //Edit Song Image
  editSongImage(newImage){
    this.image = newImage;
  }
}

//Song Titles Array
const songs = ['cali', 'wake-up', 'general'];

//Keep Track of Songs
let songIndex = 0;

//Update song details
const loadSong = (song) => {
  title.innerText = song;
  audio.src = `../public/music/${song}.mp3`;
  cover.src = `../public/images/${song}.jpeg`;
}

//Initally load song into DOM
loadSong(songs[songIndex]);

const playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play()
}

const pauseSong= () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause()
}

const prevSong = () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1
  } else {
    songIndex--;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
   if (songIndex >= songs.length-1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime/duration) * 100;
  progress.style.width = `${progressPercent}%`
}

const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Song List 

const songList = document.createElement('ul');
songListContainer.appendChild(songList);
songs.forEach((song) => {
  let songListItem = document.createElement('li');
  songListItem.classList.add('song-list-item');
  songList.appendChild(songListItem);

  songListItem.innerHTML = song;
});



//Event Listeners
playBtn.addEventListener('click',() => {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);