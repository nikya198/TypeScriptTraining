"use strict";
let userName2 = "MAX";
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    function clickHandler(message) {
        console.log("Clicked! " + message);
    }
    clickHandler("aa");
    button.addEventListener("click", clickHandler.bind(null, "You are welcome"));
}, false);
function add(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}
//# sourceMappingURL=app.js.map