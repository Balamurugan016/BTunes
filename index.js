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
    {
        title:'Pala Palakkura',
        artist:'HarrisJayaraj',
        path:'./songs/song1.mp3',
        cover:'./images/Ayan.jpeg'
    },
    {
        title:'Karuppa Kooda Va',
        artist:'SaiAbhyankkar',
        path:'./songs/song2.mp3',
        cover:'./images/karuppu.jpg'
    },
    {
        title:'Kalyani',
        artist:'Shreya Ghoshal',
        path:'./songs/song3.mp3',
        cover:'./images/kalyani.jpeg'
    },
    {
        title:'Aaya Sher',
        artist:'Anirudh Ravichander',
        path:'./songs/song4.mp3',
        cover:'./images/aayasher.jpeg'
    },
    {
        title:'Powerhouse',
        artist:'Anirudh Ravichander',
        path:'./songs/song5.mp3',
        cover:'./images/powerhouse.jpeg'
    },

];



let currentSong = 0;
// ! Title and Artist

let songTitle = document.getElementById('title')
let songArtist = document.getElementById('artist')
let songCover = document.getElementById('coverImg')

function loadSong(index){
    song.src = songs[index].path
    songTitle.textContent = songs[index].title
    songArtist.textContent = songs[index].artist
    songCover.src = songs[index].cover
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
     laybtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
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
     playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
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

let volumeCtrl = document.getElementById('volumeCtrl')

volumeCtrl.addEventListener('input', () => {
    song.volume = volumeCtrl.value
})


// ! Shuffle feature
let shuffleBtn = document.getElementById('shuffleBtn')

shuffleBtn.addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * songs.length)
    while(currentSong == randomIndex){
        randomIndex = Math.floor(Math.random() * songs.length)
    }
    currentSong = randomIndex
    loadSong(currentSong)
    song.pause()
    playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
})
