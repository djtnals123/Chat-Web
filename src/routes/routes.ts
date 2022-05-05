import os from 'os'
import fs from 'fs'


function init() {
    let routes: Array<string> = fs.readdirSync(__dirname);
    const filename = getFilename(__filename)
    routes = routes.filter(item => item !== filename);
    
    for(let route of routes){
        route = './' + route.replace('.ts', '');
        const { init: initRoute } = require(route);
        initRoute();
    }
}

function getFilename(path: string) {
    let pathArray = undefined;
    const osName: string = os.platform();
    if (osName.indexOf('win') == 0)
        pathArray = path.split("\\");
    else
        pathArray = path.split("/");
    const lastIndex = pathArray.length - 1;
    return pathArray[lastIndex];
}

export {
    init
}