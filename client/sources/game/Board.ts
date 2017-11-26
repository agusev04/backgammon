
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

import {Chip} from "./Chip";

import {Sector} from "./Sector";
import InteractionData = PIXI.interaction.InteractionData;
import Point = PIXI.Point;
import {Sound} from "./Sound";



//TODO исправить метод для звука

//TODO если мы отменим клик с фишки которая в тюрьме можно будет пользоваться любой фишкой

export class Board extends Container {
    public static EVENT_END_OF_TURN:string = 'EndOfTurn';
    public static EVENT_MOVE_CHIP:string = 'MoveAction';

    public bg_skin: Texture = Texture.fromImage('assets/bg.png');
    public bg: Sprite = new Sprite(PIXI.Texture.WHITE);
    public metaDice1: number;
    public metaDice2: number;
    public OFFSET: number = 30;
    public countClick: number = 0;
    public chipSelectGo: boolean;
    public tl = new TimelineLite();
    public selectChipWhite: boolean;
    public firsSelectSectorIndex:any;
    public secondSelectSectorIndex:any;
    public sound:Sound = new Sound();
    public sectorJailWhite:number = 0;
    public sectorJailBlack:number = 25;
    public _chipsOnTheLeft = 0;
    public _chipsOnTheRight = 0;
    private _exitWhite:number = 26;
    private _exitBlack:number = 27;
    private _countExitWhite:number;
    private _countExitBlack:number;
    private _maxDice:number = 0;
    private _minDice:number;
    private _isActive:boolean;
    private _activeMoves:number;
    private _activeDices:number[];
    private _activColor:number;



    public arrayChips: any[] = [
        [],
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
        [],[],[]
    ];
//arrayChips
//     public arrayChips: any[] = [
//         [],
//         [new Chip(false), new Chip(false),new Chip(false)],
//
//         [new Chip(false), new Chip(false),new Chip(false), new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
//         [], [new Chip(false), new Chip(false), new Chip(false), new Chip(false)],
//         [],
//         [ new Chip(false)],
//         [],
//         [],
//         [], [], [],
//         [],
//         [],
//         [], [], [],
//         [],
//         [],
//         [],
//         [ new Chip(true),new Chip(true), new Chip(true)],
//         [],
//         [new Chip(true),new Chip(true),new Chip(true)],
//         [ new Chip(true),new Chip(true), new Chip(true),new Chip(true)],
//         [new Chip(true), new Chip(true), new Chip(true), new Chip(true), new Chip(true), ],
//         [],[],[]
//     ];

    // ----------Массив секторов которые отслеживают клики на поле(на доске они скрыты)-(0 и 25 Тюрьма)------------
    public arraySectors: any[] = [new Sector(),new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(),
        new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(),new Sector(),new Sector(),new Sector()];

    // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек(0 и 25 Тюрьма)-------------
    public arrayPositionPoint: Point[] = [new PIXI.Point(515,30),new PIXI.Point(872,60),new PIXI.Point(815,60),new PIXI.Point(753,60),new PIXI.Point(696,60),new PIXI.Point(636,60),new PIXI.Point(578,60),new PIXI.Point(450,60),new PIXI.Point(390,60),new PIXI.Point(330,60),
        new PIXI.Point(270,60),new PIXI.Point(210,60),new PIXI.Point(155,60),new PIXI.Point(155,715),new PIXI.Point(210,715),new PIXI.Point(270,715),new PIXI.Point(330,715),new PIXI.Point(390,715),new PIXI.Point(450,715),new PIXI.Point(578,715),new PIXI.Point(636,715),
        new PIXI.Point(696,715),new PIXI.Point(753,715),new PIXI.Point(815,715),new PIXI.Point(872,715),new PIXI.Point(515,715),new PIXI.Point(976,500),new PIXI.Point(976,50)];

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
                if (i >= 1 && i < 13) {
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
            if (i >= 1 && i < 13) {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 30);
            }else {
                this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 745);
                this.arraySectors[i].rotation = -3.14;
            }
        }
        this.arraySectors[this.sectorJailWhite].rotation = 0;
        this.arraySectors[this.sectorJailWhite].position.set(this.arrayPositionPoint[this.sectorJailWhite].x,this.arrayPositionPoint[this.sectorJailWhite].y);     //Jail
        this.arraySectors[this.sectorJailBlack].position.set(this.arrayPositionPoint[this.sectorJailBlack].x,this.arrayPositionPoint[this.sectorJailBlack].y);    //Jail
        this.arraySectors[this._exitBlack].rotation = 0;
        this.arraySectors[this._exitWhite].rotation = 0;
        this.arraySectors[this._exitWhite].position.set(this.arrayPositionPoint[this._exitWhite].x,this.arrayPositionPoint[this._exitWhite].y);
        this.arraySectors[this._exitBlack].position.set(this.arrayPositionPoint[this._exitBlack].x,this.arrayPositionPoint[this._exitBlack].y);
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
    // private deactivationSectorsAllbutSectorWithChip(){
    //     if(this._activColor==1){
    //         for (let i = 0; i<=25 ; i++) {
    //             if(this.arrayChips[i].length!=0){
    //                 if(this.arrayChips[i][0].colorChipWhite){
    //                     this.arraySectors[i].interactiveOff();
    //                 }else {
    //                     this.arraySectors[i].interactiveOn();
    //                 }
    //             }
    //         }
    //     }else if(this._activColor==0){
    //         for (let i = 0; i<=25 ; i++) {
    //             if(this.arrayChips[i].length!=0){
    //                 if(this.arrayChips[i][0].colorChipWhite){
    //                     this.arraySectors[i].interactiveOn();
    //                 }else {
    //                     this.arraySectors[i].interactiveOff();
    //                 }
    //             }
    //         }
    //     }
    // }

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
        // this.deactivationSectorsAndJail();

    }

    private endOfTurn(){
        //if (!this._isActive||this._activeMoves<0)
        if(this._activeDices.length==0)
        {
            this._activeMoves= 0;
            this.deactivationAllSectors();
            // this.deactivationSectorsAndJail();
            this.emit(Board.EVENT_END_OF_TURN);
            this._chipsOnTheLeft=0;
            this._chipsOnTheRight=0;
        }
    }

    private listenClick() {
        //слушает клики на секторе
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].on('pointerdown',this.sectorClick,this);
        }
    }

    private deselectChip(){
        this.sound.playSoundClickChip();
        this.deactivationChip();    //делаю фишку не активной
        this.offHighLightSectors();  //отключаю подсветку
        this.turnDependsOfTheColor();
        this.searchNeighbors();
        this._chipsOnTheLeft=0;
        this._chipsOnTheRight=0;
        this.countClick = 0;
    }

    private sectorClick(data: InteractionData): void {
        //тут начинается магия
        if (this.countClick == 0) {
            this.countClick++;



            // console.log('1  '+this.metaDice1);
            // console.log('2  '+this.metaDice2);


            this.sound.playSoundClickChip();
            this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target);    // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
            this.selectChip(this.firsSelectSectorIndex);    //в этом методе фишка меняет скин на зеленый (активный)
            this.deactivationAllSectors();//убираю интерактив после выбора фишки со всех секторов кроме подсвеченных и кроме того на котором фишка стоит что бы можно было отметить выбранную фишку
            this.arraySectors[this.firsSelectSectorIndex].interactiveOn();
            this.highlightSector(this.firsSelectSectorIndex);
            if(this._activColor==0){
                console.log('LEFT  '+this._chipsOnTheLeft,+'колличество фишек на этой позиции'+ this.arrayChips[this._chipsOnTheLeft].length);
                console.log('RIGHT  '+this._chipsOnTheRight,+'колличество фишек на этой позиции'+this.arrayChips[this._chipsOnTheRight].length );
            }else{
                console.log('LEFT  '+this._chipsOnTheLeft);
                console.log('RIGHT  '+this._chipsOnTheRight);
            }
        } else
            if (this.countClick == 1) {
            this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
            if(this.firsSelectSectorIndex == this.secondSelectSectorIndex) {
                this.deselectChip();
            } else{

                this.emit(Board.EVENT_MOVE_CHIP, {
                    CLASS_NAME: 'MoveAction',
                    from: this.firsSelectSectorIndex,
                    to: this.secondSelectSectorIndex
                });

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
        // console.log('Сообщение из борда: moveOpponentChip from '+fromSector+' to '+toSector);
    }

    private animationMoveChip(Chip:any,x:any,y:any){
        TweenLite.to(Chip, 0.5, {
            x: x,
            y: y,
            onStart:this.sound.playSoundMoveChip()
        });
    }

    public setDice(first:number,second:number){
        this.metaDice1 = this.metamorphose(first);
        this.metaDice2 = this.metamorphose(second);
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

    public moveChip(oldPosition:number,newPosition:number) {

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
            this.calculateMoves(newPosition,oldPosition);
            this.countClick = 0;
        }
        else{

            let oldChip:Chip = this.arrayChips[oldPosition].pop();
            this.addChild(oldChip);
            let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
            let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;
            this.animationMoveChip(oldChip,newPositionX,newPositionY);
            this.arrayChips[newPosition].push(oldChip);
            this.calculateMoves(newPosition,oldPosition);
            this.countClick = 0;
        }
        console.log('Фишек осталось  '+ this.arrayChips[oldPosition].length);
        this.offHighLightSectors();  //отключаю подсветку
        this.turnDependsOfTheColor();
        this.deactivationChip();    //делаю фишку не активной
        this.endOfTurn();
    }

    private highlightSector(sectorIndex: number) {
        if (this.selectChipWhite)
        {
            this._activeDices.forEach(function (element)
            {
                if (sectorIndex + element <= 24)
                    this.calculateHighlights(sectorIndex + element);
                if(this.pokaAllHome()==15){
                    if(this._chipsOnTheLeft==0) {
                        if(sectorIndex==this._chipsOnTheRight){
                            this.calculateHighlights(26);
                        }
                    }
                    this.hilightsOut(26);
                }
            }, this);

        }
        else
        {
            this._activeDices.forEach(function (element)
            {
                if (sectorIndex - element != 0 && sectorIndex - element > 0)
                    this.calculateHighlights(sectorIndex - element);
                if(this.pokaAllHome()==15){
                    if(this._chipsOnTheLeft==0) {
                        if(sectorIndex==this._chipsOnTheRight){
                            this.calculateHighlights(27);
                        }
                    }
                    this.hilightsOut(27);
                }
            }, this);
        }

    }

    private calculateHighlights(way:number) {

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

    private hilightsOut(way:number){
        let metamorfSelectIndex= this.firsSelectSectorIndex;
        if(this.selectChipWhite){
            switch(this.firsSelectSectorIndex){
                case 19:metamorfSelectIndex = 6;
                break;
                case 20:metamorfSelectIndex = 5;
                    break;
                case 21:metamorfSelectIndex = 4;
                    break;
                case 22:metamorfSelectIndex = 3;
                    break;
                case 23:metamorfSelectIndex = 2;
                    break;
                case 24:metamorfSelectIndex = 1;
                    break;
                default:;
            }
        }
        for(let i = 0 ; i < this._activeDices.length; i++){
            if(metamorfSelectIndex == this._activeDices[0]||metamorfSelectIndex == this._activeDices[1]){
                this.arraySectors[way].highlightMove();
            }
        }
    }

    private pokaAllHome():number{
        let countChipInHome:number;
        countChipInHome = 0 ;
        if(this._activColor == 0){
            for (let i = 19; i <= 24; i++){
                if(this.arrayChips[i].length!=0){
                    if(this.arrayChips[i][0].colorChipWhite == true){
                        countChipInHome+= this.arrayChips[i].length;
                    }
                }
            }countChipInHome+=this.arrayChips[this._exitWhite].length
        }else if(this._activColor == 1){
            for (let i = 1; i <= 6; i++){
                if(this.arrayChips[i].length!=0){
                    if(this.arrayChips[i][0].colorChipWhite == false){
                        countChipInHome+= this.arrayChips[i].length;
                    }
                }
            }countChipInHome+=this.arrayChips[this._exitBlack].length
        }

        this.searchNeighbors();

        return countChipInHome;
    }

    private searchNeighbors(){
        let DiceArray = [this._activeDices[0],this._activeDices[1]];
        function getMaxOfArray(numArray:any):number {
            return Math.max.apply(null, numArray);
        }
        if(this._activeDices.length ==1 ){
            this._maxDice = this._activeDices[0];
        }else {
            this._maxDice = getMaxOfArray(DiceArray);
        }
        console.log('Макс по взрослоу   '+this._maxDice);
        //
        // let temp:number[] = [this._activeDices[0],this._activeDices[1]];
        // this._maxDice = getMaxOfArray(temp);
        // console.log('МАКС ДРУГОЙ'+ this._maxDice);
        // if(this._maxDice == NaN){
        //     this._maxDice=this._activeDices[0];
        // }
        // console.log('МАКС ДРУГОЙ2'+ this._maxDice);
        // let DiceArray = [this._activeDices[0],this._activeDices[1]];

        // function getMaxOfArray(numArray:any):number {
        //     return Math.max.apply(null, numArray);
        // }
        // function getMinOfArray(numArray:any):number {
        //     return Math.min.apply(null, numArray);
        // }

        // this._minDice = getMinOfArray(DiceArray);
        // this._maxDice = getMaxOfArray(DiceArray);

        if(this._activColor==0){

            //
            // // if(this._activeDices[0]==undefined){
            // //     max = this._activeDices[1];
            // //     max1 = this._activeDices[1];
            // // }else if(this._activeDices[1]==undefined) {
            // //     max = this._activeDices[0];
            // //     max1 = this._activeDices[0];
            // // }else
            // if(this._activeDices[0]>this._activeDices[1]){
            //     max=this._activeDices[0];
            //     max1=this._activeDices[0];
            // }else{
            //     max=this._activeDices[1];
            //     max1=this._activeDices[1];
            // }
            let max=this._maxDice;
            let max1=this._maxDice;

            for(max1;max1<=6;max1++){
                if(this.arrayChips[this.metamorphose(max1)].length!=0){
                    let x = this.metamorphose(max1);
                    this._chipsOnTheLeft = x;
                }else {
                    this._chipsOnTheLeft=0;
                }
            }console.log('белые лефт  '+ this._chipsOnTheLeft);

            for(max;max>=1;max--){
                if(this.arrayChips[this.metamorphose(max)].length!=0){
                    this._chipsOnTheRight= this.metamorphose(max);
                    break;
                }
            }console.log('белые райт  '+ this._chipsOnTheRight);


        }else  {
            let max=this._maxDice;
            let max1=this._maxDice;

                for(max1;max1>=1;max1--){
                    if(this.arrayChips[max1].length!=0){
                        this._chipsOnTheRight= max1;
                        break;
                    }
                }console.log('черные райт  '+ this._chipsOnTheRight);
                for(max;max<=6;max++){
                    if(this.arrayChips[max].length==0) {
                        this._chipsOnTheLeft = 0;
                    }else {
                        this._chipsOnTheLeft=max;
                    }
                }console.log('черные лефт  '+ this._chipsOnTheLeft);
            }
        }




    public metamorphose(x:number):number{
        let metX:number;
        switch(x){
            case 6:metX = 19;
                break;
            case 5:metX = 20;
                break;
            case 4:metX = 21;
                    break;
            case 3:metX = 22;
                    break;
            case 2:metX = 23;
                    break;
            case 1:metX = 24;
                    break;
            default:;

        }
        return metX;
    }

    private calculateMoves(newPosition:number,oldPosition:number){

        switch (newPosition){
            case this._exitBlack: newPosition = 0;
            break;
            case this._exitWhite: newPosition = 25;
            break;
            default:;
        }

        // if(oldPosition!=this._chipsOnTheRight){
        //         console.log('ТЫ ТУТ СК');
        //         this._activeMoves -= this._maxDice;
        //         this._activeDices.splice(this._activeDices.indexOf(this._maxDice), 1);
        //         this._activeDices = this._activeDices.filter(function(number) {
        //             return number <= this._activeMoves;
        //         }, this);
        //         this._isActive = this._activeMoves != 0;
        // }
        // else {





        var currentMove:number;
        currentMove = Math.abs(newPosition - oldPosition);
        this._activeMoves -= currentMove;
        this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
        this._activeDices = this._activeDices.filter(function(number) {
            return number <= this._activeMoves;
        }, this);
        this._isActive = this._activeMoves != 0;

        // }




        console.log('Сделан ход: '+currentMove);
        console.log('Кол-во возможных ходов: '+this._activeMoves );
        console.log('Активные кубики: '+this._activeDices);

    }
}