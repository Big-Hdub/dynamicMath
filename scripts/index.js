import data from "../resources/data.js"

document.addEventListener("DOMContentLoaded", (event) => {
    document.body.append(data.header, data.main, data.footer);
    data.header.append(data.hDiv, data.hNav);
    data.hDiv.append(data.hOptions);
    data.hOptions.append(data.selectO1, data.selectO2, data.selectO3, data.selectO4, data.selectO5, data.selectO6, data.selectO7, data.selectO8, data.selectO9, data.selectO10, data.selectO11, data.selectO12, data.selectO13);
    data.hNav.append(data.navBut1, data.navBut2, data.navBut3, data.navBut4);
    data.main.append(data.equationDivs[0], data.equationDivs[1], data.equationDivs[2], data.equationDivs[3], data.equationDivs[4], data.equationDivs[5], data.equationDivs[6], data.equationDivs[7], data.equationDivs[8], data.equationDivs[9],);
    data.footer.append(data.checkAns);

    document.getElementById('addition').addEventListener('click', function () {

        switch (data.hOptions.value) {
            case 'o1': data.mathCreator(1, "addition"); break;
            case 'o2': data.mathCreator(2, "addition"); break;
            case 'o3': data.mathCreator(3, "addition"); break;
            case 'o4': data.mathCreator(4, "addition"); break;
            case 'o5': data.mathCreator(5, "addition"); break;
            case 'o6': data.mathCreator(6, "addition"); break;
            case 'o7': data.mathCreator(7, "addition"); break;
            case 'o8': data.mathCreator(8, "addition"); break;
            case 'o9': data.mathCreator(9, "addition"); break;
            case 'o10': data.mathCreator(10, "addition"); break;
            case 'o11': data.mathCreator(20, "addition"); break;
            case 'o12': data.mathCreator(100, "addition"); break;
            case 'o13': data.mathCreator(1000, "addition"); break;
            default: console.log("Make a selection please!")
        }

    });
});
