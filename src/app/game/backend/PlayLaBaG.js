import { LaBaG } from './LaBaG.js'; 

// 可遊玩的啦八機
class PlayLaBaG extends LaBaG{
    constructor(){
        super();
        this.Name = "";
        this.HistoryScore = 0;   
    }

    Reset(){
        super.Reset();
        this.HistoryScore = 0;
        console.log("遊戲已重置");
    }

    Logic(){
        this.ModeToScreen = false;
        this.OneData = {};
        this.MarginScore = 0;
        this.DoubleScore  = 0;
        this.Random();
        this.CalculateScore();
        this.Result();
        this.JudgeMode();
    }

    Random(){
        super.Random();
        console.log(`機率區間: ${this.rate_ranges[this.NowMode()]}`);
        console.log(`超級阿禾隨機數為: ${this.SuperNum}`)
        console.log(`綠光阿瑋隨機數為: ${this.GreenNum}`)
        console.log(`咖波累積數：${this.GssNum}`)
    }

    CalculateScore(){
        super.CalculateScore();
        console.log(`加分倍數: ${this.ScoreTimes}`);
    }

    Result(){
        super.Result()
        console.log("");
        console.log(`| ${this.Ps[0].code} | ${this.Ps[1].code} | ${this.Ps[2].code} |`);
        console.log(`+ ${this.MarginScore}`);
        console.log(`目前分數: ${this.Score}`);
        console.log(`剩餘次數: ${this.Times - this.Played}`);
    }

    JudgeMode(){
        super.JudgeMode();
        const NowMode = this.NowMode();
        switch(NowMode){
            case "SuperHHH":
                if (this.ModeToScreen){
                    console.log("超級阿禾出現");
                    if (this.DoubleScore !== 0){
                        console.log(`(超級阿禾加倍分: ${this.DoubleScore})`);
                    }
                }else{
                    if (this.Ps.every(p => p.code === "B")){
                        console.log("全阿禾，次數不消耗且+1！");
                    }
                }
                console.log(`超級阿禾剩餘次數:${this.SuperTimes}次`);
                break;
            case "GreenWei":
                if (this.ModeToScreen){
                    console.log("綠光阿瑋出現");
                }else{
                    if (this.Ps.every(p => p.code === "A")){
                        console.log("全咖波，次數不消耗！");
                    }
                }
                console.log(`綠光阿瑋剩餘次數:${this.GreenTimes}次`);
                break;
            case "PiKaChu":
                if (this.ModeToScreen){
                    console.log("皮卡丘為你充電");
                    console.log(`已觸發 ${this.KachuTimes} 次皮卡丘充電`)
                }
                break;
        } 
    }

    GameOver(){
        console.log("");
        console.log(`遊戲已結束，最終分數為: ${this.Score}。`);
        if (this.Score > this.HistoryScore){
            this.HistoryScore = this.Score;
        }
    }
}
const Game = new PlayLaBaG();
export default Game;
