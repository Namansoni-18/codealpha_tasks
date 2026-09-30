/* =========================================
   MUSIC PLAYER
========================================= */


/* =========================================
   SONG DATA
========================================= */

const songs = [

    {
        id: 1,
        title: "Dreamscape",
        artist: "SoundHelix",
        album: "Dream Collection",
        cover: "https://picsum.photos/id/1011/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        id: 2,
        title: "Midnight Drive",
        artist: "SoundHelix",
        album: "Night Drive",
        cover: "https://picsum.photos/id/1015/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        id: 3,
        title: "Ocean Waves",
        artist: "SoundHelix",
        album: "Blue Horizon",
        cover: "https://picsum.photos/id/1016/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        id: 4,
        title: "Lost In The City",
        artist: "SoundHelix",
        album: "Urban Lights",
        cover: "https://picsum.photos/id/1019/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        id: 5,
        title: "Golden Morning",
        artist: "SoundHelix",
        album: "Morning Vibes",
        cover: "https://picsum.photos/id/1020/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },

    {
        id: 6,
        title: "Night Sky",
        artist: "SoundHelix",
        album: "Stars",
        cover: "https://picsum.photos/id/1024/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    {
        id: 7,
        title: "Chill Evening",
        artist: "SoundHelix",
        album: "Relax",
        cover: "https://picsum.photos/id/1025/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },

    {
        id: 8,
        title: "Summer Journey",
        artist: "SoundHelix",
        album: "Travel",
        cover: "https://picsum.photos/id/1035/600/600",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }

];


/* =========================================
   HTML ELEMENTS
========================================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playButton =
    document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const shuffleButton =
    document.getElementById("shuffleButton");

const shuffleHeader =
    document.getElementById("shuffleHeader");

const repeatButton =
    document.getElementById("repeatButton");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const muteButton =
    document.getElementById("muteButton");

const autoplayButton =
    document.getElementById("autoplayButton");

const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");

const albumImage =
    document.getElementById("albumImage");

const albumArt =
    document.getElementById("albumArt");

const currentTime =
    document.getElementById("currentTime");

const totalTime =
    document.getElementById("totalTime");

const favoriteMain =
    document.getElementById("favoriteMain");

const playlist =
    document.getElementById("playlist");

const searchInput =
    document.getElementById("searchInput");

const emptyPlaylist =
    document.getElementById("emptyPlaylist");

const playlistSubtitle =
    document.getElementById("playlistSubtitle");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const allSongCount =
    document.getElementById("allSongCount");

const clearSearchButton =
    document.getElementById(
        "clearSearchButton"
    );

const favoritesButton =
    document.getElementById(
        "favoritesButton"
    );

const recentButton =
    document.getElementById(
        "recentButton"
    );

const allSongsButton =
    document.getElementById(
        "allSongsButton"
    );

const playlistButton =
    document.getElementById(
        "playlistButton"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );


/* =========================================
   VARIABLES
========================================= */

let currentSongIndex = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;

let isAutoplay = true;

let currentMode = "all";

let favorites =
    JSON.parse(
        localStorage.getItem(
            "musicFavorites"
        )
    ) || [];

let recentlyPlayed =
    JSON.parse(
        localStorage.getItem(
            "recentlyPlayed"
        )
    ) || [];


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        remainingSeconds
            .toString()
            .padStart(2, "0")
    );

}


/* =========================================
   GET CURRENT SONG
========================================= */

function getCurrentSong() {

    return songs[currentSongIndex];

}


/* =========================================
   LOAD SONG
========================================= */

function loadSong(
    index,
    autoPlay = false
) {

    if (
        index < 0 ||
        index >= songs.length
    ) {

        return;

    }


    currentSongIndex = index;


    const song =
        getCurrentSong();


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    albumImage.src =
        song.cover;


    audioPlayer.src =
        song.audio;


    audioPlayer.load();


    currentTime.textContent =
        "0:00";


    totalTime.textContent =
        "0:00";


    progressBar.value = 0;


    updateFavoriteButton();

    renderPlaylist();


    if (autoPlay) {

        playSong();

    }

}


/* =========================================
   PLAY
========================================= */

function playSong() {

    audioPlayer
        .play()
        .then(function () {

            isPlaying = true;

            updatePlayButton();

            albumArt.classList.add(
                "playing"
            );

            addToRecentlyPlayed(
                getCurrentSong().id
            );

        })
        .catch(function (error) {

            console.log(
                "Audio could not play:",
                error
            );

        });

}


