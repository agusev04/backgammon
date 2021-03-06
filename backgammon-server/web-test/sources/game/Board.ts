
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Chip} from "./Chip";
import {Sector} from "./Sector";
import InteractionData = PIXI.interaction.InteractionData;
import Point = PIXI.Point;
import {Sound} from "./Sound";
import {Game} from "../Game";
import Sprite2d = PIXI.projection.Sprite2d;
import Container2d = PIXI.projection.Container2d;


export class Board extends Container2d {
    public static EVENT_END_OF_TURN:string = 'EndOfTurn';
    public static EVENT_MOVE_CHIP:string = 'MoveChip';
    public static EVENT_GAME_END:string = 'GameEnd';


    private  _newBg:Sprite;
    private  _OFFSET: number = 30;
    private  _countClick: number = 0;
    private  _selectChipColor:string;
    private  _firsSelectSectorIndex:any;
    private  _secondSelectSectorIndex:any;
    private  sound:Sound = new Sound();
    private  _sectorJailWhite:number = 0;
    private  _sectorJailBlack:number = 25;
    private  _chipsOnTheLeft = 0;
    private _chipsOnTheRight = 0;
    private _exitWhite:number = 26;
    private _exitBlack:number = 27;
    private _maxDice:number = 0;
    private _minDice:number;
    private _isActive:boolean;
    private _activeMoves:number;
    private _activeDices:number[];
    private _activColor:number;
    private _container:Container2d;
    private _currentMove:number;
    private _maxCube:number;
    private _minCube:number;
    private _lastCube:number;
    // public arrayChips: any[] = [
    //     [],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)]
    //     , [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)], [new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [],[],[]
    // ];


    // public arrayChips: any[] = [
    //     [],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)]
    //     , [], [], [], [],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [], [], [],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [], [], [],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE)],
    //     [], [], [], [],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [],[],[]
    // ];

    private arrayChips: any[] = [
        [],
        [],[],[],[],[],
        [],[],[],[],[],
        [],[],[],[],[],
        [],[],[],[],[],
        [],[],[],[],
        [],
        [],[]
    ];

