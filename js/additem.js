

// C:\Users\mvk_sun\Desktop\PHP\additem.html 用Javascript
// http://localhost:88/apis/getopt.php? PHP URL


class setopt {
    debugflg = 1;
    debugtext = "---------additem.js-------------"
    apiurl = './apis/getopt.php?';

    async getopt(opt, callback) {
        // テストURL http://localhost:88/apis/getopt.php?opt=getcategory
        let url = this.apiurl + opt;
        if (this.debugflg == 0) {
            console.log(this.debugtext, url);
        }
        try {
            let b = await fetch(url);
            if (b.status == 200 && b.statusText == 'OK') {
                let bb = await b.json();
                callback(bb);
            } else {
                console.log('400 Error');
            }
        } catch (error) {
            console.log(this.debugtext, error);
        }
    }

    setmaker(item) {
        let tag = document.getElementById('additemform_maker');
        for (let s of item) {
            let item = document.createElement('option');
            item.value = s['indexkey'];
            item.text = s['item'];
            tag.appendChild(item);
        }
    }

    setuser(item) {
        let tag = document.getElementById('additemform_user');
        for (let s of item) {
            let item = document.createElement('option');
            item.value = s['indexkey'];
            item.text = s['item'];
            tag.appendChild(item);
        }
    }

    setstatus(item) {
        let tag = document.getElementById('additemform_status');
        for (let s of item) {
            let item = document.createElement('option');
            item.value = s['indexkey'];
            item.text = s['item'];
            tag.appendChild(item);
        }
    }

    setupstream(item) {
        let tag = document.getElementById('additemform_upstream');
        for (let s of item) {
            let item = document.createElement('option');
            item.value = s['indexkey'];
            item.text = s['item'];
            tag.appendChild(item);
        }
    }

    setcategory(item) {
        let tag = document.getElementById('additemform_category');
        for (let s of item) {
            let item = document.createElement('option');
            item.value = s['indexkey'];
            item.text = s['item2'] + '(' + s['item1'] + ')';
            tag.appendChild(item);
        }
    }
}

var setselectopt = new setopt();
setselectopt.getopt('opt=user', setselectopt.setuser);
setselectopt.getopt('opt=status', setselectopt.setstatus);
setselectopt.getopt('opt=upstream', setselectopt.setupstream);
setselectopt.getopt('opt=getcategory', setselectopt.setcategory);
setselectopt.getopt('opt=maker', setselectopt.setmaker);

class janck {
    jancode;

    constructor(jancode) {
        this.jancode = jancode;
    }

    async check() {
        let url = '/apis/findpmodel.php?j=' + this.jancode;
        console.log(url);
        try {
            let b = await fetch(url);
            if (b.status == 200 && b.statusText == 'OK') {
                let bb = await b.json();
                this.findjan(bb);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(this.debugtext, error);
        }
    }

    findjan(item) {
        if (item.length == 1) {
            console.log("==1", '品番が見つかりました。');
            document.getElementById("additemform_jancode").value = item[0]['jan'];
            document.getElementById("additemform_pmodel").value = item[0]['item'];
            document.getElementById("additemform_maker").value = item[0]['maker'];
        } else if (item.length > 1) {
            console.log(">1");
            document.getElementById("additemform_pmodel").value = '';
            document.getElementById("additemform_maker").value = 0;
        } else if (item.length == 0) {
            console.log("==0");
            document.getElementById("additemform_pmodel").value = '';
            document.getElementById("additemform_maker").value = 0;
        }
    }
}

class serialnumberck {
    serialsn;
    debugtext = "---------additem.js-------------";
    constructor(serialsn) {
        this.serialsn = serialsn;
    }

    async serialck() {
        try {
            let url = '/apis/findmain.php?j=';
            let t = await fetch(url + this.serialsn);
            if (t.status == 200 && t.statusText == 'OK') {
                let bb = await t.json();
                this.fincsn(bb);
            }
        } catch (error) {
            console.log(this.debugtext, error);
        }
    }

    fincsn(e) {
        if (e.length > 0 && e.length < 2) {
            console.log(e);
            document.getElementById('additemform_category').value = e[0]['category'];
            document.getElementById('additemform_upstream').value = e[0]['upstream'];
            document.getElementById('additemform_status').value = e[0]['upstream'];
            document.getElementById('additemform_user').value = e[0]['inperson'];
            document.getElementById('additemform_date').value = e[0]['indate'];
            document.getElementById('additemform_comment').value = e[0]['comment'];
        } else {
            console.log("==0");
            document.getElementById('additemform_category').value = 0;
            document.getElementById('additemform_upstream').value = 0;
            document.getElementById('additemform_status').value = 0;
            document.getElementById('additemform_user').value = 0;
            document.getElementById('additemform_date').value = '';
            document.getElementById('additemform_comment').value = '';
        }
    }
}


function addEvent() {
    let tag = document.getElementById('additemform_jancode');
    tag.addEventListener('blur', function (e) {
        console.log(e.target);
        let jan = document.getElementById('additemform_jancode').value;
        let jc = new janck(jan.trim());
        jc.check();
    });

    let tag2 = document.getElementById('additemform_send');
    tag2.addEventListener('click', function (e) {
        console.log(e.target);
        upadditem();
    });
};

function addEvent2() {
    let tag = document.getElementById('additemform_modexsn');
    tag.addEventListener('blur', function (e) {
        console.log(e.target);
        let sn = document.getElementById('additemform_modexsn').value;
        console.log(sn);
        let js = new serialnumberck(sn.trim());
        js.serialck()
    })
}


function upadditem() {
    console.log("upadditem  additem.js");
    var tem = new FormData(document.getElementById('additemform'));
    async function send() {
        let apiurl = "./apis/additem.php";
        try {
            let x = await fetch(apiurl, {
                method: 'POST',
                body: tem,
            });
            // let vv = await x.json();
            let vv = await x.text();
            console.log(vv);
            console.log(vv.status);
            if (vv.status == "OK") {
                alert("更新完了しました。");
            }
        } catch (error) {
            console.log('// additem.js //', error);
        } finally {

        }
    }
    send();
}

window.addEventListener('load', function () {
    addEvent();
    addEvent2();
})