/* =========================================
   PAUSE
========================================= */

function pauseSong() {

    audioPlayer.pause();

    isPlaying = false;

    updatePlayButton();

    albumArt.classList.remove(
        "playing"
    );

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener(
    "click",
    function () {

        if (isPlaying) {

            pauseSong();

        }

        else {

            playSong();

        }

    }
);


/* =========================================
   UPDATE PLAY BUTTON
========================================= */

function updatePlayButton() {

    if (isPlaying) {

        playButton.textContent =
            "❚❚";

    }

    else {

        playButton.textContent =
            "▶";

    }

}


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    let nextIndex;


    if (isShuffle) {

        nextIndex =
            Math.floor(
                Math.random() *
                songs.length
            );


        if (
            songs.length > 1 &&
            nextIndex === currentSongIndex
        ) {

            nextIndex++;

            if (
                nextIndex >=
                songs.length
            ) {

                nextIndex = 0;

            }

        }

    }

    else {

        nextIndex =
            currentSongIndex + 1;


        if (
            nextIndex >=
            songs.length
        ) {

            nextIndex = 0;

        }

    }


    loadSong(
        nextIndex,
        true
    );

}


/* =========================================
   PREVIOUS SONG
========================================= */

function previousSong() {

    let previousIndex =
        currentSongIndex - 1;


    if (previousIndex < 0) {

        previousIndex =
            songs.length - 1;

    }


    loadSong(
        previousIndex,
        true
    );

}


/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener(
    "click",
    nextSong
);


/* =========================================
   PREVIOUS BUTTON
========================================= */

previousButton.addEventListener(
    "click",
    previousSong
);


/* =========================================
   PROGRESS UPDATE
========================================= */

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (
            audioPlayer.duration
        ) {

            const percentage =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;


            progressBar.value =
                percentage;

        }


        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


/* =========================================
   DURATION
========================================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        totalTime.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


/* =========================================
   PROGRESS BAR
========================================= */

progressBar.addEventListener(
    "input",
    function () {

        if (
            audioPlayer.duration
        ) {

            const newTime =
                (
                    progressBar.value /
                    100
                ) *
                audioPlayer.duration;


            audioPlayer.currentTime =
                newTime;

        }

    }
);


/* =========================================
   VOLUME
========================================= */

audioPlayer.volume = 0.8;


volumeBar.addEventListener(
    "input",
    function () {

        audioPlayer.volume =
            volumeBar.value;


        if (
            audioPlayer.volume === 0
        ) {

            muteButton.textContent =
                "🔇";

        }

        else {

            muteButton.textContent =
                "🔊";

        }

    }
);


/* =========================================
   MUTE
========================================= */

muteButton.addEventListener(
    "click",
    function () {

        if (
            audioPlayer.volume > 0
        ) {

            audioPlayer.dataset.oldVolume =
                audioPlayer.volume;

            audioPlayer.volume = 0;

            volumeBar.value = 0;

            muteButton.textContent =
                "🔇";

        }

        else {

            const oldVolume =
                audioPlayer.dataset.oldVolume ||
                0.8;


            audioPlayer.volume =
                oldVolume;

            volumeBar.value =
                oldVolume;

            muteButton.textContent =
                "🔊";

        }

    }
);


/* =========================================
   SHUFFLE
========================================= */

function toggleShuffle() {

    isShuffle = !isShuffle;


    shuffleButton.classList.toggle(
        "active",
        isShuffle
    );


    shuffleHeader.classList.toggle(
        "active",
        isShuffle
    );

}


shuffleButton.addEventListener(
    "click",
    toggleShuffle
);


shuffleHeader.addEventListener(
    "click",
    toggleShuffle
);


/* =========================================
   REPEAT
========================================= */

repeatButton.addEventListener(
    "click",
    function () {

        isRepeat = !isRepeat;


        repeatButton.classList.toggle(
            "active",
            isRepeat
        );

    }
);


/* =========================================
   AUTOPLAY
========================================= */

autoplayButton.addEventListener(
    "click",
    function () {

        isAutoplay =
            !isAutoplay;


        autoplayButton.classList.toggle(
            "active",
            isAutoplay
        );

    }
);


