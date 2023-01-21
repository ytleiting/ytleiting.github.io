var mode = 1;
// 1: 加密 
// 2:解密

var input = document.getElementById('input');
var output = document.getElementById('output');
var passwordinput = document.getElementById('passwordinput');
var encryptBtn = document.getElementById('encryptBtn');
var decryptBtn = document.getElementById('decryptBtn');
var copyBtn = document.getElementById('copyBtn');
var randomBtn = document.getElementById('randomBtn');
const defaultpassword = '&ab)Z{${Q$m>?PG^.RiW';
setInterval(() => {
    if (passwordinput.value.length > 0) {
        password = passwordinput.value;
    } else {
        password = defaultpassword;
    }
    if (mode == 1) {
        const password_k_to_z = password.split('').map(p => String.fromCharCode((p.charCodeAt() % 15) + 97 + 11)).join('')
        output.value = encodeURIComponent(input.value).split('').map((item, index) => {
            code = item.charCodeAt()
            return (
                code.toString().split('').map((c) =>
                    String.fromCharCode(97 + (parseInt(c) + password.split('')[index % password.split('').length].charCodeAt()) % 10)
                ).join('') + password_k_to_z[index % password_k_to_z.length]
            )
        }).join('');
    } else {
        output.value = decodeURIComponent(input.value.split(/[klmnopqrstuvwxyz]/).map((value, index) => {
            let theNumber = '';
            value.split('').forEach((c) => {
                theNumber += ((parseInt(c.charCodeAt() - 97) - password.split('')[index % password.split('').length].charCodeAt() % 10) + 10) % 10 + ''
            })
            return String.fromCharCode(parseInt(theNumber));
        }).join(''));
    }
}, 100)
encryptBtn.onclick = () => {
    encryptBtn.disabled = true;
    decryptBtn.disabled = false;
    mode = 1;
}
decryptBtn.onclick = () => {
    encryptBtn.disabled = false;
    decryptBtn.disabled = true;
    mode = 2;
}
copyBtn.onclick = () => {
    output.select();
    document.execCommand('copy');
}
randomBtn.onclick = () => {
    passwordinput.value = '____________________'.split('').map(() => String.fromCharCode(Math.floor(Math.random() * 94) + 33)).join('');
}