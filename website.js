const playbtn = document.getElementById('playbtn');
const song = document.getElementById('song')
let isplaying = false;

// ! For play pause button 

playbtn.addEventListener('click', () => {
    if(isplaying == false){
        console.log('play');
        song.play()
        
        playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>';

        isplaying = true;

    }else{
        console.log('pause');
        song.pause()
        
        playbtn.innerHTML='<i class="fa-solid fa-play fa-2x"></i>';

        isplaying = false;

    }
})

// ! For adding songs
const songs = [
        './songs/song1.mp3',
        './songs/song2.mp3',
        './songs/song3.mp3'
];

let currentSong = 0;
function loadSong(index){
    
    song.src = songs[index]
}
loadSong(currentSong)

// ! nextbtn
let nextbtn = document.getElementById('nextbtn')

nextbtn.addEventListener('click', () => {
    if(currentSong == songs.length -1){
        currentSong = 0;
    }else{
        currentSong++;
    }

    loadSong(currentSong)
    
    song.play()
    
} )

// ! previousbtn
let previousbtn = document.getElementById('previousbtn')

previousbtn.addEventListener('click', () => {
    console.log('previousbtn button is worked');
    
    if(currentSong == 0){
        currentSong = songs.length -1
    }else{
        currentSong--;
    }
    loadSong(currentSong)
    song.play()
} )

// ! progress bar
let progress = document.getElementById('progress')

song.addEventListener('timeupdate', () => {
    let progressValue = (song.currentTime / song.duration) * 100
    progress.value = progressValue
})

progress.addEventListener('input', () => {
    let seekTime = (progress.value / 100  ) * song.duration
    song.currentTime = seekTime

})

// ? progressbar timers

let currentTimeText = document.getElementById('currentTimeText');
let durationText = document.getElementById('durationText');

song.addEventListener('timeupdate', () => {
    let minutes = Math.floor(song.currentTime / 60)
    let seconds = Math.floor(song.currentTime % 60)

    let time;
    if(seconds < 10){
        time = `${minutes}:0${seconds}`
    }else{
        time = `${minutes}:${seconds}`
    }

    currentTimeText.textContent = time;

    let Dminutes = Math.floor(song.duration / 60)
    let Dseconds = Math.floor(song.duration % 60)

    let Dtime;
    if(Dseconds < 10){
        Dtime = `${Dminutes}:0${Dseconds}`
    }else{
        Dtime = `${Dminutes}:${Dseconds}`
    }

    durationText.textContent = Dtime
})


