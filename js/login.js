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
        console.log("login.js--", '2023-04-07 12:51:01')
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
                console.log("login.js--", '400.Error', '2023-04-07 12:58:31');
            }
        } catch (error) {
            console.log(error);
            console.log("login.js--", '400 Error', '2023-04-07 12:51:55');
        }
    }

    // ログイン
    userlogin() {
        console.log("login.js--", "2023-04-10 13:10:05")
        let loginfrom = new FormData(document.getElementById('login_from'));
        for (let key of loginfrom.keys()) {
            if (loginfrom.get(key) === "") {
                alert(key + "空");
                break;
            }
        }
        this.getopt("opt=login", this.userckcallback, loginfrom);
    }

    userckcallback(temp) {
        console.log(temp);
        console.log("login.js--", '2023-04-10 13:17:28');
    }
}



window.addEventListener('load', function () {
    console.log('function test');
    this.document.getElementById('loginbut').addEventListener('click', function () {
        let cmd = new useraccsee();
        console.log('loginbut.test');
        cmd.userlogin();
    })
})






