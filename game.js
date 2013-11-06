enchant();  //enchantを利用するためのおまじない（enchant.js本体やクラスをエクスポートしている）

//ブラウザがページを読み込んだときに実行する関数
window.onload = function(){

  // ゲームオブジェクトを生成
  molTaniCatch = new Core(YokoHaba, TateHaba);

  //ゲームのfpsを指定
  molTaniCatch.fps = 30;

  //mol.pngをロードします
  molTaniCatch.preload("img/mol.png")

  //この中にゲームを記述していく
  molTaniCatch.onload = function(){

    //自機オブジェクト（以下、自機）をSpriteクラスから作る
    var jiki = new Sprite(151, 169);

    //自機に画像を設定する
    jiki.image = molTaniCatch.assets["img/mol.png"];

    //自機のフレームを指定
    jiki.frame = 0;

    //自機のx座標
    jiki.x = 120;

    //自機のy座標
    jiki.y = 300;

    //自機をゲーム画面に表示する
    molTaniCatch.rootScene.addChild(jiki);

  }

  //ゲームスタート
  molTaniCatch.start();
}