import data from "../resources/data.js"

document.addEventListener("DOMContentLoaded", (event) => {
    data.buildPage();

    data.listener('addition');
    data.listener('subtraction');
    data.listener('multiplication');
    data.listener('division');
    data.check();

});
