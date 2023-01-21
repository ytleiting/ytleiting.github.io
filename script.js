
/*
    生成Menu
*/
[
    ['首頁','/'],
    ['Github','https://github.com/ytleiting'],
    ['YT新頻道','https://youtube.com/@ytleiting'],
    ['YT舊頻道','https://youtube.com/@LeiTing']
].forEach((item) => {
    const line = document.createElement("li");
    const element = document.getElementById("menu-ul");
    const first = document.getElementById("menu-first");
    if (item[1].startsWith('/')) {
        line.innerHTML = `<li><a href="${item[1]}">${item[0]}</a></li>`;
    } else {
        line.innerHTML = `<li><a onclick="window.open('${item[1]}')">${item[0]}</a></li>`;
    }
    element.insertBefore(line, first);
})
document.getElementById("menu-ul").removeChild(document.getElementById("menu-first"));

/*
    Menu按鈕
*/
const menuButton = document.getElementById("menu-button-div");
const menu = document.getElementById("menu");

var menuWidth = window.innerHeight * 0.1 + window.window.innerWidth * 0.15;

menu.style.width = `${menuWidth}px`
menu.style.right = `-${menuWidth}px`
addEventListener("resize", (event) => {
    menuWidth = window.innerHeight * 0.1 + window.window.innerWidth * 0.15
});
menuButton.onclick = () => {
    if (menu.style.right == `-${menuWidth}px`) {
        menu.style.right = "0";
        menuButton.getElementsByTagName('img').item(0).src = "media/menu-cancel.png"
    } else {
        menu.style.right = `-${menuWidth}px`;
        menuButton.getElementsByTagName('img').item(0).src = "media/menu-button.png"
    }
}