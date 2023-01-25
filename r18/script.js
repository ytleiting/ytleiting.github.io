var video = document.getElementById("video");
var yes = document.getElementById("yes");
var no = document.getElementById("no");
yes.addEventListener('click', (event) => {
    video.play();
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
});
no.addEventListener('click', (event) => {
    location.href = 'https://www.i-gamer.net/';
})