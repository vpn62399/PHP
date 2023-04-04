// リストの表示(機能)
// 1.指定メーカー
// 2.指定型番
// 3.すべて表示

// PHPリンク先 './apis/search.php?'
// Html 先 ./plist.html

class plist {
    debugtext = "---------class plist.js-------------"
    debugflg = 0;
    apiurl = './apis/search.php?';

    async getsearch(opt, callback) {
        var fd = new FormData(document.getElementById('search_OPTFORM'));
        let url = this.apiurl + opt;
        if (this.debugflg == 0) {
            console.log(this.debugtext, url);
        }
        try {
            console.log(url);
            let b = await fetch(url, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: fd,
            });

            if (b.status == 200 && b.statusText == 'OK') {
                let bb = await b.json();
                callback(bb);
            }
        } catch (error) {
            console.log(this.debugtext, error);
        }
    }

    showTable(showJson) {
        // 自動テーブルの作成,可用
        // 表示項目指定
        // 2023-03-09 15:30:59
        let showtr = {
            'mindexkey': '索引', 'indate': '入荷日', 'jan': 'JANコード', 'category': 'カテゴリー', 'item': 'アイテム',
            'modexsn': 'シリアル番号', 'comment': 'コメント', 'user': '管理者'
        };
        let ttable = document.getElementById('plist_showTables')
        if (ttable.firstElementChild) {
            ttable.removeChild(ttable.firstElementChild)
        }
        let tbody = document.createElement('tbody');
        ttable.appendChild(tbody);

        let ctr = document.createElement('tr')
        let cth = document.createElement('th');
        for (let t in showtr) {
            console.log(showtr[t]);
            cth = document.createElement('th');
            cth.innerText = showtr[t];
            ctr.appendChild(cth);
        }
        tbody.appendChild(ctr);

        for (let t of showJson[1]) {
            let ctr = document.createElement('tr');
            let ctd = document.createElement('td');
            console.log(t);
            for (let j in showtr) {
                ctd = document.createElement('td');
                ctd.style.padding = '5px';
                if (j !== 'comment') {
                    ctd.style.whiteSpace = 'nowrap';
                }
                if (j === 'modexsn') {
                    let cta = document.createElement('a');
                    // cta.href = 'http://www.google.co.jp';
                    cta.innerHTML = t[j];
                    ctd.appendChild(cta);
                    cta.addEventListener('click', function () {
                        let qq = document.getElementsByClassName("clearcolor");
                        for (v of qq) {
                            v.style.backgroundColor = "";
                        }
                        this.parentElement.className = "clearcolor";
                        this.parentElement.style.backgroundColor = "#1cd82d2e";
                    }, true)
                } else {
                    ctd.innerText = t[j];
                }
                ctr.appendChild(ctd);
                ctr.addEventListener('click', function () {
                    let qq = document.getElementsByClassName("clearcolor");
                    for (v of qq) {
                        v.style.backgroundColor = "";
                    }
                    this.className = "clearcolor";
                    this.style.backgroundColor = "#1cd82d2e";
                }, true)
            }
            ctr.appendChild(ctd);
            tbody.appendChild(ctr);
        }
    }

    showdetail() {
        let ttable = document.getElementById('plist_showTables')
        if (ttable.firstElementChild) {
            ttable.removeChild(ttable.firstElementChild)
        }
        let tbody = document.createElement('tbody');
        alert('detail');
    }
}


// 検索オプションの設定、メーカー項目
async function setmeopt() {
    console.log('2023-03-24 16:02:562023-03-24 16:02:56')
    let url = './apis/getopt.php?opt=maker';
    try {
        let b = await fetch(url);
        if (b.status == 200 && b.statusText == 'OK') {
            let bb = await b.json();
            callback2(bb);
        } else {
            console.log('400 Error');
        }
    } catch (error) {
        console.log(this.debugtext, error);
    }
}

function callback2(req) {
    let tab = document.getElementById('makerlist')
    for (v in req) {
        let c = document.createElement('option')
        c.value = req[v]['item'];
        tab.appendChild(c);
    }
}

// 2023-03-27 13:37:40
// dblclickして入力した値をクリアにする
function dd() {
    let vvv = document.getElementsByName('maker')[0];
    vvv.addEventListener('dblclick', function () {
        this.value = '';
    })

    vvv.addEventListener('mousemove', function () {

    })

}

window.addEventListener('load', function () {
    let but = document.getElementById('search_but');
    setmeopt();
    dd();
    but.addEventListener('click', function () {
        let sh = new plist();
        sh.getsearch('all', sh.showTable);
    })
})