    // public arrayChips: any[] = [
    //     [],
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK),new Chip(Chip.COLOR_BLACK)],
    //
    //     [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK),new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [], [new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK), new Chip(Chip.COLOR_BLACK)],
    //     [],
    //     [ new Chip(Chip.COLOR_BLACK)],
    //     [],
    //     [],
    //     [], [], [],
    //     [],
    //     [],
    //     [], [], [],
    //     [],
    //     [],
    //     [],
    //     [],
    //     [],
    //     [new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE)],
    //     [new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE),new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE) ],
    //     [new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), new Chip(Chip.COLOR_WHITE), ],
    //     [],[],[]
    // ];

    // ----------Массив секторов которые отслеживают клики на поле(на доске они скрыты)-(0 и 25 Тюрьма)------------
    public arraySectors: any[] = [new Sector(),new Sector(), new Sector(), new Sector(),
        new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(),
        new Sector(), new Sector(), new Sector(), new Sector(),
        new Sector(), new Sector(), new Sector(), new Sector(), new Sector(), new Sector(),
        new Sector(), new Sector(), new Sector(), new Sector(), new Sector(),new Sector(),new Sector(),new Sector()];

    // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек(0 и 25 Тюрьма)-------------
    public arrayPositionChip: Point[] = [
        new PIXI.Point(515,165),

        new PIXI.Point(820,165), new PIXI.Point(768,165),new PIXI.Point(718,165), new PIXI.Point(665,165),
        new PIXI.Point(615,165), new PIXI.Point(565,165),new PIXI.Point(468,165), new PIXI.Point(418,165),
        new PIXI.Point(367,165), new PIXI.Point(315,165),new PIXI.Point(265,165),new PIXI.Point(215,165),

        new PIXI.Point(215,618), new PIXI.Point(268,618),new PIXI.Point(318,618),new PIXI.Point(368,618),
        new PIXI.Point(418,618), new PIXI.Point(468,618),new PIXI.Point(565,618),new PIXI.Point(615,618),
        new PIXI.Point(665,618),new PIXI.Point(715,618),new PIXI.Point(765,618),new PIXI.Point(815,618),

        new PIXI.Point(515,618),

        new PIXI.Point(885,628),new PIXI.Point(885,313)];

    public arrayPositionSector: Point[] = [
        new PIXI.Point(515,250),

        new PIXI.Point(811,250), new PIXI.Point(762,250),new PIXI.Point(710,250), new PIXI.Point(660,250),
        new PIXI.Point(610,250), new PIXI.Point(560,250),new PIXI.Point(463,250), new PIXI.Point(412,250),
        new PIXI.Point(363,250), new PIXI.Point(310,250),new PIXI.Point(260,250),new PIXI.Point(210,250),

        new PIXI.Point(220,535), new PIXI.Point(270,535),new PIXI.Point(320,535),new PIXI.Point(370,535),
        new PIXI.Point(422,535), new PIXI.Point(470,535),new PIXI.Point(565,535),new PIXI.Point(615,535),
        new PIXI.Point(665,535),new PIXI.Point(715,535),new PIXI.Point(765,535),new PIXI.Point(815,535),

        new PIXI.Point(515,535),

        new PIXI.Point(885,550),new PIXI.Point(885,235)];

    constructor() {
        super();

        this.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
        this._newBg = new Sprite(Texture.fromImage('assets/bg.png'));
        this._newBg.position.set( - Game.WIDTH / 2 , -Game.HEIGHT / 2);
        this.addChild(this._newBg);
        this._container = new Container2d();
        this._container.position.set( - Game.WIDTH / 2 , -Game.HEIGHT / 2);
        this.addChild(this._container);
        let bg:Sprite2d = new Sprite2d(Texture.WHITE);
        bg.alpha = 0;
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;
        this._container.addChild(bg);
        this.drawSectors();
        this.drawState();
        this.listenClick();
        this.deactivationAllSectors();
        this.addListener("added", this.eventListenerAdded, this)
    }

    private eventListenerAdded():void
    {
        this.proj.clear();
        this.updateTransform();
        this.proj.setAxisY(new Point(0, 1650),-1);
    }

    //-----------------Блок отрисовки элементов на доске начало---------------------

    public setState(chipPos:any){
        for (let i = 0; i < chipPos.length; i++) {
            for (let j = 0; j < chipPos[i].length; j++) {
                if(chipPos[i].length==0){
                    this.arrayChips.push([]);
                }else if(chipPos[i][j] == 0){
                    this.arrayChips[i].push(new Chip(Chip.COLOR_WHITE));
                }else if(chipPos[i][j] == 1){
                    this.arrayChips[i].push(new Chip(Chip.COLOR_BLACK))
                }
            }
        }
    }

    private setPosition():void {
        //задает позицию фишек
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                if (i >= 1 && i < 13) {
                    this.arrayChips[i][j].position.set(this.arrayPositionChip[i].x,this.arrayPositionChip[i].y + this._OFFSET * j);
                } else {
                    this.arrayChips[i][j].position.set(this.arrayPositionChip[i].x,this.arrayPositionChip[i].y - this._OFFSET * j);
                }
            }
        }
    }

    public drawState():void {
        //задает позицию фишек и рисует фишки
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                this.setPosition();
                this._container.addChild(this.arrayChips[i][j]);
            }
        }
    }

    private setPositionSectors():void {
        //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
        for (let i = 0; i < this.arrayPositionSector.length; i++) {
            if (i >= 1 && i < 13) {
                this.arraySectors[i].position.set(this.arrayPositionSector[i].x,this.arrayPositionSector[i].y);
                this.arraySectors[i].rotation = -3.14;
            }else {
                this.arraySectors[i].position.set(this.arrayPositionSector[i].x, this.arrayPositionSector[i].y);
            }
        }
        this.arraySectors[this._sectorJailWhite].rotation = -3.14;
        this.arraySectors[this._sectorJailWhite].position.set(this.arrayPositionSector[this._sectorJailWhite].x,this.arrayPositionSector[this._sectorJailWhite].y);     //Jail
        this.arraySectors[this._sectorJailBlack].position.set(this.arrayPositionSector[this._sectorJailBlack].x,this.arrayPositionSector[this._sectorJailBlack].y);    //Jail
        this.arraySectors[this._exitBlack].rotation = -3.14;
        this.arraySectors[this._exitWhite].position.set(this.arrayPositionSector[this._exitWhite].x,this.arrayPositionSector[this._exitWhite].y);
        this.arraySectors[this._exitBlack].position.set(this.arrayPositionSector[this._exitBlack].x,this.arrayPositionSector[this._exitBlack].y);
    }

    private drawSectors():void {

        for (let i = 0; i < this.arraySectors.length; i++) {
            this.setPositionSectors();
            this._container.addChild(this.arraySectors[i]);
        }
    }
    //-----------------Блок отрисовки элементов на доске конец---------------------

    //-----------------Блок деактивации элементов на доске начало---------------------

    private deactivationAllSectors():void{
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].interactiveOff();
        }
    }
    private deactivationSectorsColor(color:string):void{
        for (let i = 0; i < this.arrayChips.length; i++) {
            if(this.arrayChips[i].length != 0){
                if(this.arrayChips[i][0].color == color){
                    this.arraySectors[i].interactiveOff();
                }
            }
        }
    }
    private deactivationSectorsJails():void{
        if(this.arrayChips[this._sectorJailWhite].length !=0){
            if(this._activColor==0){
                this.deactivationSectorsColor(Chip.COLOR_WHITE);
                this.arraySectors[this._sectorJailWhite].interactiveOn();
            }
        }
        if(this.arrayChips[this._sectorJailBlack].length !=0){
            if(this._activColor==1){
                this.deactivationSectorsColor(Chip.COLOR_BLACK);
                this.arraySectors[this._sectorJailBlack].interactiveOn();
            }
        }
    }

    private turnDependsOfTheColor():void{

        let colorChip:string;              //перевод цвета из 0 и 1 в true false мне так удобнее
        switch (this._activColor){
            case 0: colorChip = 'white';
                break;
            case 1:colorChip = 'black';
                break;
        }
        for (let i = 0; i < this.arrayChips.length; i++) {
            if(this.arrayChips[i].length!=0){
                if(this.arrayChips[i][0]._color==colorChip){
                    this.arraySectors[i].interactiveOn();
                }else
                {
                    this.arraySectors[i].interactiveOff();
                }
            }
        }
    }

    private offHighLightSectors():void{
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].alpha = 0 ;
        }
    }
    //-----------------Блок деактивации элементов на доске конец---------------------

    public startTurn(firsDice:number,secondDice:number,activColor:number):void{ //начало хода
        this.setDice(firsDice,secondDice);
        this._activColor = activColor;
        this.turnDependsOfTheColor();
        this.deactivationSectorsJails();
    }
    public blockOfTurn():void{
        this.deactivationAllSectors();
        this._activeMoves = 0;
        this._activeDices = [];
        this.endOfTurn();
    }
    private endOfTurn():void{

        if(this.arrayChips[this._exitWhite].length == 15){
            console.log('Игра завершена белыми');
            this.emit(Board.EVENT_GAME_END,{
                CLASS_NAME: 'EndGame',
                color: 0
            });
        }else if(this.arrayChips[this._exitBlack].length == 15){
            console.log('Игра завершена черными');
            this.emit(Board.EVENT_GAME_END,{
                CLASS_NAME: 'EndGame',
                color: 1
            });
        }

        if(this._activeDices.length==0)
        {
            this._activeMoves= 0;
            this.deactivationAllSectors();
            this.emit(Board.EVENT_END_OF_TURN);
            this._chipsOnTheLeft=0;
            this._chipsOnTheRight=0;
        }
    }

    private listenClick():void {
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].on('pointerdown',this.sectorClick,this);
        }
    }

    private deselectChip(firsSelectSectorIndex:number):void{
        if(firsSelectSectorIndex != this._sectorJailBlack && firsSelectSectorIndex != this._sectorJailWhite){
            this.deactivationAllSectors();
            this.sound.playSoundClickChip();
            this.offHighLightSectors();  //отключаю подсветку
            this.turnDependsOfTheColor();
            this.searchNeighbors();
            this.arrayChips[firsSelectSectorIndex][this.arrayChips[firsSelectSectorIndex].length - 1 ].selected = false;
            this._chipsOnTheLeft=0;
            this._chipsOnTheRight=0;
            this._selectChipColor = '';
            this._countClick = 0;
        }
    }

    private sectorClick(data: InteractionData): void {
        if (this._countClick == 0) {
            this._firsSelectSectorIndex = this.arraySectors.indexOf(data.target);
            if(this._firsSelectSectorIndex == this._exitWhite || this._firsSelectSectorIndex == this._exitBlack){
                this.arraySectors[this._firsSelectSectorIndex].interactiveOff();
            }else {
                this._countClick++;
                this.sound.playSoundClickChip();
                this.selectChip(this._firsSelectSectorIndex);
                this.deactivationAllSectors();
                this.arraySectors[this._firsSelectSectorIndex].interactiveOn();
                this.pokaAllHome();
                this.highlightSector(this._firsSelectSectorIndex);
            }
        } else
            if (this._countClick == 1) {
            this._secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
            // console.log('сектор второй '+ this.secondSelectSectorIndex);
            if(this._firsSelectSectorIndex == this._secondSelectSectorIndex) {
                this.deselectChip(this._firsSelectSectorIndex);
            } else{

                let currentMove = Math.abs(this._firsSelectSectorIndex - this._secondSelectSectorIndex);

                switch (this._secondSelectSectorIndex)
                {
                    case this._exitBlack: this._secondSelectSectorIndex = 0;
                        if(this._firsSelectSectorIndex!=this._maxCube&&this._firsSelectSectorIndex>this._minCube){
                            currentMove = this._maxCube;
                        }else{
                            currentMove =  this._firsSelectSectorIndex;
                        }

                        break;
                    case this._exitWhite: this._secondSelectSectorIndex = 25;
                        if(this.metamorphoseForWhite(this._firsSelectSectorIndex)!=this._maxCube&&this.metamorphoseForWhite(this._firsSelectSectorIndex)>this._minCube){
                            currentMove = this._maxCube;
                        }else {
                            currentMove=this.metamorphoseForWhite(this._firsSelectSectorIndex);
                        }

                        break;
                }

                console.log('Сделан ход: '+currentMove);
                console.log('Кол-во возможных ходов: ', this._activeMoves, );
                console.log('Активные кубики: ', this._activeDices);
                this.emit(Board.EVENT_MOVE_CHIP, {
                    CLASS_NAME: 'MoveChip',
                    from: this._firsSelectSectorIndex,
                    cubeValues: currentMove
                });

                this._lastCube = currentMove;

                // this._activeMoves -= currentMove;
                // this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
                // this._activeDices = this._activeDices.filter(function(number) {
                //     return number <= this._activeMoves;
                // }, this);

                // this._isActive = this._activeMoves != 0;

            }
        }
    }

    private selectChip(selectSectorIndex:number):void {

        if(this.arrayChips[selectSectorIndex].length!=0){
            if (this._countClick == 1) {
                this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1 ].selected = true;
                if(this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1 ]._color == 'white'){
                    this._selectChipColor = 'white';
                }else {
                    this._selectChipColor = 'black';
                }
            }
        }
    }

    public getChipPosition(sectorIndex:number,chipIndex:number):Point{
        let x:number;
        let y:number;
        x = this.arrayPositionChip[sectorIndex].x;

        if(this.arrayPositionChip[sectorIndex].x == this.arrayPositionChip[this._exitWhite].x){
            y = this.arrayPositionChip[sectorIndex].y - 10 * chipIndex;
            return new Point(x,y);
        }

        if(this.arrayPositionChip[sectorIndex].y == 618){
            y = this.arrayPositionChip[sectorIndex].y - this._OFFSET * chipIndex;
        }else {
            y = this.arrayPositionChip[sectorIndex].y + this._OFFSET * chipIndex;
        }
        return new Point(x,y);
    }

    public moveOpponentChip(fromSector:number, toSector:number):void{
        let opponentChip:Chip = this.arrayChips[fromSector].pop();
        this._container.addChild(opponentChip);
        let newPosition =this.getChipPosition(toSector,this.arrayChips[toSector].length);
        this.animationMoveChip(opponentChip,newPosition.x,newPosition.y);
        this.arrayChips[toSector].push(opponentChip);
    }

    private animationMoveChip(Chip:any,x:any,y:any){
        TweenLite.to(Chip, 0.5, {
            x: x,
            y: y,
            onStart:this.sound.playSoundMoveChip()
        });
        Chip.selected = false;

        if(this.arraySectors[this._exitWhite].x == x){
            Chip.chipExit();
        }

    }

    public setDice(first:number,second:number){
        this._activeDices = [];
        if (first == second)
        {
            this._activeMoves = first * 4;
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            this._activeDices.push(first);
            // this._activeDices.push(first * 2);
            // this._activeDices.push(first * 2);
            // this._activeDices.push(first * 3);
            // this._activeDices.push(first * 4);
        }
        else
        {
            this._activeDices.push(first);
            this._activeDices.push(second);
            // this._activeDices.push(first + second);
            this._activeMoves = first + second;

        }

        this._maxCube = getMaxOfArray(this._activeDices);
        this._minCube = getMinOfArray(this._activeDices);

        function getMaxOfArray(numArray:any):number {
            return Math.max.apply(null, numArray);
        }
        function getMinOfArray(numArray:any):number {
            return Math.min.apply(null, numArray);
        }
        console.log('Мax and Min  '+ this._maxCube +','+this._minCube );
        console.log('Кол-во возможных ходов: ', this._activeMoves, );
        console.log('Активные кубики: ', this._activeDices);
        this._isActive = this._activeMoves != 0;
    }

    public moveChip(oldPosition:number,newPosition:number) {

        // if( this.arrayChips[newPosition].length == 1 && this.arrayChips[oldPosition][0].color != this.arrayChips[newPosition][0].color)
        // {
        //     let positionJail_X:number;
        //     let positionJail_Y:number;
        //
        //     let oldChip:Chip = this.arrayChips[oldPosition].pop();
        //     this._container.addChild(oldChip);
        //
        //     let opponentChip:Chip = this.arrayChips[newPosition][0];
        //     this._container.addChild(opponentChip);
        //
        //     switch (opponentChip.color)
        //     {
        //         case Chip.COLOR_WHITE:
        //             this.arrayChips[this._sectorJailWhite].push(opponentChip);
        //             positionJail_X = this.getChipPosition(this._sectorJailWhite,this.arrayChips[this._sectorJailWhite].length).x;
        //             positionJail_Y = this.getChipPosition(this._sectorJailWhite,this.arrayChips[this._sectorJailWhite].length).y;
        //             break;
        //         case Chip.COLOR_BLACK:
        //             this.arrayChips[this._sectorJailBlack].push(opponentChip);
        //             positionJail_X = this.getChipPosition(this._sectorJailBlack,this.arrayChips[this._sectorJailBlack].length).x;
        //             positionJail_Y = this.getChipPosition(this._sectorJailBlack,this.arrayChips[this._sectorJailBlack].length).y;
        //     }
        //     this.arrayChips[newPosition].pop();
        //     this.animationMoveChip(opponentChip,positionJail_X,positionJail_Y);
        //     let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
        //     let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;
        //     this.animationMoveChip(oldChip,newPositionX,newPositionY);
        //     this.arrayChips[newPosition].push(oldChip);
        //     this.calculateMoves(newPosition,oldPosition);
        //     this._countClick = 0;
        // }
        // else{

            let oldChip:Chip = this.arrayChips[oldPosition].pop();
            this._container.addChild(oldChip);
            let newPositionX = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).x;
            let newPositionY = this.getChipPosition(newPosition,this.arrayChips[newPosition].length).y;
            this.animationMoveChip(oldChip,newPositionX,newPositionY);
            this.arrayChips[newPosition].push(oldChip);
            // this.calculateMoves(newPosition,oldPosition);
            this._countClick = 0;

            this._activeMoves -= this._lastCube;
            this._activeDices.splice(this._activeDices.indexOf(this._lastCube), 1);
            this._activeDices = this._activeDices.filter(function(number) {
                return number <= this._activeMoves;
            }, this);

            this._isActive = this._activeMoves != 0;
        // }

        this.offHighLightSectors();
        this.turnDependsOfTheColor();
        this.deactivationSectorsJails();
        this.endOfTurn();
    }

    private highlightSector(sectorIndex: number) {
        if (this._selectChipColor == 'white')
        {
            this._activeDices.forEach(function (element)
            {
                if (sectorIndex + element <= 24)
                    this.calculateHighlights(sectorIndex + element);
                if(this.pokaAllHome()==15){
                    this.goExitWhite(sectorIndex);
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
                    this.goExitBlack(sectorIndex);
                }
            }, this);
        }

    }

    private calculateHighlights(way:number) {

        if(this.arrayChips[way].length!=0)
        {
            if(this.arrayChips[way][0].color == this._selectChipColor)
            {
                this.arraySectors[way].highlightMove();
            }
            else
            if(this.arrayChips[way].length == 1){
                this.arraySectors[way].highlightMove();
            }
        }
        else
        {
            this.arraySectors[way].highlightMove();
        }
    }

    private goExitWhite(sectorIndex: number){
        if(this._chipsOnTheLeft==0){
            if(this._chipsOnTheRight==sectorIndex){
                this.arraySectors[this._exitWhite].highlightMoveExit();
            }
        }if(this.metamorphoseForWhite(sectorIndex)==this._activeDices[0]||this._activeDices[1] == this.metamorphoseForWhite(sectorIndex)){
            this.arraySectors[this._exitWhite].highlightMoveExit();
        }
    }

    private goExitBlack(sectorIndex: number){
        if(this._chipsOnTheLeft==0){
            if(this._chipsOnTheRight==sectorIndex){
                this.arraySectors[this._exitBlack].highlightMoveExit();
            }
        }if(sectorIndex==this._activeDices[0]||this._activeDices[1] == sectorIndex){
            this.arraySectors[this._exitBlack].highlightMoveExit();
        }
    }

    private pokaAllHome():number{
        let countChipInHome:number;
        countChipInHome = 0 ;
        if(this._activColor == 0){
            for (let i = 19; i <= 24; i++){
                if(this.arrayChips[i].length!=0){
                    if(this.arrayChips[i][0].color == 'white'){
                        countChipInHome+= this.arrayChips[i].length;
                    }
                }
            }countChipInHome+=this.arrayChips[this._exitWhite].length
        }else if(this._activColor == 1){
            for (let i = 1; i <= 6; i++){
                if(this.arrayChips[i].length!=0){
                    if(this.arrayChips[i][0].color == 'black'){
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

        if(this._activColor==0){

            let maxDice1=this._maxDice;
            let maxDice2=this._maxDice;

            for(maxDice2;maxDice2<=6;maxDice2++){
                if(this.arrayChips[this.metamorphose(maxDice2)].length!=0){
                    this._chipsOnTheLeft = this.metamorphose(maxDice2);
                }
            }
            for(maxDice1;maxDice1>=1;maxDice1--){
                if(this.arrayChips[this.metamorphose(maxDice1)].length!=0){
                    this._chipsOnTheRight= this.metamorphose(maxDice1);
                    break;
                }
            }
        }else  {
            let maxDice1=this._maxDice;
            let maxDice2=this._maxDice;

                for(maxDice2;maxDice2>=1;maxDice2--){
                    if(this.arrayChips[maxDice2].length!=0){
                        this._chipsOnTheRight= maxDice2;
                        break;
                    }
                }
                for(maxDice1;maxDice1<=6;maxDice1++){
                    if(this.arrayChips[maxDice1].length!=0) {
                        this._chipsOnTheLeft=maxDice1;
                    }
                }
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

        }
        return metX;
    }

    public metamorphoseForWhite(x:number):number{
        let metX:number;
        switch(x){
            case 19:metX = 6;
                break;
            case 20:metX = 5;
                break;
            case 21:metX = 4;
                break;
            case 22:metX = 3;
                break;
            case 23:metX = 2;
                break;
            case 24:metX = 1;
                break;
        }
        return metX;
    }

    // private calculateMoves(newPosition:number,oldPosition:number){
    //     this._currentMove = Math.abs(newPosition - oldPosition);
    //     switch (newPosition){
    //         case this._exitBlack: newPosition = 0;
    //         this._currentMove = this._firsSelectSectorIndex;
    //         break;
    //         case this._exitWhite: newPosition = 25;
    //         this._currentMove = this.metamorphoseForWhite(this._firsSelectSectorIndex);
    //         break;
    //     }
    //     this._activeMoves -= this._currentMove;
    //     this._activeDices.splice(this._activeDices.indexOf(this._currentMove), 1);
    //     this._activeDices = this._activeDices.filter(function(number) {
    //         return number <= this._activeMoves;
    //     }, this);
    //     this._isActive = this._activeMoves != 0;
    //     console.log('Сделан ход: '+this._currentMove);
    //     console.log('Кол-во возможных ходов: '+this._activeMoves );
    //     console.log('Активные кубики: '+this._activeDices);
    //
    // }
}