class plist {
    TAG = "class plist.js-----";
    ETAG = null;

    constructor(ElementTAG) {
        this.ETAG = ElementTAG;
    }

    createtd() {

    }

    searchall() {
        url = "";
    }

    info() {
        console.log(this.TAG, this.ETAG);
    }

}

let t = new plist("element");
t.info();