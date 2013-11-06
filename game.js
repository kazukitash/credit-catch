enchant();  //enchantを利用するためのおまじない（enchant.js本体やクラスをエクスポートしている）

//ブラウザがページを読み込んだときに実行する関数
window.onload = function(){

  // ゲームオブジェクトを生成
  molTaniCatch = new Core(YokoHaba, TateHaba);

  //ゲームのfpsを指定
  molTaniCatch.fps = 30;

  //この中にゲームを記述していく
  molTaniCatch.onload = function(){

  }

  //ゲームスタート
  molTaniCatch.start();
}