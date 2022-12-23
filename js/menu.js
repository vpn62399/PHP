class Sidebar {
    TAG = "class Sidebar.js-----";
    mode = null;
    url1 = "http://localhost/";
    urls = { '部材の追加': 'additem.html', 'リスト': 'index.html' };

    constructor(mode) {
        this.mode = mode;
        console.log(this.TAG, 'bar1');
    }

    bar1(menu, b) {
        let lenu = document.getElementById('layout_left');
        let ld = document.createElement('div');
        ld.className = ('layout_left_item');

        let la = document.createElement('a');
        la.href = './' + b;
        la.text = menu;
        ld.appendChild(la);
        lenu.appendChild(ld);
    }
}

