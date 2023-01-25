var video = document.getElementById("video");
var button = document.getElementById("button");
button.addEventListener('click', (event) => {
    video.play();
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
});
