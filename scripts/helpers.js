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

const randomInt = (max) => Math.floor(Math.random() * (max + 1));

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
    let max = 1000;
    if (value <= 10) {
        max = 10;
        needRandom = false;
    } else if (value <= 20) max = 20;
    else if (value <= 100) max = 100;
    const res = [value, 0, op[operation]]
    if (needRandom) {
        res[0] = randomInt(max);
        res[1] = randomInt(max);
    } else if (randomInt(2) > 1) {
        res[1] = randomInt(max);
    } else {
        res[0] = randomInt(max);
        res[1] = value;
    }
    return res;
};

const operation = {
    addition: (num1, num2) => num1 + num2,
    subtraction: (num1, num2) => num1 - num2,
    multiplication: (num1, num2) => num1 * num2,
    division: (num1, num2) => num1 / num2
}

export const listener = (buttonName) => {
    document.getElementById(`${buttonName}`).addEventListener('click', () => {
        const input = document.querySelectorAll("input");
        input.forEach(eq => eq.value = "")
        const equationContainers = document.querySelectorAll(".eqContainers");
        equationContainers.forEach(eq => {
            const children = eq.childNodes;
            const currentProblem = data.addObj[data.hOptions.value](buttonName);
            fillPs([children[0], children[1]], currentProblem);
            const answer = operation[buttonName]
            eq.lastChild.lastChild.setAttribute("answer", answer(currentProblem[0], currentProblem[1]))
        });
        const check = document.getElementById('check');
        check.addEventListener('click', function checker() {
            const res = new Array(10).fill(false)
            input.forEach((ans, i) => { if (ans.value === ans.getAttribute("answer")) res[i] = true });
            if (res.filter(e => e === true).length === 10) {
                alert("Good job all are correct.")
                check.removeEventListener('click', checker);
            } else {
                alert(res.filter(e => e === true).length + " Correct, almost got it.")
            }
        });
    });
}
