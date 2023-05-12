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
                console.log("login.js--", '400.Error', '2023-05-10 13:18:43');
            }
        } catch (error) {
            console.log(error);
            console.log("login.js--", '400 Error', '2023-05-10 13:18:47');
        }
    }

    // ログイン
    userlogin() {
        console.log("login.js--", "2023-05-10 13:18:56")
        let loginfrom = new FormData(document.getElementById('login_from'));
        for (let key of loginfrom.keys()) {
            if (loginfrom.get(key) === "") {
                alert(key + " is empty ");
                break;
            }
        }
        this.getopt("opt=login", this.userckcallback, loginfrom);
    }

    userloginout() {
        // 2023-05-11 16:55:15 途中
        // console.log('2023-05-11 16:50:32', 'ログインアウト');
        this.getopt("opt=loginout", this.userckcallback, { 'loginName': 'null', 'loginStatus': 'loginout' });
    }

    userckcallback(temp) {
        console.log(temp);
        if (temp['loginStatus'] === 'LoginOK') {
            window.location.replace("./plist.html");
        } else {
            if (temp[loginStatus] !== 'loginout') {
                alert("login Error");
                window.location.replace("./login.html");
            }
        }
    }
}

window.addEventListener('load', function () {
    let cmd = new useraccsee();
    cmd.userloginout();
    this.document.getElementById('loginbut').addEventListener('click', function () {
        let cmd = new useraccsee();
        cmd.userlogin();
    })
})






