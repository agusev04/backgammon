
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

import {Chip} from "./Chip";

import {Sector} from "./Sector";
import InteractionData = PIXI.interaction.InteractionData;
import Point = PIXI.Point;
import {Sound} from "./Sound";

//TODO если делаю отмену клика и в этот момент есть кто то в тюрьме то хуй мы походим больше
//TODO eсли черная фишка выходит из тюрьмы то есть какой то рамс с последующими ходами надо исправить
//TODO исправить метод для звука
//TODO сделать выход фишек с поля
//TODO сделать нумерацию секторов от 1 легче будет считать плюс серверники считают от 1
//TODO если мы отменим клик с фишки которая в тюрьме можно будет пользоваться любой фишкой

export class Board extends Container {
    public static EVENT_END_OF_TURN:string = 'EndOfTurn';
    public static EVENT_MOVE_CHIP:string = 'moveChip';

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
    public sectorJailWhite:number = 24;
    public sectorJailBlack:number = 25;
    public whiteIsJail:boolean;


    private _isActive:boolean;
    private _activeMoves:number;
    private _activeDices:number[];
    private _activColor:number;


    // ----------Массив с фишками(два последних Тюрьма)-------------
    public arrayChips: any[] = [
        [new Chip(true), new Chip(true)]
        , [], [], [], [],
        [new Chip(false), new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
        [],
        [new Chip(false), new Chip(false), new Chip(false)],
        [], [], [],
        [new Chip(true), new Chip(true), new Chip(true), new Chip(true), new Chip(true)],
        [new Chip(false), new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
        [], [], [],
        [new Chip(true), new Chip(true), new Chip(true)],
        [],
        [new Chip(true), new Chip(true), new Chip(true), new Chip(true), new Chip(true)],
        [], [], [], [],
        [new Chip(false), new Chip(false)],
        [],
        []
    ];
    // ----------Массив секторов которые отслеживают клики на поле(на доске они скрыты)-(два последних Тюрьма)------------
    public arraySectors: any[] = [new Sector(0), new Sector(1), new Sector(2), new Sector(3), new Sector(4), new Sector(5), new Sector(6), new Sector(7), new Sector(8), new Sector(9), new Sector(10), new Sector(11), new Sector(12),
        new Sector(13), new Sector(14), new Sector(15), new Sector(16), new Sector(17), new Sector(18), new Sector(19), new Sector(20), new Sector(21), new Sector(22), new Sector(23),new Sector(24),new Sector(25)];

    // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек(два последних Тюрьма)-------------
    public arrayPositionPoint: Point[] = [new PIXI.Point(872,60),new PIXI.Point(815,60),new PIXI.Point(753,60),new PIXI.Point(696,60),new PIXI.Point(636,60),new PIXI.Point(578,60),new PIXI.Point(450,60),new PIXI.Point(390,60),new PIXI.Point(330,60),
        new PIXI.Point(270,60),new PIXI.Point(210,60),new PIXI.Point(155,60),new PIXI.Point(155,715),new PIXI.Point(210,715),new PIXI.Point(270,715),new PIXI.Point(330,715),new PIXI.Point(390,715),new PIXI.Point(450,715),new PIXI.Point(578,715),new PIXI.Point(636,715),
        new PIXI.Point(696,715),new PIXI.Point(753,715),new PIXI.Point(815,715),new PIXI.Point(872,715),new PIXI.Point(515,30),new PIXI.Point(515,715)];

    constructor() {
        super();
        this.bg.texture = this.bg_skin;
        this.addChild(this.bg);
        this.listenClick();
        this.drawSectors();
        this.drawState();
        this.deactivationAllSectors(); //убираю интерактив с секторов

    }

    //-----------------Блок отрисовки элементов на доске начало---------------------
    private setPosition() {
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

    private drawState() {
        //задает позицию фишек и рисует фишки
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                this.setPosition();
                this.addChild(this.arrayChips[i][j]);
            }
        }
    }

    private setPositionSectors() {
        //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
        for (let i = 0; i < this.arrayPositionPoint.length; i++) {
            if (i >= 0 && i < 12) {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 30);
            }else {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 745);
                this.arraySectors[i].rotation = -3.14;
            }
        }
        this.arraySectors[this.sectorJailWhite].rotation = 0;
        this.arraySectors[this.sectorJailWhite].position.set(this.arrayPositionPoint[24].x,this.arrayPositionPoint[24].y);     //Jail
        this.arraySectors[this.sectorJailBlack].position.set(this.arrayPositionPoint[25].x,this.arrayPositionPoint[25].y);    //Jail
    }

    private drawSectors() {
        //задает позицию сектора и добовляет его на доску
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.setPositionSectors();
            this.addChild(this.arraySectors[i]);
        }
    }
    //-----------------Блок отрисовки элементов на доске конец---------------------

    //-----------------Блок деактивации элементов на доске начало---------------------
    private deactivationSectorsAndJail(){
        if(this.arrayChips[this.sectorJailWhite].length != 0 || this.arrayChips[this.sectorJailBlack].length!=0){
            for (let i = 0; i < 24; i++) {              //24 и 25 сектор это тюрьма.Убираю интерактив со всех секторов кроме тюрьмы
                this.arraySectors[i].interactiveOff();
            }
        }

    }

    private deactivationChip() {
        //делаю фишку не активной
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

    private deactivationAllSectors(){
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].interactiveOff();
        }

    }

    private turnDependsOfTheColor(){
        let colorChip:boolean;              //перевод цвета из 0 и 1 в true false мне так удобнее


        switch (this._activColor){
            case 0: colorChip = true;
                break;
            case 1:colorChip = false;
                break;
        }
        for (let i = 0; i < this.arrayChips.length; i++) {
            if(this.arrayChips[i].length!=0){
                if(this.arrayChips[i][0].colorChipWhite==colorChip){
                    this.arraySectors[i].interactiveOn();


                }else
                {
                    this.arraySectors[i].interactiveOff();
                }

            }

        }
    }

    private offHighLightSectors(){
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].greenTrianglSprite.visible = false;
            this.arraySectors[i].yellowTrianglSprite.visible = false;
        }
    }
    //-----------------Блок деактивации элементов на доске конец---------------------


    public startTurn(firsDice:number,secondDice:number,activColor:number){ //начало хода

        this.setDice(firsDice,secondDice);
        this._activColor = activColor;
        this.turnDependsOfTheColor();
        this.deactivationSectorsAndJail();
    }

    private endOfTurn(){
        if (!this._isActive||this._activeMoves<0)
        {
            this._activeMoves= 0;
            this.deactivationAllSectors();
            this.deactivationSectorsAndJail();
            this.emit(Board.EVENT_END_OF_TURN);
        }
    }

    private listenClick() {
        //слушает клики на секторе
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].on('click',this.sectorClick,this);
        }
    }

    private sectorClick(data: InteractionData): void {
        //тут начинается магия

        if (this.countClick == 0) {
            this.countClick++;
            this.sound.playSoundClickChip();
            this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target);    // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
            if(this.arraySectors.indexOf(data.target)==24){ //костыль =) пока так пусть будет времени небыло думать
                this.whiteIsJail = true;
            }
            this.selectChip(this.firsSelectSectorIndex);    //в этом методе фишка меняет скин на зеленый (активный)
            this.deactivationAllSectors();//убираю интерактив после выбора фишки со всех секторов кроме подсвеченных и кроме того на котором фишка стоит что бы можно было отметить выбранную фишку
            this.arraySectors[this.firsSelectSectorIndex].interactiveOn();

            this.highlightSector(this.firsSelectSectorIndex);

        } else if (this.countClick == 1) {

            this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
            if(this.firsSelectSectorIndex == this.secondSelectSectorIndex){
                this.sound.playSoundClickChip();
                this.deactivationChip();    //делаю фишку не активной
                this.offHighLightSectors();  //отключаю подсветку
                this.turnDependsOfTheColor();
                this.countClick = 0;
            }else {
                // this.moveChip(this.firsSelectSectorIndex,this.secondSelectSectorIndex);
                    this.emit(Board.EVENT_MOVE_CHIP, {
                        CLASS_NAME: 'MoveAction',
                        from: this.firsSelectSectorIndex,
                        to: this.secondSelectSectorIndex
                    });
                this.deactivationChip();    //делаю фишку не активной
                // this.endOfTurn()
            }
        }

    }

    private selectChip(selectSectorIndex:number) {
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

    public getChipPosition(sectorIndex:number,chipIndex:number):Point{
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
    public moveOpponentChip(fromSector:number, toSector:number){
        let opponentChip:Chip = this.arrayChips[fromSector].pop();
        this.addChild(opponentChip);
        let newPosition =this.getChipPosition(toSector,this.arrayChips[toSector].length);
        this.animationMoveChip(opponentChip,newPosition.x,newPosition.y);
        this.arrayChips[toSector].push(opponentChip);
        console.log('Сообщение из борда: moveOpponentChip from '+fromSector+' to '+toSector);
    }

    private animationMoveChip(Chip:any,x:any,y:any){
        TweenLite.to(Chip, 0.5, {
            x: x,
            y: y,
            onStart:this.sound.playSoundMoveChip()
        });
    }

    private setDice(first:number,second:number){
        this.dice[0] = first;
        this.dice[1] = second;
        this._activeDices = [];
        if (first == second)
        {
            this._activeMoves = first * 4;
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first * 2);
            this._activeDices.push(first * 2);
            this._activeDices.push(first * 3);
            this._activeDices.push(first * 4);
        }
        else
        {
            this._activeDices.push(first);
            this._activeDices.push(second);
            this._activeDices.push(first + second);
            this._activeMoves = first + second;
        }
        console.log('Кол-во возможных ходов: ', this._activeMoves, );
        console.log('Активные кубики: ', this._activeDices);
        this._isActive = this._activeMoves != 0;
    }

    public moveChip(oldPosition:number,newPosition:number) { //Буду причесывать еще эту функцию сделал на скорую руку

        if( this.arrayChips[newPosition].length == 1 && this.arrayChips[oldPosition][0].colorChipWhite != this.arrayChips[newPosition][0].colorChipWhite)
        {
            let positionJail_X:number;
            let positionJail_Y:number;

            let oldChip:Chip = this.arrayChips[oldPosition].pop();
            this.addChild(oldChip);

            let opponentChip:Chip = this.arrayChips[newPosition][0];
            this.addChild(opponentChip);

            switch (opponentChip.colorChipWhite){
                case true:
                    this.arrayChips[this.sectorJailWhite].push(opponentChip);
                    positionJail_X = this.getChipPosition(this.sectorJailWhite,this.arrayChips[this.sectorJailWhite].length).x;
                    positionJail_Y = this.getChipPosition(this.sectorJailWhite,this.arrayChips[this.sectorJailWhite].length).y;
                    break;
                case false:
                    this.arrayChips[this.sectorJailBlack].push(opponentChip);
                    positionJail_X = this.getChipPosition(this.sectorJailBlack,this.arrayChips[this.sectorJailBlack].length).x;
                    positionJail_Y = this.getChipPosition(this.sectorJailBlack,this.arrayChips[this.sectorJailBlack].length).y;
            }
            this.arrayChips[newPosition].pop();
            this.animationMoveChip(opponentChip,positionJail_X,positionJail_Y);

            let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
            let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;
            this.animationMoveChip(oldChip,newPositionX,newPositionY);
            this.arrayChips[newPosition].push(oldChip);

            let currentMove:number;

            if(this.whiteIsJail){
                currentMove = newPosition+1;
                this.whiteIsJail=false;
            }else {
                currentMove = Math.abs(newPosition - oldPosition);
            }
            this._activeMoves -= currentMove;
            this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
            this._activeDices = this._activeDices.filter(function(number) {
                return number <= this._activeMoves;
            }, this);
            console.log('Сделан ход: ', currentMove);
            console.log('Кол-во возможных ходов: ', this._activeMoves, );
            console.log('Активные кубики: ', this._activeDices);
            this._isActive = this._activeMoves != 0;
            // this.endOfTurn();
            this.countClick = 0;
        }
        else{
            let oldChip:Chip = this.arrayChips[oldPosition].pop();
            this.addChild(oldChip);
            let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
            let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;
            this.animationMoveChip(oldChip,newPositionX,newPositionY);
            this.arrayChips[newPosition].push(oldChip);
            let currentMove:number;
            if(this.whiteIsJail){
                currentMove = newPosition+1;
                this.whiteIsJail=false;
            }else {
                currentMove = Math.abs(newPosition - oldPosition);
            }
            this._activeMoves -= currentMove;
            this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
            this._activeDices = this._activeDices.filter(function(number) {
                return number <= this._activeMoves;
            }, this);
            console.log('Сделан ход: ', currentMove);
            console.log('Кол-во возможных ходов: ', this._activeMoves, );
            console.log('Активные кубики: ', this._activeDices);
            this._isActive = this._activeMoves != 0;
            // this.endOfTurn();
            this.countClick = 0;
        }
        this.offHighLightSectors();  //отключаю подсветку
        this.turnDependsOfTheColor();
        this.endOfTurn();

    }

    private highlightSector(sectorIndex: number) {
        if (this.selectChipWhite)
        {
            this._activeDices.forEach(function (element)
            {
                if (sectorIndex + element < 24){
                    this.calculateHighlights(sectorIndex + element);
                }else if(sectorIndex == 24){
                    this.calculateHighlights(element-1);
                }

            }, this);

        }
        else
        {
            this._activeDices.forEach(function (element)
            {
                if(sectorIndex == 25){
                    this.calculateHighlights( 24-element);
                }else
                    this.calculateHighlights(sectorIndex - element);

            }, this);
        }

    }

    private calculateHighlights(way:number)
    {
        if(this.arrayChips[way].length!=0)
        {
            if(this.arrayChips[way][0].colorChipWhite == this.selectChipWhite)
            {
                this.arraySectors[way].highlightMove();
            }
            else
            if(this.arrayChips[way].length == 1){
                this.arraySectors[way].highlightAttack();
            }
        }
        else
        {
            this.arraySectors[way].highlightMove();
        }
    }

}