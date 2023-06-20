let userName2 = "MAX";
document.addEventListener(
  "DOMContentLoaded",
  function () {
    const button = document.querySelector("button")!;

    function clickHandler(message: string) {
      //let userName = "MAX";
      console.log("Clicked! " + message);
    }
    clickHandler("aa");
    button.addEventListener(
      "click",
      clickHandler.bind(null, "You are welcome")
    );
    //clickHandlerのthisに値を設定したいか、引数を渡したい場合thisを設定する
    //clickHandler関数ではthisを使っていないのでnullを設定する
  },
  false
);

//comment

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}
