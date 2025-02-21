import Game from "./PlayLaBaG.js";

Game.Reset;
while(Game.GameRunning()){
    Game.Logic(); // 執行遊戲邏輯
}
Game.GameOver(); // 遊戲結束
