//  ログイン画面

// cookie セッション確認
let phpsid;
for (temp of document.cookie.split(';')) {
    let temp2 = temp.split('=');
    if (temp2[0] == 'PHPSESSID') {
        phpsid = temp2[1];
    }
}

// セッションチェック
async function ck(phpsessionid) {
    let url = 'apis/user.php';
    let ckd = new FormData();
    ckd.append('PHPCKID', phpsid);
    ckd.append('method', 'userlogin');
    console.log('debug---', phpsessionid);
    for (v of ckd) {
        console.log('debug---', v);
    }
    try {
        await fetch(url, {
            method: 'POST',
            body: ckd
        })
            .then(response => {
                return response.text();
            })
            .then(vvv => {
                console.log(vvv)
            })
    } catch (error) {
        console.log(error);
    } finally {
        console.log('debug--', 'end');
    }
}
ck(phpsid);

// ユーザーログイン
function userin() {
    const but = document.querySelector('button');
    const fd = document.querySelector('form');
    but.addEventListener("click", function () {
        let fdd = new FormData(fd);
        fdd.append('phpsid', phpsid);

        for (let temp of fdd.entries()) {
            console.log(temp);
        }

        fdd.forEach((val, key) => {
            console.log(key, val)
        });

        fetch('apis/user.php', {
            method: 'POST',
            body: fdd
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                console.log(document.cookie);
                // alert("stop");
                // window.location.href = 'plist.html';
            });
    });
}

// ユーザーログアウト
function userout() {

}

// ユーザー新規登録
function usersetup() {

}






