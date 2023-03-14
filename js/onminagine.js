
// let ab = document.getElementById('button0')
// let ab1 = document.getElementById('button1')

function runAtScheduledTime0() {
  console.log('button0 代码在每天早上8:55执行！');
  document.getElementById('button0').click();
}
function scheduleNextRun0() {
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 51, 0);
  console.log(scheduledTime);
  if (now > scheduledTime) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  const delay = scheduledTime.getTime() - now.getTime();
  setTimeout(runAtScheduledTime0, delay);
}
scheduleNextRun0();




function runAtScheduledTime1() {
  console.log('button1 代码在每天早上18:5执行！');
  document.getElementById('button1').click();
}
function scheduleNextRun1() {
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 1, 0);
  console.log(scheduledTime);
  if (now > scheduledTime) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  const delay = scheduledTime.getTime() - now.getTime();
  setTimeout(runAtScheduledTime1, delay);
}
scheduleNextRun1();







function timerRun(mem){

}
