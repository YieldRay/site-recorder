/**
 * MUST SET `crossorigin`
 * <script type="text/javascript" src="error.js" crossorigin></script>
 */
// window.onerror = function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {};

window.onerror = function (msg, src, lineno, colno, error) {
    var s = "${ENDPOINT}";
    var e = { url: location.href, src: src, error: { name: error.name, message: error.message, stack: error.stack } };
    var x = new XMLHttpRequest();
    x.open("POST", s, true);
    x.setRequestHeader("Content-type", "application/json; charset=utf-8");
    x.send(JSON.stringify(e));
};
