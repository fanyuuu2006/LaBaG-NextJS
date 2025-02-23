import { P } from './P.js'; 

// 啦八機本體
export class LaBaG{
    // 建構函數
    constructor(){ 
        this.AllData = {}; // 總資料
        this.OneData = {}; // 單次資料
        this.DataIndex = 0; // 資料索引值

        // 遊戲變數
        this.Times = 30; // 可遊玩次數
        this.Played = 0; // 已遊玩次數

        this.Score = 0;
        this.MarginScore = 0;
        
        this.Ps = [null, null, null];
        new P("A", [625, 350, 150], {
            "Normal": 36,
            "SuperHHH": 19,
            "GreenWei": 36,
            "PiKaChu": 36
        });

        new P("B", [1250, 650, 220], {
            "Normal": 24,
            "SuperHHH": 5,
            "GreenWei": 24,
            "PiKaChu": 24
        });

        new P("C", [2100, 1080, 380], {
            "Normal": 17,
            "SuperHHH": 19,
            "GreenWei": 17,
            "PiKaChu": 17        
        });

        new P("D", [2500, 1250, 420], {
            "Normal": 12,
            "SuperHHH": 19,
            "GreenWei": 12,
            "PiKaChu": 12,
        });

        new P("E", [10000, 5000, 1250], {
            "Normal": 8,
            "SuperHHH": 19,
            "GreenWei": 8,
            "PiKaChu": 8
        });

        new P("F", [20000, 10000, 2500], {
            "Normal": 3,
            "SuperHHH": 19,
            "GreenWei": 3,
            "PiKaChu": 3
        });
        // 機率區間
        function AccRate(mode){
            let res = [];
            let acc = 0;
            for (const p of Object.values(P.Obj)) {
                acc += p.rate_map[mode];
                res.push(acc);
            }
            return res;
        }

        this.rate_ranges = {};
        ["Normal", "SuperHHH", "GreenWei", "PiKaChu"].forEach(mode=>{
            this.rate_ranges[mode] = AccRate(mode);    
        })

        // 加分倍數
        this.ScoreTimesMap = {
            "Normal": 1,
            "SuperHHH": 1,
            "GreenWei": 3,
            "PiKaChu": 1
        };
        this.ScoreTimes = 1;

        // 特殊模式變數
        this.ModeToScreen = false;

        // 超級阿禾
        this.SupeRate = 15;
        this.SuperHHH = false;
        this.SuperNum = 0;
        this.SuperTimes = 0;
        this.DoubleScore = 0;

        // 綠光阿瑋
        this.GreenRate = 35;
        this.GreenWei = false;
        this.GreenNum = 0;
        this.GreenTimes = 0;
        this.GssNum = 0;
        
        // 皮卡丘充電
        this.PiKaChu = false;
       this.KachuTimes = 0;
    }

    Reset(){
        // 重置
        this.AllData = {};
        this.DataIndex = 0;

        this.Played = 0;
        this.Score = 0;
        this.MarginScore = 0;
        this.ScoreTimes = 1;

        this.Ps = [null, null, null];

        this.SuperHHH = false;
        this.SuperTimes = 0;

        this.GreenWei = false;
        this.GreenTimes = 0;
        this.GssNum = 0;

        this.PiKaChu = false;
        this.KachuTimes = 0;
    }
    
    Logic(){
        // 邏輯流程
        this.Reset();
        while(this.GameRunning()){
            this.ModeToScreen = false;
            this.OneData = {};
            
            this.MarginScore = 0;
            this.DoubleScore = 0;

            this.Random();
            this.CalculateScore();
            this.Result();
            this.JudgeMode();
        }
    }

    GameRunning(){
        return this.Played < this.Times;
    }
    
    NowMode(){
        // 現在模式
        const modes = {
            [this.SuperHHH]: "SuperHHH",
            [this.GreenWei]: "GreenWei",
            [this.PiKaChu]: "PiKaChu"
        };

        // 找到第一個值為 true 的鍵，若沒有則預設為 "Normal"
        return modes[true] || "Normal";
    }
    
