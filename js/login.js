//  ログイン画面

console.log("2023-04-07 12:42:10");

// cookie セッション確認
let phpsid;
for (temp of document.cookie.split(';')) {
    let temp2 = temp.split('=');
    if (temp2[0] == 'PHPSESSID') {
        phpsid = temp2[1];
    }
}

// 2023-04-10 12:45:09
// 途中、未完成です。使用できない。
// 
class useraccsee {
    // Ajax
    async getopt(opt, callback, udate) {
        console.log("TAG", '2023-04-07 12:51:01')
        let url = './apis/user.php?' + opt;

        console.log(url);
        try {
            let data = {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: udate,
            }
            let b = await fetch(url, data);
            if (b.status == 200 && b.statusText == 'OK') {
                let bb = await b.json();
                callback(bb);
            } else {
                console.log("TAG", '400.Error', '2023-04-07 12:58:31');
            }
        } catch (error) {
            console.log(error);
            console.log("TAG", '400 Error', '2023-04-07 12:51:55');
        }
    }

    // PHPセッション 一致するかを確認する
    // ログインの場合
    userlogin() {
        console.log("TAG", "2023-04-10 13:10:05")
        let lf = new FormData(document.getElementById('login_from'));
        for (let key of lf.keys()) {
            if (lf.get(key) === "") {
                alert(key + "空");
                break;
            }
        }
        this.getopt("opt=login", this.ucallback, lf);
    }

    // 新規登録の場合
    ucallback(temp) {
        console.log(temp);
        console.log("TAG", '2023-04-10 13:17:28');
    }

    // 
}

window.addEventListener('load', function () {
    console.log('function test');
    this.document.getElementById('loginbut').addEventListener('click', function () {
        let cmd = new useraccsee();
        console.log('loginbut.test');
        cmd.userlogin();
    })
})







// OLD

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


// window.addEventListener("load", function () {
//     let xx = document.getElementById("login")
//     xx.addEventListener("click", function () {
//         userin();
//         // ck(phpsid);
//         console.log("2023-04-06 13:39:12");
//     })

// });



