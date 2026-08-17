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

let repeatBtn = document.getElementById('repeatBtn')

let muteBtn = document.getElementById('muteBtn')

let likeBtn = document.getElementById('likeBtn')


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


// ! API integration

let getSongs = async () => {
    let response = await fetch('https://api.audius.co/v1/tracks/search?query=electronic')
    let details = await response.json()

    details.data.forEach(element => {
        let apiSong = {
            title: element.title,
            artist: element.user.name,
            cover: element.artwork['1000x1000'],
            id: element.id
        }
        songs.push(apiSong)
    });
}
getSongs()

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

async function loadSong(index){
console.log("Loading song:", songs[index].title);
try{
 if(songs[index].id){
        console.log('api song');
    
    let response = await fetch(`https://api.audius.co/v1/tracks/${songs[index].id}/stream`)
    
        song.src = response.url

}else{
        console.log('local song');
        song.src = songs[index].path
        
    }
    songTitle.textContent = songs[index].title
    songArtist.textContent = songs[index].artist
    songCover.src = songs[index].cover
    progress.value = 0
    console.log(progress.value);
} catch(error){
    console.log("Failed to load song: ", error);
    
}
    
}
loadSong(currentSong)


// ! nextbtn

nextbtn.addEventListener('click', async () => {
    if(currentSong == songs.length -1){
        currentSong = 0;
    }else{
        currentSong++;
    }

    await loadSong(currentSong)
    
    song.play()
    playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
    isplaying = true;
} )

// ! previousbtn

previousbtn.addEventListener('click', async () => {
    console.log('previousbtn button is worked');
    
    if(currentSong == 0){
        currentSong = songs.length -1
    }else{
        currentSong--;
    }
    await loadSong(currentSong)
    song.play()
    playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>'
    isplaying = true;
} )

// ! progress bar

song.addEventListener('timeupdate', () => {
    if(!song.duration || isNaN(song.duration)){
        return;
    }
    let progressValue = (song.currentTime / song.duration) * 100;

    progress.value = progressValue
})


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
// song.addEventListener('ended', () => {
//     if(currentSong == songs.length -1){
//         currentSong = 0
//     }else{
//         currentSong++
//     }
//     loadSong(currentSong)
//     song.play()  
// })


// ! Volume feature

volumeCtrl.addEventListener('input', () => {
    song.volume = volumeCtrl.value
    previousVolume = song.volume

    if(song.volume === 0){

        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark fa-2x"></i>'

    }else if(song.volume < 0.60 ){

        muteBtn.innerHTML = '<i class="fa-solid fa-volume-low fa-2x"></i>'

    }else{

        muteBtn.innerHTML = '<i class="fa-solid fa-volume-high fa-2x"></i>'

    }
})

// ! Mute and Unmute feature

let previousVolume = song.volume

muteBtn.addEventListener('click', () => {
    if(song.volume > 0 ){

        song.volume = 0
        volumeCtrl.value = 0
        muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark fa-2x"></i>'

    }else{

        song.volume = previousVolume
        volumeCtrl.value = previousVolume
         if(song.volume > 0.60){
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-high fa-2x"></i>'
        }else{
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-low fa-2x"></i>'
        }

    }
})

// ! Shuffle feature

shuffleBtn.addEventListener('click', () => {
    let randomIndex = Math.floor(Math.random() * songs.length)
    let wasPlaying = isplaying
    while(randomIndex == currentSong){
        randomIndex = Math.floor(Math.random() * songs.length)
    }
    currentSong = randomIndex;
    loadSong(currentSong)
    if(wasPlaying){

        song.play();
        playbtn.innerHTML='<i class="fa-solid fa-pause fa-2x"></i>';
    
    }else{

        song.pause()
        playbtn.innerHTML='<i class="fa-solid fa-play fa-2x"></i>';

    }
})

// ! Repeat feature

let repeatMode = 'off'

repeatBtn.addEventListener('click', () => {

    if(repeatMode === 'off'){
        repeatMode = 'all'
        repeatBtn.style.color = '#C4B5FD'

    }else if(repeatMode === 'all'){
        repeatMode = 'one'
        repeatBtn.style.color = '#6C29D5'
    }else{
        repeatMode = 'off'
        repeatBtn.style.color = 'white'
    }
    console.log(repeatMode);
})

song.addEventListener('ended', () => {
    if(repeatMode === 'one'){
        song.currentTime = 0;
        song.play()
    }else if (repeatMode === 'all'){
        if(currentSong == songs.length -1){
            currentSong = 0;        
        }else{
            currentSong++;
        }
        loadSong(currentSong);
        song.play()
    }else{
        if(currentSong === songs.length -1){
            playbtn.innerHTML='<i class="fa-solid fa-play fa-2x"></i>';
            isplaying = false;
            return;
        }else{
            currentSong++;
            loadSong(currentSong)
            song.play()
        }
    }
})

// ! Like Button feature

likeBtn.addEventListener('click', () => {
    if(likeBtn.style.color === 'red'){
        likeBtn.style.color = 'white'
    }else{
        likeBtn.style.color = 'red'
    }
})
