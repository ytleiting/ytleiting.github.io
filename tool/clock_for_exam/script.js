var clocktext = document.getElementById('clocktext');
var nextclock = document.getElementById('nextclock');
var x = parseInt(checkparameter('x', 0));
var darkmode = checkparameter('darkmode', 'false');
var timetable = checkparameter('timetable', 'disabled');

if (darkmode == 'true') {
    document.getElementsByClassName('background')[0].style['background-color'] = darkmode == 'true' ? 'black' : 'white';
    clocktext.style.color = !(darkmode == 'true') ? 'black' : 'white';
    nextclock.style.color = !(darkmode == 'true') ? 'black' : 'white';
}
if (timetable == 'disabled') {
    nextclock.style.visibility = "hidden"
}
function update() {
    const d = new Date(Date.now() + x * 1000);
    clocktext.innerHTML = `${checknumber(d.getHours())}:${checknumber(d.getMinutes())}:${checknumber(d.getSeconds())}`
    if (timetable != 'disabled') {
        const after = timetable.split(',').map(item => parseInt((item.split(':')[0]) * 60 + parseInt(item.split(':')[1])) - (d.getHours() * 60 + d.getMinutes())).filter(item => item >= 1);
        if (after.length == 0) {
            return nextclock.innerHTML = '不在上課時間';
        }
        const min = after[0] - 1;
        nextclock.innerHTML = `距離下次打鐘還有${min}分${60 - d.getSeconds()}秒`
        if (min <= 5) {
            nextclock.style.color = 'red';
        } else {
            nextclock.style.color = !(darkmode == 'true') ? 'black' : 'white';
        }
    }
}
setInterval(update, 500);
update();
function checknumber(num) {
    return `${num < 10 ? 0 : ''}${num}`
}