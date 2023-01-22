var timelabel = document.getElementById('timelabel');
var darkmode = document.getElementById('darkmode');
var background = document.getElementsByClassName('background')[0];
var realtime = document.getElementById('realtime');
var clocktime = document.getElementById('clocktime');
var timetable = document.getElementById('timetable');
var shownextclock = document.getElementById('shownextclock');

xchange(0);
function xchange(num) {
    let x;
    if (getparameter('x')) {
        x = parseInt(getparameter('x'));
    } else {
        x = 0;
    }
    x += num;
    setparameter('x', x);
    timelabel.innerHTML = `時鐘將會調${x >= 0 ? '快' : '慢'}${Math.floor(Math.abs(x / 60))}分${Math.abs(x % 60)}秒`
}
if (getparameter('darkmode') == 'true') {
    darkmode.checked = true;
}
darkmodeUpdate();
function darkmodeUpdate() {
    setparameter('darkmode', darkmode.checked);
    background.style['background-color'] = darkmode.checked ? 'black' : 'white';
    for (const element of background.getElementsByTagName('label')) {
        element.style.color = !darkmode.checked ? 'black' : 'white';
    }
    for (const element of background.getElementsByTagName('hr')) {
        element.style.color = !darkmode.checked ? 'black' : "white";
    }
}

checkparameter('timetable', '8:20,9:05,9:15,10:00,10:10,10:55,11:05,11:50,13:10,13:55,14:05,14:50,15:10,15:55');
if (getparameter('timetable') == 'disabled') {
    shownextclock.checked = false;
} else {
    shownextclock.checked = true;
}
timetable.value = getparameter('timetable') == 'disabled' ?
    '8:20,9:05,9:15,10:00,10:10,10:55,11:05,11:50,13:10,13:55,14:05,14:50,15:10,15:55' :
    getparameter('timetable').replaceAll(',', ' ');

setInterval(() => {
    const clockd = new Date(Date.now() + getparameter('x') * 1000);
    const reald = new Date();
    clocktime.innerHTML = `時鐘顯示時間: ${checknumber(clockd.getHours())}:${checknumber(clockd.getMinutes())}:${checknumber(clockd.getSeconds())}`
    realtime.innerHTML = `真實時間: ${checknumber(reald.getHours())}:${checknumber(reald.getMinutes())}:${checknumber(reald.getSeconds())}`
    setparameter('timetable', shownextclock.checked ? timetable.value.replaceAll(' ', ',') : 'disabled');
}, 10);

function checknumber(num) {
    return `${num < 10 ? 0 : ''}${num}`
}
