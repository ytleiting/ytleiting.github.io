const fs = require('fs');
const path = require('path');
const showdown = require('showdown')
const converter = new showdown.Converter()
const html = fs.readFileSync(path.join(__dirname, './default.html'), 'utf-8');

fs.readdirSync(path.join(__dirname, './files')).forEach(dir => {
    if (fs.existsSync(path.join(__dirname, `./../${dir}`))) {
        fs.rmdirSync(path.join(__dirname, `./../${dir}`), { recursive: true, force: true });
    }
    fs.mkdirSync(path.join(__dirname, `./../${dir}`))
    fs.readdirSync(path.join(__dirname, `./files/${dir}`)).filter(item => item.endsWith(".md")).forEach(file => {
        const content = converter.makeHtml(fs.readFileSync(path.join(__dirname, `./files/${dir}/${file}`), 'utf-8')).replaceAll('\n', '\n        ');
        fs.mkdirSync(path.join(__dirname, `./../${dir}/${file.split('.')[0]}`));
        fs.writeFileSync(
            path.join(__dirname, `./../${dir}/${file.split('.')[0]}/index.html`),
            html.replace('{title}', file.split('.')[0]).replace('{content}', content)
        );
    });
});

console.log("successful")

let menu = fs.readFileSync(path.join(__dirname, './../menu/menu-static.txt')).toString()
fs.readdirSync(path.join(__dirname, './files')).forEach(dir => {
    let str = dir + '\nlist';
    fs.readdirSync(path.join(__dirname, `./files/${dir}`)).filter(item => item.endsWith(".md")).forEach(item => {
        str += `\n${item.split('.')[0]}:${dir}/${item.split('.')[0]}`
    })
    menu += `\n\n${str}`
});
fs.writeFileSync(path.join(__dirname, './../menu/menu.txt'), menu);