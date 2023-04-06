
// let ab = document.getElementById('button0')
// let ab1 = document.getElementById('button1')
// https://tm.minagine.net/


// vvv = document.getElementsByTagName('tbody')[3].getElementsByTagName('tr')


function rst(bt) {
    console.log(bt + ' click()');
    if (!document.getElementById(bt)) {
        console.info(bt, 'click Error');
        return;
    }

    let ck = document.getElementsByTagName('tbody')[3].getElementsByTagName('tr')[0];
    let axis = ck.firstElementChild.nextElementSibling.innerText;
    // 勤務開始
    // 勤務終了

    if (axis == '勤務開始' && bt == 'button0') {
        console.log(bt, ck.innerText);
        return;
    } else {
        document.getElementById(bt).click();
    }
    if (axis == '勤務終了' && bt == 'button1') {
        console.log(bt, ck.innerText);
        return;
    } else {
        document.getElementById(bt).click();
    }
    document.getElementById(bt).click();
    return;
}


function scr(h, m, s, bt) {
    const now = new Date();
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
    console.log(scheduledTime);
    if (now > scheduledTime) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    const delay = scheduledTime.getTime() - now.getTime();
    setTimeout(function () {
        rst(bt);
    }, delay);
}

// 業務開始
// scr(8, 31,55, 'button0')
// // 業務終了
// scr(18, 00, 55, 'button1')
console.log(typeof scr);
console.log('----------------------------------------------');

