
function setparameter(name, value) {
    if (location.search.indexOf(`${name}=${value}`) > -1) {
        return;
    } else if (location.search.indexOf(`${name}=`) > -1) {
        history.pushState('', '', '?' + location.search.split('?')[1].split('&').map(item => {
            if (item.split('=')[0] == name) {
                return `${name}=${value}`
            } else {
                return item;
            }
        }).join('&'))
    } else {
        history.pushState('', '', location.href + `${location.search ? '&' : '?'}${name}=${value}`);
    }
}
function getparameter(name) {
    if (location.search) {
        if (location.search.split('?')[1].split('&').filter(item => item.split('=')[0] == name).length > 0) {
            return location.search.split('?')[1].split('&').filter(item => item.split('=')[0] == name)[0].split('=')[1]
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}
function checkparameter(name, valueIfNotExist) {
    const result = getparameter(name);
    if (!result) {
        setparameter(name, valueIfNotExist);
    }
    return getparameter(name);
}