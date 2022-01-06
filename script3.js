singleObject = {
    name: "Markus",
    email: "markus.franke84@gmail.com"
}

multipleObjects = {};

function showObjects(){
    console.log('Single', singleObject);
    console.log('Multiple',multipleObjects);
}

function buildObjects(){
    multipleObjects['Markus'] = {
        name: "Markus",
        email: "markus.franke84@gmail.com"
    }
    multipleObjects['Jessica'] = {
        name: "jessica",
        email: "jessica.x@gmail.com"
    }
    multipleObjects['Jessica1'] = {
        name: "Elena",
        email: "elena.x@gmail.com"
    }
}

// Run on build
buildObjects();
showObjects();