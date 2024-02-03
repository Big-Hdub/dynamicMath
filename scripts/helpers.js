import data from "../resources/data.js";

export const cEl = (tag, att, text) => {
    const el = document.createElement(tag);
    if (att.length) {
        att.forEach(a => {
            el.setAttribute(a[0], a[1]);
        });
    };
    if (text) el.textContent = text;
    return el;
};

export const equationMaker = (num, fields) => {
    const arr = new Array(num);
    for (let i = 0; i < arr.length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "eqContainers");
        div.setAttribute("id", `N${i}`);
        const p1 = document.createElement("p");
        p1.setAttribute("id", `N${i}P1`);
        const p2 = document.createElement("p");
        p2.setAttribute("id", `N${i}P2`);
        const answerDiv = document.createElement("div");
        answerDiv.setAttribute("class", "answerDivs")
        for (let j = 0; j < fields; j++) {
            answerDiv.innerHTML += `<input type="text" class="answerBoxes" id="ans${i}${j}" name="ans${i}${j}" required/>`;
        }
        div.append(p1, p2, answerDiv);
        arr[i] = div;
    }
    return arr;
};

const randomInt = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);

export const fillPs = (ps, nums) => {
    ps[0].innerText = nums[0]
    ps[1].innerHTML = `<span>${nums[2]}</span><span>${nums[1]}</span>`
}

const op = {
    addition: "&plus;",
    subtraction: "&minus;",
    multiplication: "&times;",
    division: "&divide;"
}

export const mathCreator = (value, operation) => {
    let needRandom = true;
    let max = 1001;
    if (value <= 10) {
        max = 11;
        needRandom = false;
    } else if (value <= 20) max = 21;
    else if (value <= 100) max = 101;
    const res = [value, 0, op[operation]];
    switch (operation) {
        case "addition":
            if (needRandom) {
                res[0] = randomInt(max);
                res[1] = randomInt(max);
            } else if (randomInt(2) >= 1) {
                res[1] = randomInt(max);
            } else {
                res[0] = randomInt(max);
                res[1] = value;
            };
            break;
        case "subtraction":
            if (needRandom) {
                let num1, num2;
                if (max < 1000) {
                    num1 = randomInt(max * 2);
                    num2 = randomInt(max * 2);
                } else {
                    num1 = randomInt(max);
                    num2 = randomInt(max);
                }
                res[0] = Math.max(num1, num2);
                res[1] = Math.min(num1, num2);
            } else {
                res[0] = randomInt(max * 2, value);
                res[1] = value;
            }
            break;
        case "multiplication":
            if (needRandom) {
                if (max <= 101) {
                    res[0] = randomInt(11);
                    res[1] = randomInt(11);
                } else {
                    res[0] = randomInt(21);
                    res[1] = randomInt(21);
                }
            } else if (randomInt(2) > 1) {
                res[1] = randomInt(max);
            } else {
                res[0] = randomInt(max);
                res[1] = value;
            }
            break;
        case "division":
            if (needRandom) {
                if (max <= 101) {
                    const num1 = randomInt(11, 1);
                    res[0] = num1 * randomInt(11);
                    res[1] = num1;
                } else {
                    const num1 = randomInt(21, 1);
                    res[0] = num1 * randomInt(21);
                    res[1] = num1;
                }
            } else {
                res[0] = value * randomInt(max, 1);
                res[1] = value;
            }
            break;
    };
    return res;
};

const operation = {
    addition: (num1, num2) => num1 + num2,
    subtraction: (num1, num2) => num1 - num2,
    multiplication: (num1, num2) => num1 * num2,
    division: (num1, num2) => num1 / num2
};

export const listener = (buttonName) => {
    const input = document.querySelectorAll("input");
    const navButtons = document.querySelectorAll(".navButtons");
    document.getElementById("check").setAttribute("disabled", true);
    document.getElementById(`${buttonName}`).addEventListener('click', () => {
        input.forEach(eq => eq.value = "")
        const equationContainers = document.querySelectorAll(".eqContainers");
        const problems = [];
        equationContainers.forEach(eq => {
            const children = eq.childNodes;
            let currentProblem;
            let check = 0;
            while (check === 0) {
                check++;
                currentProblem = data.addObj[data.hOptions.value](buttonName);
                if (problems.length) {
                    problems.forEach(p => {
                        if (p[0] === currentProblem[0] && p[1] === currentProblem[1]) check = 0;
                    })
                }
            }
            problems.push(currentProblem);
            fillPs([children[0], children[1]], currentProblem);
            const answer = operation[buttonName];
            eq.lastChild.lastChild.setAttribute("answer", answer(currentProblem[0], currentProblem[1]));
        });
        document.getElementById("check").removeAttribute("disabled");
        navButtons.forEach(butt => butt.setAttribute("disabled", true));
    });
}

export const check = () => {
    const input = document.querySelectorAll("input");
    const navButtons = document.querySelectorAll(".navButtons");
    const check = document.getElementById('check');
    check.addEventListener('click', function checker() {
        const res = new Array(10).fill(false)
        input.forEach((ans, i) => { if (ans.value === ans.getAttribute("answer")) res[i] = true });
        if (res.filter(e => e === true).length === 10) {
            alert("Good job!!! All are correct.")
            navButtons.forEach(butt => butt.removeAttribute("disabled"));
            check.setAttribute("disabled", true);
            data.clearSheet();
        } else {
            alert(res.filter(e => e === true).length + " Correct, almost got it.")
        }
    });
}

export const buildPage = () => {
    document.body.append(data.header, data.main, data.footer);
    data.header.append(data.hDiv, data.hNav);
    data.hDiv.append(data.hOptions);
    data.hOptions.append(data.selectO1, data.selectO2, data.selectO3, data.selectO4, data.selectO5, data.selectO6, data.selectO7, data.selectO8, data.selectO9, data.selectO10, data.selectO11, data.selectO12, data.selectO13);
    data.hNav.append(data.navBut1, data.navBut2, data.navBut3, data.navBut4);
    data.main.append(data.equationDivs[0], data.equationDivs[1], data.equationDivs[2], data.equationDivs[3], data.equationDivs[4], data.equationDivs[5], data.equationDivs[6], data.equationDivs[7], data.equationDivs[8], data.equationDivs[9],);
    data.footer.append(data.checkAns);
}

export const clearSheet = () => {
    document.querySelectorAll("p").forEach(p => p.innerText = "");
    // document.querySelectorAll("input").forEach(input => input.removeAttribute("value"));
}
