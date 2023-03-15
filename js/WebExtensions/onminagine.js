
// let ab = document.getElementById('button0')
// let ab1 = document.getElementById('button1')
// https://tm.minagine.net/


function rst(bt) {
  console.log(bt + ' click()');
  document.getElementById(bt).click();
}

function scr(h, s, bt) {
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, s, 0);
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
// scr(8, 51, 'button0')
// // 業務終了
// scr(18, 1, 'button1')

console.log('----------------------------------------------');

