// 2023-03-29 15:23:14 各ページのサイトバーメニューの設定

class Sidebar {
    mode = null;
    constructor(mode) {
        this.mode = mode;
        console.log('2023-03-29 15:45:51');
    }

    bar1(menu, url) {
        let lenu = document.getElementById('layout_left');
        let ld = document.createElement('div');
        ld.className = ('layout_left_item');
        let la = document.createElement('a');
        la.href = './' + url;
        la.text = menu;
        ld.appendChild(la);
        lenu.appendChild(ld);
    }
}

window.addEventListener('load', function () {
    async function getmenu() {
        try {
            let url = './apis/pagemenu.php'
            let m = await fetch(url);
            if (m.status == 200 && m.statusText == 'OK') {
                let mm = await m.json();
                cb(mm);
            }
        } catch (error) {
            console.log("2023-03-29 15:28:58", error);
        }
    }

    function cb(data) {
        // 2023-05-11 13:34:35 OK
        let v = new Sidebar(13);
        console.log(data);
        if (data[0]['loginStatus'] !== 'LoginOK') {
            window.location.replace("./login.html");
            console.log(data);
        }
        for (i in data[1]) {
            v.bar1(data[1][i]['jpmenu'], data[1][i]['url']);
        }
    }
    getmenu();
})
