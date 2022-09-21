(function () {
    var s = "${ENDPOINT}";
    var e = { url: location.href, ref: document.referrer, lang: navigator.language };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
})();
