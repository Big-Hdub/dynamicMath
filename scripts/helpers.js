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

const randomInt = (max) => Math.floor(Math.random() * (max)) + 1;

export const fillPs = (ps, arr) => {
    ps[0].innerText = arr[0]
    ps[1].innerText = arr[1]
}

const op = {
    addition: "&plus;",
    subraction: "&minus;",
    multiplication: "&times;",
    division: "&divide;"
}

export const mathCreator = (value, operation) => {
    let needRandom = false;
    let max = 1000;
    if (value <= 10) max = 10;
    else if (value <= 20) {
        max = 20;
        needRandom = true;
    } else if (value <= 100) {
        max = 100;
        needRandom = true;
    } else needRandom = true;
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
