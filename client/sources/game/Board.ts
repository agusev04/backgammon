
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

import {Chip} from "./Chip";

import {Sector} from "./Sector";
import InteractionData = PIXI.interaction.InteractionData;
import Point = PIXI.Point;
import {Sound} from "./Sound";



export class Board extends Container {

    public bg_skin: Texture = Texture.fromImage('assets/bg.png');
    public bg: Sprite = new Sprite(PIXI.Texture.WHITE);
    public dice: number [] = [3,1];
    public OFFSET: number = 30;
    public countClick: number = 0;
    public chipSelectGo: boolean;
    public diceFromServer:any[];
    public tl = new TimelineLite();
    public selectChipWhite: boolean;
    public firsSelectSectorIndex:any;
    public secondSelectSectorIndex:any;
    public sound:Sound = new Sound();



// ----------Массив с фишками-------------
    public arrayChips: any[] = [
        [new Chip(true), new Chip(true)]
        , [], [], [], [],
        [new Chip(true), new Chip(true), new Chip(true), new Chip(true), new Chip(true)],
        [],
        [new Chip(true), new Chip(true), new Chip(true)],
        [], [], [],
        [new Chip(true), new Chip(true), new Chip(true), new Chip(true), new Chip(true)],
        [new Chip(false), new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
        [], [], [],
        [new Chip(false), new Chip(false), new Chip(false)],
        [],
        [new Chip(false), new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
        [], [], [], [],
        [new Chip(false), new Chip(false)]
    ];

    // ----------Массив секторов которые отслеживают клики(на доске они скрыты)-------------
    public arraySectors: any[] = [new Sector(0), new Sector(1), new Sector(2), new Sector(3), new Sector(4), new Sector(5), new Sector(6), new Sector(7), new Sector(8), new Sector(9), new Sector(10), new Sector(11), new Sector(12),
        new Sector(13), new Sector(14), new Sector(15), new Sector(16), new Sector(17), new Sector(18), new Sector(19), new Sector(20), new Sector(21), new Sector(22), new Sector(23)];

    // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек-------------

    public arrayPositionPoint: Point[] = [new PIXI.Point(872,60),new PIXI.Point(815,60),new PIXI.Point(753,60),new PIXI.Point(696,60),new PIXI.Point(636,60),new PIXI.Point(578,60),new PIXI.Point(450,60),new PIXI.Point(390,60),new PIXI.Point(330,60),
        new PIXI.Point(270,60),new PIXI.Point(210,60),new PIXI.Point(155,60),new PIXI.Point(155,715),new PIXI.Point(210,715),new PIXI.Point(270,715),new PIXI.Point(330,715),new PIXI.Point(390,715),new PIXI.Point(450,715),new PIXI.Point(578,715),new PIXI.Point(636,715),
        new PIXI.Point(696,715),new PIXI.Point(753,715),new PIXI.Point(815,715),new PIXI.Point(872,715),];


    constructor() {
        super();
        this.bg.texture = this.bg_skin;
        this.addChild(this.bg);
        this.listenClick();
        this.drawSectors();
        this.drawState();
        this.deactivationSectors();            //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
    }


    public setPosition() {
        //задает позицию фишек
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                if (i >= 0 && i < 12) {
                    this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x,this.arrayPositionPoint[i].y + this.OFFSET * j);
                } else {
                    this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x,this.arrayPositionPoint[i].y - this.OFFSET * j);
                }
            }
        }
    }

    public drawState() {
        //задает позицию фишек и рисует фишки
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                this.setPosition();
                this.addChild(this.arrayChips[i][j]);
            }
        }
    }

    public setPositionSectors() {
        //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
        for (let i = 0; i < this.arrayPositionPoint.length; i++) {
            if (i >= 0 && i < 12) {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 30);
            } else {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 745);
                this.arraySectors[i].rotation = -3.14;
            }

        }
    }

    public drawSectors() {
        //задает позицию сектора и добовляет его на доску
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.setPositionSectors();
            this.addChild(this.arraySectors[i]);
        }
    }

    public listenClick() {
        //слушает клики на секторе
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].on('click',this.sectorClick,this);
        }
    }

    private sectorClick(data: InteractionData): void {
        //тут начинается магия
        if (this.countClick == 0) {
            this.sound.playSoundClickChip();
            this.countClick++;
            this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target);    // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
            this.selectChip(this.firsSelectSectorIndex);    //в этом методе фишка меняет скин на зеленый (активный)

            // console.log('кубики с сервера и их тип');
            // console.log(typeof this.diceFromServer);
            // console.log(this.diceFromServer);
            this.deactivationAllSectors();  //убираю интерактив после выбора фишки со всем секторов кроме подсвеченных
            this.highlightSector(this.firsSelectSectorIndex, this.dice);//кидаю туда значение кубиков которые константа 3 и 1
        } else if (this.countClick == 1) {
            this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
            this.moveChip(this.firsSelectSectorIndex, this.secondSelectSectorIndex);
            this.deactivationChip();    //делаю фишку не активной
            this.offHighLightSectors();  //отключаю подсветку
            this.deactivationSectors(); //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
        }

    }

    public selectChip(selectSectorIndex:number) {
        //передаю сюда сектор по которому кликнули первый раз ( индекс сектора совподает с индексом массива фишек )
        if(this.arrayChips[selectSectorIndex].length!=0){
            if (this.countClick == 1) {
                if (this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].colorChipWhite) {
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinWhite_active;
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                    this.chipSelectGo = true;
                    this.selectChipWhite = true;
                } else {
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinBlack_active;
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                    this.chipSelectGo = true;
                    this.selectChipWhite = false;
                }
            }
        }
    }

    public deactivationChip() {
        //делаю сектор не активным
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                if (this.arrayChips[i][j].colorChipWhite) {
                    this.arrayChips[i][j].chipSprite.texture = this.arrayChips[i][j].chipSkinWhite;
                    this.selectChipWhite = false;
                    this.chipSelectGo = false;
                }
                else
                    this.arrayChips[i][j].chipSprite.texture = this.arrayChips[i][j].chipSkinBlack;
                    this.selectChipWhite = false;
                    this.chipSelectGo = false;
            }
        }
    }

    public deactivationAllSectors(){
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].interactiveOff();
        }
    }

    public deactivationSectors(){
        //убираю интерактив с секторов что бы можно было нажать только на подсвеченные сектора
        for (let i = 0; i < this.arrayChips.length; i++) {
            if(this.arrayChips[i].length == 0){
                this.arraySectors[i].interactiveOff();
            }else
            {
                this.arraySectors[i].interactiveOn();
            }
        }
    }

    public offHighLightSectors(){
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].greenTrianglSprite.visible = false;
            this.arraySectors[i].yellowTrianglSprite.visible = false;
        }
    }

    public getChipPosition(sectorIndex:any,chipIndex:any):Point{
        let x:number;
        let y:number;
        x = this.arrayPositionPoint[sectorIndex].x;

        if(this.arrayPositionPoint[sectorIndex].y == 715){
            y = this.arrayPositionPoint[sectorIndex].y - this.OFFSET * chipIndex;
        }else {
            y = this.arrayPositionPoint[sectorIndex].y + this.OFFSET * chipIndex;
        }
        return new Point(x,y);
    }

    public setDice(first:number,second:number){
       this.dice[0] = first;
       this.dice[1] = second;
    }

    public moveChip(oldPosition:number,newPosition:number) {
        // let yPosition:number;
        // let newSector:Sector = this.arraySectors[newPosition];
        // //
        // // console.log();
        // // if(newSector.position.y == 745){//условие создано для того что бы правильно рассчитывать координату y
        // //     yPosition =(newSector.position.y-30)- this.OFFSET * this.arrayChips[newPosition].length;
        // // }else {
        // //     yPosition =(newSector.position.y*2) + this.OFFSET * this.arrayChips[newPosition].length;
        // // }
        let oldChip:Chip = this.arrayChips[oldPosition].pop();
        this.addChild(oldChip);
        let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
        let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;

        TweenLite.to(oldChip, 0.5, {
            x: newPositionX,
            y: newPositionY,
            onStart:this.sound.playSoundMoveChip()
        });

        this.arrayChips[newPosition].push(oldChip);
        this.countClick = 0;
    }

    public highlightSector(sectorIndex: number, dice: any) {
        //подсветка секторов
        let oneWay:number;
        let secondWay:number;
        let thirdWay:number;

        if(this.selectChipWhite){
            oneWay = sectorIndex + dice[1];
            secondWay = sectorIndex + dice[0];
            thirdWay = sectorIndex + dice[1] + dice[0];
        }else {
            oneWay = sectorIndex - dice[1];
            secondWay = sectorIndex - dice[0];
            thirdWay = sectorIndex - dice[1] - dice[0];
        }

        if(this.arrayChips[oneWay].length!=0){
            if(this.arrayChips[oneWay][0].colorChipWhite == this.selectChipWhite){
                this.arraySectors[oneWay].highlightMove();
            }else {
                this.arraySectors[oneWay].highlightAttack();
            }
        }else {
            this.arraySectors[oneWay].highlightMove();
        }
        if(this.arrayChips[secondWay].length!=0){
            if(this.arrayChips[secondWay][0].colorChipWhite==this.selectChipWhite){
                this.arraySectors[secondWay].highlightMove();
            }else {
                this.arraySectors[secondWay].highlightAttack();
            }
        }else {
            this.arraySectors[secondWay].highlightMove();
        }
        if(this.arrayChips[thirdWay].length!=0){
            if(this.arrayChips[thirdWay][0].colorChipWhite==this.selectChipWhite){
                this.arraySectors[thirdWay].highlightMove();
            }else {
                this.arraySectors[thirdWay].highlightAttack();
            }
        }else {
            this.arraySectors[thirdWay].highlightMove();
        }

    }

    public arrayDicaOfSrtingDice(diceFromGame:string){
        this.diceFromServer = diceFromGame.split(',');
    }

}


