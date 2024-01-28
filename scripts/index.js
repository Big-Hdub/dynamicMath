import data from "../resources/data.js"
import { fillPs } from "./helpers.js";

document.addEventListener("DOMContentLoaded", (event) => {
    document.body.append(data.header, data.main, data.footer);
    data.header.append(data.hDiv, data.hNav);
    data.hDiv.append(data.hOptions);
    data.hOptions.append(data.selectO1, data.selectO2, data.selectO3, data.selectO4, data.selectO5, data.selectO6, data.selectO7, data.selectO8, data.selectO9, data.selectO10, data.selectO11, data.selectO12, data.selectO13);
    data.hNav.append(data.navBut1, data.navBut2, data.navBut3, data.navBut4);
    data.main.append(data.equationDivs[0], data.equationDivs[1], data.equationDivs[2], data.equationDivs[3], data.equationDivs[4], data.equationDivs[5], data.equationDivs[6], data.equationDivs[7], data.equationDivs[8], data.equationDivs[9],);
    data.footer.append(data.checkAns);

    data.listener('addition');
    data.listener('subtraction');
    data.listener('multiplication');
    data.listener('division');

});
