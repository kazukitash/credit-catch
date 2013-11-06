enchant();  //enchantを利用するためのおまじない（enchant.js本体やクラスをエクスポートしている）

//Spriteクラスを継承したJikiクラスをつくる
var Jiki = enchant.Class.create(Sprite, {
  //インスタンスオブジェクトを生成したときに実行される
  initialize: function(){
    //おまじない
    Sprite.call(this, 151, 169);

    //自機に画像を設定する
    this.image = molTaniCatch.assets["img/mol.png"];

    //自機のフレームを指定
    this.frame = 0;

    //自機のx座標
    this.x = 120;

    //自機のy座標
    this.y = 300;
  },

  ontouchmove: function(e){
    //動きの左右を判定して自機の画像を変更する
    if(e.x - this.width / 2 > this.x){
      this.frame = 0;
    } else if(e.x - this.width / 2 < this.x){
      this.frame = 1;
    }

    //touchmoveイベントにおいて関数の第一引数eはクリックした座標を返してくれる
    this.x = e.x - this.width / 2
    this.y = e.y - this.height / 2
  }
});

//Printクラスを作る
var Print = enchant.Class.create(Sprite, {
  initialize: function(){
    Sprite.call(this, 95, 100);

    this.image = molTaniCatch.assets["img/print.png"];

    //自機のx座標
    this.x = 300;

    //自機のy座標
    this.y = 200;
  }
});

//Sceneクラスを継承したgameSceneクラスを作る
var GameScene = enchant.Class.create(Scene, {
  initialize: function(){
    Scene.call(this);
    //ゲームの背景画像を表示する
    var haikei = new Sprite(YokoHaba, TateHaba);
    haikei.image = molTaniCatch.assets["img/game.png"];
    this.addChild(haikei);

    //自機オブジェクト（以下、自機）をJikiクラスから作る
    var jiki = new Jiki();

    //自機をゲーム画面に表示する
    this.addChild(jiki);

    var print = new Print();
    this.addChild(print);
  }
});

//ブラウザがページを読み込んだときに実行する関数
window.onload = function(){

  // ゲームオブジェクトを生成
  molTaniCatch = new Core(YokoHaba, TateHaba);

  //ゲームのfpsを指定
  molTaniCatch.fps = 30;

  //画像のPATHを配列に格納して管理する
  var gazou = [];
  gazou.push("img/mol.png");
  gazou.push("img/game.png");
  gazou.push("img/print.png");

  //mol.pngをロードします
  molTaniCatch.preload(gazou);

  //この中にゲームを記述していく
  molTaniCatch.onload = function(){
    this.gameScene = new GameScene();
    this.pushScene(this.gameScene);
  };

  //ゲームスタート
  molTaniCatch.start();
}