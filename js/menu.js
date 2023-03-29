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
        let v = new Sidebar(13);
        for (i in data) {
            v.bar1(data[i]['jpmenu'], data[i]['url']);
        }
    }
    getmenu();
})
