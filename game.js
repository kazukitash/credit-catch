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
    this.y = 500;
  },

  ontouchmove: function(e){
    //動きの左右を判定して自機の画像を変更する
    if(e.x - this.width / 2 > this.x){
      this.frame = 0;
    } else if(e.x - this.width / 2 < this.x){
      this.frame = 1;
    }

    //touchmoveイベントにおいて関数の第一引数eはクリックした座標を返してくれる
    this.x = e.x - this.width / 2;
    // this.y = e.y - this.height / 2
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
    this.y = -this.height;
  },

  onenterframe: function(){
    this.y += 4;
  }
});

//titleSceneを生成する
var TitleScene = enchant.Class.create(Scene, {
  initialize: function(){
    Scene.call(this);

    var haikei = new Sprite(YokoHaba, TateHaba);
    haikei.image = molTaniCatch.assets["img/title.png"];
    this.addChild(haikei);
  },

  //画面をタッチしたらシーンを移動する
  ontouchstart: function(){
    molTaniCatch.gameScene = new GameScene();
    //pushSceneではなくreplaceSceneであることに注意する
    molTaniCatch.replaceScene(molTaniCatch.gameScene);
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
    this.jiki = new Jiki();

    //自機をゲーム画面に表示する
    this.addChild(this.jiki);

    //たくさん出てくるプリントを配列に格納するための変数を定義する
    this.prints = [];

    //スコアを定義
    this.score = 0;

    //ラベルを作成
    this.scoreLabel = new Label(this.score.toString());

    //ラベルの幅を指定
    this.scoreLabel.width = 600;

    //ラベルの中で文字が中央に表示されるようにする
    this.scoreLabel.textAlign = "center";

    //ラベルの中のフォントを指定する
    this.scoreLabel.font = "80px Serif";

    //文字色を指定する
    this.scoreLabel.color = "white";

    //ラベルを移動する
    this.scoreLabel.moveTo(325,250);

    //gameSceneにラベルを追加する
    this.addChild(this.scoreLabel);
  },

  //毎フレーム実行
  onenterframe: function(){
    //30フレームに一回プリントを生成する
    if(this.age % 30 == 0){
      var print = new Print();
      print.x = Math.random() * (YokoHaba - print.width);

      this.addChild(print);

      this.prints.push(print);
    }

    //Spriteが重なっているか判定
    printsLength = this.prints.length;
    while(printsLength){
      print = this.prints[--printsLength];
      if(this.jiki.intersect(print)){
        //プリントをGameSceneから外す
        this.removeChild(print);

        //プリントインスタンスを削除する
        delete print;

        //消したプリントを配列からも削除する
        this.prints.splice(printsLength, 1);

        //スコアを+1する
        this.score++;

        //スコアラベルの文字に変更されたscoreを代入して表示を更新する
        this.scoreLabel.text = this.score.toString();
      }
    }
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
  gazou.push("img/title.png");

  //mol.pngをロードします
  molTaniCatch.preload(gazou);

  //この中にゲームを記述していく
  molTaniCatch.onload = function(){
    this.titleScene = new TitleScene();
    this.pushScene(this.titleScene);
  };

  //ゲームスタート
  molTaniCatch.start();
}