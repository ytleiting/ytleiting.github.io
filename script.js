
const menuButton = document.getElementById("menu-button-div");
const menu = document.getElementById("menu");
const menu_ul = document.getElementById("menu-ul");
const menu2 = document.getElementById("menu2");
const menu2_ul = document.getElementById('menu2-ul');

/*
    生成Menu
*/
var rawFile = new XMLHttpRequest();
rawFile.open("GET", 'menu.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            allText.split('\n\n').forEach((item) => {
                const line = document.createElement("li");
                if (item.split('\n')[1] == 'list') {
                    line.innerHTML = `<li><a onclick="openlist('${item.split('\n')[0]}','${item.split('\n').filter((value, index) => index > 1).join(',')}')">${item.split('\n')[0]}</a></li>`;
                } else {
                    if (item.split('\n')[1].startsWith('/')) {
                        line.innerHTML = `<li><a href="${item.split('\n')[1]}">${item.split('\n')[0]}</a></li>`;
                    } else {
                        line.innerHTML = `<li><a onclick="window.open('${item.split('\n')[1]}')">${item.split('\n')[0]}</a></li>`;
                    }
                }
                menu_ul.appendChild(line);
            })
            document.getElementById("menu-ul").removeChild(document.getElementById("menu-first"));
        }
    }
}
rawFile.send(null);

/*
    menu的大小設定
*/
var menu2size = 1.2;
var menuWidth;
function updateMenuWidth() {
    menuWidth = window.innerHeight * 0.1 + window.window.innerWidth * 0.15
    menu.style.width = `${menuWidth}px`
    menu2.style.width = `${menuWidth * menu2size}px`
}
menu.style.right = `-${menuWidth}px`
menu2.style.right = `-${menuWidth * menu2size}px`

addEventListener("resize", updateMenuWidth());
menuButton.onclick = () => {
    if (menu.style.right == `-${menuWidth}px`) {
        menu.style.right = '0px';
        menuButton.getElementsByTagName('img').item(0).src = "media/menu-cancel.png"
    } else {
        menu2.style.right = `-${menuWidth * menu2size}px`;
        menu.style.right = `-${menuWidth}px`;
        menuButton.getElementsByTagName('img').item(0).src = "media/menu-button.png"
    }
}

/*
    menu裡的list開啟
*/
function openlist(name, list) {


    menu2_ul.innerHTML = '';
    list.split(',').forEach(item => {
        const line = document.createElement('li');
        line.innerHTML = `<li><a href="${item.split(':')[1]}">${item.split(':')[0]}</a></li>`;;
        menu2_ul.appendChild(line)
    })

    if (menu2.style.right == `${menuWidth}px`) {
        menu2.style.right = `-${menuWidth}px`;
        for (const line of menu_ul.children) {
            if (line.firstChild.textContent == `> ${name}`) {
                line.firstChild.innerHTML = line.firstChild.innerHTML.replace(`&gt; ${name}`, `${name}`)
            }
        }
    } else {
        menu2.style.right = `${menuWidth}px`;
        for (const line of menu_ul.children) {
            if (line.firstChild.textContent == name) {
                line.firstChild.innerHTML = line.firstChild.innerHTML.replace(`>${name}<`, `>&gt; ${name}<`)
            }
        }
    }
}
