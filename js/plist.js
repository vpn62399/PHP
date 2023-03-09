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
        let showtr = ['indate', 'jan', 'item', 'modexsn', 'comment', 'user'];
        let ttable = document.getElementById('plist_showTables')
        if (ttable.firstElementChild) {
            ttable.removeChild(ttable.firstElementChild)
        }
        let tbody = document.createElement('tbody');
        ttable.appendChild(tbody);
        for (let t of showJson[1]) {
            let ctr = document.createElement('tr');
            let ctd = document.createElement('td');
            console.log(t);
            for (let j of showtr) {
                ctd = document.createElement('td');
                ctd.innerText = t[j];
                ctr.appendChild(ctd);
            }
            ctr.appendChild(ctd);
            tbody.appendChild(ctr);
        }
    }
}


window.addEventListener('load', function () {
    let but = document.getElementById('search_but');
    but.addEventListener('click', function () {
        let sh = new plist();
        sh.getsearch('all', sh.showTable);
    })
})




