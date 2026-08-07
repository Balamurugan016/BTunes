const playbtn = document.getElementById('playbtn');
const song = document.getElementById('song')
let isplaying = false;

let songTitle = document.getElementById('title')
let songArtist = document.getElementById('artist')
let songCover = document.getElementById('coverImg')

let nextbtn = document.getElementById('nextbtn')
let previousbtn = document.getElementById('previousbtn')

let progress = document.getElementById('progress')

let currentTimeText = document.getElementById('currentTimeText');
let durationText = document.getElementById('durationText');


let volumeCtrl = document.getElementById('volumeCtrl')

let shuffleBtn = document.getElementById('shuffleBtn')

// ! For adding songs
const songs = [
    {
        title:'Pala Palakkura',
        artist:'HarrisJayaraj',
        path:'./songs/PalaPalakkura .mp3',
        cover:'./images/Ayan.jpeg'
    },
    {
        title:'Karuppa Kooda Va',
        artist:'SaiAbhyankkar',
        path:'./songs/KaruppaKodaVa.mp3',
        cover:'./images/karuppu.jpg'
    },
    {
        title:'Kalyani',
        artist:'Shreya Ghoshal',
        path:'./songs/Kalyani.mp3',
        cover:'./images/kalyani.jpeg'
    },
    {
        title:'Aaya Sher',
        artist:'Anirudh Ravichander',
        path:'./songs/Ayasher.mp3',
        cover:'./images/aayasher.jpeg'
    },
    {
        title:'Powerhouse',
        artist:'Anirudh Ravichander',
        path:'./songs/Powerhouse.mp3',
        cover:'./images/powerhouse.jpeg'
    },
    {
        title:'VizhiVeekura',
        artist:'Sai Abhyankkar',
        path:'./songs/VizhiVeekura.mp3',
        cover:'./images/vizhiveekura.jpeg'
    },

];







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


let currentSong = 0;
// ! Title and Artist and LoadSong

function loadSong(index){
    song.src = songs[index].path
    songTitle.textContent = songs[index].title
    songArtist.textContent = songs[index].artist
    songCover.src = songs[index].cover
    progress.value = 0
    console.log(progress.value);
    
}
loadSong(currentSong)

// ! nextbtn

nextbtn.addEventListener('click', () => {
    if(currentSong == songs.length -1){
        currentSong = 0;
    }else{
        currentSong++;
    }

    loadSong(currentSong)
    
    song.play()
    playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
    isplaying = true;
} )

// ! previousbtn

previousbtn.addEventListener('click', () => {
    console.log('previousbtn button is worked');
    
    if(currentSong == 0){
        currentSong = songs.length -1
    }else{
        currentSong--;
    }
    loadSong(currentSong)
    song.play()
    playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
    isplaying = true;
} )

// ! progress bar

song.addEventListener("timeupdate", () => {

    if (!song.duration || isNaN(song.duration)) return;

    let progressValue = (song.currentTime / song.duration) * 100;

    progress.value = progressValue;

});

progress.addEventListener('input', () => {
    let seekTime = (progress.value / 100  ) * song.duration
    song.currentTime = seekTime

})

// ? progressbar timers

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

})

song.addEventListener('loadedmetadata', () => {
    
    let durationMinutes = Math.floor(song.duration / 60)
    let durationSeconds = Math.floor(song.duration % 60)

    let durationTime;
    if(durationSeconds < 10){
        durationTime = `${durationMinutes}:0${durationSeconds}`
    }else{
        durationTime = `${durationMinutes}:${durationSeconds}`
    }

    durationText.textContent = durationTime
})


// ! Auto-play feature
song.addEventListener('ended', () => {
    if(currentSong == songs.length -1){
        currentSong = 0
    }else{
        currentSong++
    }
    loadSong(currentSong)
    song.play()  
})


// ! Volume feature

volumeCtrl.addEventListener('input', () => {
    song.volume = volumeCtrl.value
})


// ! Shuffle feature

shuffleBtn.addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * songs.length)
    while(randomIndex == currentSong){
        randomIndex = Math.floor(Math.random() * songs.length)
    }
    song.pause();
    currentSong = randomIndex;
    loadSong(currentSong)

})