/* =========================================
   SONG ENDED
========================================= */

audioPlayer.addEventListener(
    "ended",
    function () {

        if (isRepeat) {

            audioPlayer.currentTime =
                0;

            playSong();

            return;

        }


        if (isAutoplay) {

            nextSong();

        }

        else {

            pauseSong();

        }

    }
);


/* =========================================
   FAVORITES
========================================= */

function isFavorite(id) {

    return favorites.includes(id);

}


function updateFavoriteButton() {

    const song =
        getCurrentSong();


    if (
        isFavorite(song.id)
    ) {

        favoriteMain.textContent =
            "❤️";

        favoriteMain.classList.add(
            "active"
        );

    }

    else {

        favoriteMain.textContent =
            "♡";

        favoriteMain.classList.remove(
            "active"
        );

    }

}


function toggleFavorite(id) {

    if (
        isFavorite(id)
    ) {

        favorites =
            favorites.filter(
                function (songId) {

                    return songId !== id;

                }
            );

    }

    else {

        favorites.push(id);

    }


    localStorage.setItem(
        "musicFavorites",
        JSON.stringify(favorites)
    );


    updateFavoriteButton();

    renderPlaylist();

}


favoriteMain.addEventListener(
    "click",
    function () {

        toggleFavorite(
            getCurrentSong().id
        );

    }
);


/* =========================================
   RECENTLY PLAYED
========================================= */

function addToRecentlyPlayed(id) {

    recentlyPlayed =
        recentlyPlayed.filter(
            function (songId) {

                return songId !== id;

            }
        );


    recentlyPlayed.unshift(id);


    if (
        recentlyPlayed.length > 10
    ) {

        recentlyPlayed =
            recentlyPlayed.slice(0, 10);

    }


    localStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(
            recentlyPlayed
        )
    );

}


/* =========================================
   GET DISPLAYED SONGS
========================================= */

function getDisplayedSongs() {

    let displayedSongs =
        [...songs];


    if (
        currentMode === "favorites"
    ) {

        displayedSongs =
            songs.filter(
                function (song) {

                    return isFavorite(
                        song.id
                    );

                }
            );

    }


    if (
        currentMode === "recent"
    ) {

        displayedSongs =
            recentlyPlayed
                .map(
                    function (id) {

                        return songs.find(
                            function (song) {

                                return (
                                    song.id === id
                                );

                            }
                        );

                    }
                )
                .filter(Boolean);

    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    if (search !== "") {

        displayedSongs =
            displayedSongs.filter(
                function (song) {

                    return (
                        song.title
                            .toLowerCase()
                            .includes(search) ||

                        song.artist
                            .toLowerCase()
                            .includes(search)
                    );

                }
            );

    }


    return displayedSongs;

}


/* =========================================
   RENDER PLAYLIST
========================================= */

function renderPlaylist() {

    playlist.innerHTML = "";


    const displayedSongs =
        getDisplayedSongs();


    playlistSubtitle.textContent =
        displayedSongs.length +
        (
            displayedSongs.length === 1
                ? " song"
                : " songs"
        );


    if (
        displayedSongs.length === 0
    ) {

        emptyPlaylist.classList.add(
            "show"
        );

    }

    else {

        emptyPlaylist.classList.remove(
            "show"
        );

    }


    displayedSongs.forEach(
        function (song, index) {

            const originalIndex =
                songs.findIndex(
                    function (item) {

                        return (
                            item.id === song.id
                        );

                    }
                );


            createSongRow(
                song,
                index,
                originalIndex
            );

        }
    );

}


/* =========================================
   CREATE SONG ROW
========================================= */

function createSongRow(
    song,
    displayIndex,
    originalIndex
) {

    const row =
        document.createElement("div");

    row.className =
        "song-row";


    if (
        originalIndex ===
        currentSongIndex
    ) {

        row.classList.add(
            "active"
        );

    }


    /* SONG NUMBER */

    const number =
        document.createElement("div");

    number.className =
        "song-number";


    if (
        originalIndex ===
        currentSongIndex &&
        isPlaying
    ) {

        number.innerHTML =
            "♫";

        number.classList.add(
            "playing-icon"
        );

    }

    else {

        number.textContent =
            displayIndex + 1;

    }


    row.appendChild(number);


    /* COVER */

    const cover =
        document.createElement("img");

    cover.className =
        "song-cover";

    cover.src =
        song.cover;

    cover.alt =
        song.title;


    row.appendChild(cover);


    /* INFO */

    const info =
        document.createElement("div");

    info.className =
        "song-row-info";


    const title =
        document.createElement("div");

    title.className =
        "song-row-title";

    title.textContent =
        song.title;


    const artist =
        document.createElement("div");

    artist.className =
        "song-row-artist";

    artist.textContent =
        song.artist;


    info.appendChild(title);

    info.appendChild(artist);

    row.appendChild(info);


    /* DURATION */

    const duration =
        document.createElement("div");

    duration.className =
        "song-duration";

    duration.textContent =
        "--:--";


    row.appendChild(duration);


    /* FAVORITE */

    const heart =
        document.createElement("button");

    heart.className =
        "song-heart";


    heart.textContent =
        isFavorite(song.id)
            ? "❤️"
            : "♡";


    if (
        isFavorite(song.id)
    ) {

        heart.classList.add(
            "active"
        );

    }


    heart.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleFavorite(
                song.id
            );

        }
    );


    row.appendChild(heart);


    /* CLICK SONG */

    row.addEventListener(
        "click",
        function () {

            loadSong(
                originalIndex,
                true
            );

        }
    );


    playlist.appendChild(row);


    /* GET DURATION */

    const tempAudio =
        document.createElement("audio");

    tempAudio.src =
        song.audio;

    tempAudio.preload =
        "metadata";


    tempAudio.addEventListener(
        "loadedmetadata",
        function () {

            duration.textContent =
                formatTime(
                    tempAudio.duration
                );

        }
    );

}