    RandInt(){
        // 產生 min 到 max 之間的整數
        const min = 1;
        const max = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Random(){
        // 隨機
        
        // { length: 3 } 不是陣列，但 Array.from() 會根據 length 來建立一個 長度為 3 的新陣列
        let RandNums = Array.from({length: 3}, ()=> this.RandInt());
        for (let i = 0; i < RandNums.length; i++) {
            this.OneData[`RandNums[${i}]`] = RandNums[i];
        }

        this.SuperNum = this.RandInt();
        this.OneData["SuperHHH"] =this.SuperNum;
        this.GreenNum = this.RandInt();
        this.OneData["GreenWei"] =this.GreenNum;

        let rate_range = this.rate_ranges[this.NowMode()];

        let keys = Object.keys(P.Obj);
        RandNums.forEach((RandNum, i)=>{
            for (let j = 0; j < 6; j++){
                if(RandNum<= rate_range[j]){
                    this.Ps[i] = P.Obj[keys[j]];
                    break;
                }
            }
        });

        this.Ps.forEach((p)=>{
            if(p.code === "A" && this.GssNum <20){
                this.GssNum += 1;
            }
        });
    }

    CalculateScore(){
        // 計算分數
        const UniqueCount = new Set(this.Ps.map(p => p.code)).size;
        switch (UniqueCount) {
            case 1: // 三個一樣
                this.MarginScore += this.Ps[0].score_array[0];
                break;
            case 2: // 兩個一樣
                if (this.Ps[0] === this.Ps[1]) {
                    this.MarginScore += this.Ps[0].score_array[1];
                    this.MarginScore += this.Ps[2].score_array[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.3);
                } else if (this.Ps[1] === this.Ps[2]) {
                    this.MarginScore += this.Ps[1].score_array[1];
                    this.MarginScore += this.Ps[0].score_array[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.3);
                } else if (this.Ps[2] === this.Ps[0]) {
                    this.MarginScore += this.Ps[2].score_array[1];
                    this.MarginScore += this.Ps[1].score_array[2];
                    this.MarginScore = Math.round(this.MarginScore / 1.3);
                }
                break;
            case 3: // 三個不一樣
            this.MarginScore += this.Ps[0].score_array[2];
            this.MarginScore += this.Ps[1].score_array[2];
            this.MarginScore += this.Ps[2].score_array[2];
                this.MarginScore = Math.round(this.MarginScore / 3);
                break;
        }
        // 根據當前模式更新加分倍數
        this.ScoreTimes = this.ScoreTimesMap[this.NowMode()];
        this.MarginScore *= this.ScoreTimes;
    }

    Result(){
        // 結果
        this.Played += 1;
        this.DataIndex += 1;
        this.Score += this.MarginScore;
        this.AllData[`${this.DataIndex}`] = this.OneData;
    }

    JudgeMode(){
        // 判斷模式
        if(!this.GameRunning()){
            // 關掉其他模式
            this.SuperHHH = false;
            this.GreenWei = false;
            // 判斷皮卡丘充電
            if (this.Ps.some(p => p.code === "E")) {
                this.PiKaChu = true;
                this.Played -= 5;
                this.KachuTimes += 1;
                this.ModeToScreen = true;
            } else {
                this.PiKaChu = false;
            }
            return;
        }

        const NowMode = this.NowMode();
        switch(NowMode){
            case "Normal": 
            case "PiKaChu":
                // 判斷超級阿禾 
                if (this.SuperNum <= this.SupeRate && this.Ps.some(p => p.code === "B")){
                    this.SuperHHH = true;
                    this.SuperTimes += 6;
                    if(this.PiKaChu){
                        this.PiKaChu = false;
                    }
                    this.ModeToScreen = true;

                    // 超級阿禾加倍
                    if (this.Ps.every(p => p.code === "B")){
                        this.DoubleScore = Math.round(this.Score / 2) * this.ScoreTimes;
                        this.Score += this.DoubleScore;
                    }
                    break;
                }

                // 判斷綠光阿瑋
                if (this.GreenNum <= this.GreenRate && this.Ps.every(p => p.code === "A")){
                    this.GreenWei = true;
                    this.GreenTimes += 2;
                    if(this.PiKaChu){
                        this.PiKaChu = false;
                    }
                    this.ModeToScreen = true;
                    break;
                }else if(this.GssNum >= 20){
                    this.GreenWei = true;
                    this.GreenTimes += 2;
                    this.GssNum = 0
                    if(this.PiKaChu){
                        this.PiKaChu = false;
                    }
                    this.ModeToScreen = true;
                    break;
                }
                break;
            case "SuperHHH":
                this.SuperTimes -= 1;

                if (this.Ps.every(p => p.code === "B")){
                    this.SuperTimes += 2;
                }
                if (this.SuperTimes <= 0){
                    this.SuperHHH = false;
                    this.JudgeMode() // 判斷是否可進入其他模式
                    this.ModeToScreen = true;
                }
                break;
            case "GreenWei":
                this.GreenTimes -= 1;

                if (this.Ps.every(p => p.code === "A")){
                    this.GreenTimes += 1;
                }
                if (this.GreenTimes <= 0){
                    this.GreenWei = false;
                    this.JudgeMode() // 判斷是否可進入其他模式
                    this.ModeToScreen = true;
                }
                break;
        }
    }
}