function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const btnSun = document.querySelector('.menu__weather-btn_sun');
const btnCloud = document.querySelector('.menu__weather-btn_cloud');
const btnPlay = document.querySelector('.menu__play-btn');
const video = document.querySelector('.video');
const audio = document.querySelector('.audio');
const btnMenu = document.querySelector('.menu__button');
const timer = document.querySelector('.menu__play-timer');
const timerBlock = document.querySelector('.timer');
let currentTime = 10 * 60;
let step = 100 / currentTime;

btnSun.addEventListener('click', function() {
    video.src = "https://harryheman.github.io/meditationApp/src/video/beach.mp4";
    audio.src = "https://harryheman.github.io/meditationApp/src/audio//beach.mp3";
});

btnCloud.addEventListener('click', function() {
    video.src = "https://harryheman.github.io/meditationApp/src/video/rain.mp4";
    audio.src = "https://harryheman.github.io/meditationApp/src/audio/rain.mp3";
});

btnPlay.addEventListener('click', function() {
    if (video.paused) {
        this.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
        video.play();
        audio.play();
        startTimer();
    }
    else {
        this.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
        video.pause();
        audio.pause();
    }
});

btnMenu.addEventListener('click', function(e) {
    let btn = e.target;
    if (!btn.classList.contains('menu__button-btn'))
        return;
    timer.innerHTML = btn.value + ":00";
    currentTime = btn.value * 60;
    step = 100 / currentTime;
});

function startTimer() {
    let time = timer.innerHTML;
    let min = time.split(':')[0];
    let sec = time.split(':')[1];
    if (video.paused)
        return;
    if (sec == 0) {
        if (min == 0) {
            video.pause();
            audio.pause();
        }
        else {
            min--;
            sec = 59;
        }
    }
    else {
        sec--;
    }
    timer.innerHTML = min + ":" + sec;
    let percent = (currentTime - (min * 60 + sec)) / currentTime * 100;

    setProgress(percent);
    setTimeout(startTimer, 1000);
}

function setProgress(percent) {
    const circle = document.querySelector(".progress-ring__circle");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset= circumference;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

setProgress(0);