/* =========================================
   SIDEBAR BUTTONS
========================================= */

function setActiveMenu(button) {

    document
        .querySelectorAll(".menu-button")
        .forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


    button.classList.add(
        "active"
    );

}


allSongsButton.addEventListener(
    "click",
    function () {

        currentMode = "all";

        pageTitle.textContent =
            "All Songs";

        pageSubtitle.textContent =
            "Listen to your favorite music";

        setActiveMenu(
            allSongsButton
        );

        renderPlaylist();

    }
);


favoritesButton.addEventListener(
    "click",
    function () {

        currentMode =
            "favorites";

        pageTitle.textContent =
            "Favorites";

        pageSubtitle.textContent =
            "Your favorite songs";

        setActiveMenu(
            favoritesButton
        );

        renderPlaylist();

    }
);


recentButton.addEventListener(
    "click",
    function () {

        currentMode =
            "recent";

        pageTitle.textContent =
            "Recently Played";

        pageSubtitle.textContent =
            "Songs you listened to recently";

        setActiveMenu(
            recentButton
        );

        renderPlaylist();

    }
);


playlistButton.addEventListener(
    "click",
    function () {

        currentMode = "all";

        pageTitle.textContent =
            "My Playlist";

        pageSubtitle.textContent =
            "Your complete music collection";

        setActiveMenu(
            playlistButton
        );

        renderPlaylist();

    }
);


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    function () {

        renderPlaylist();

    }
);


/* =========================================
   CLEAR SEARCH
========================================= */

clearSearchButton.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        renderPlaylist();

        searchInput.focus();

    }
);


/* =========================================
   THEME
========================================= */

let lightMode =
    localStorage.getItem(
        "musicLightMode"
    ) === "true";


function updateTheme() {

    if (lightMode) {

        document.body.classList.add(
            "light-mode"
        );

        themeButton.textContent =
            "☀️";

    }

    else {

        document.body.classList.remove(
            "light-mode"
        );

        themeButton.textContent =
            "🌙";

    }

}


themeButton.addEventListener(
    "click",
    function () {

        lightMode =
            !lightMode;


        localStorage.setItem(
            "musicLightMode",
            lightMode
        );


        updateTheme();

    }
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.target.tagName ===
            "INPUT"
        ) {

            return;

        }


        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            playButton.click();

        }


        if (
            event.code ===
            "ArrowRight"
        ) {

            nextSong();

        }


        if (
            event.code ===
            "ArrowLeft"
        ) {

            previousSong();

        }

    }
);


/* =========================================
   SONG COUNT
========================================= */

allSongCount.textContent =
    songs.length;


/* =========================================
   INITIAL LOAD
========================================= */

updateTheme();

loadSong(0, false);

renderPlaylist();