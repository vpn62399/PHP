




class plist {
    debugtext = "---------class plist.js-------------"
    debugflg = 1;
    apiurl = './apis/search.php?';

    async getsearch(opt, callback) {
        let url = this.apiurl + opt;
        if (this.debugflg == 0) {
            console.log(this.debugtext, url);
        }
        try {
            let b = await fetch(url);
            if (b.status == 200 && b.statusText == 'OK') {
                let bb = await b.json();
                callback(bb);
            }
        } catch (error) {
            console.log(this.debugtext, error);
        }
    }


    textfunction(re) {
        console.log(re);
    }

    classinfo() {
    }
}

window.addEventListener('load', function () {
    tb = new plist();
    console.log("ddddddddddddddddddd");
    tb.getsearch("opt", tb.textfunction);
})