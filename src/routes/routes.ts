
import fs from 'fs'


function init() {
    let routes: Array<string> = fs.readdirSync(__dirname);
    routes = routes.filter(item => item !== getFilename(__filename));
    
    for(let route of routes){
        route = './' + route.replace('.ts', '');
        const { init: initRoute } = require(route);
        initRoute();
    }
}

function getFilename(path: string) {
    const pathArray = path.split("\\");
    const lastIndex = pathArray.length - 1;
    return pathArray[lastIndex];
}

export {
    init
}