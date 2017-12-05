var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Chip", "./Sector", "./Sound", "../Game"], function (require, exports, Chip_1, Sector_1, Sound_1, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var Point = PIXI.Point;
    var Sprite2d = PIXI.projection.Sprite2d;
    var Container2d = PIXI.projection.Container2d;
    var Board = (function (_super) {
        __extends(Board, _super);
        function Board() {
            var _this = _super.call(this) || this;
            _this._OFFSET = 30;
            _this._countClick = 0;
            _this.sound = new Sound_1.Sound();
            _this._sectorJailWhite = 0;
            _this._sectorJailBlack = 25;
            _this._chipsOnTheLeft = 0;
            _this._chipsOnTheRight = 0;
            _this._exitWhite = 26;
            _this._exitBlack = 27;
            _this._maxDice = 0;
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
            _this.arrayChips = [
                [],
                [], [], [], [], [],
                [], [], [], [], [],
                [], [], [], [], [],
                [], [], [], [], [],
                [], [], [], [],
                [],
                [], []
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
            _this.arraySectors = [new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(),
                new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(),
                new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(),
                new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(),
                new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector(), new Sector_1.Sector()];
            // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек(0 и 25 Тюрьма)-------------
            _this.arrayPositionChip = [
                new PIXI.Point(515, 165),
                new PIXI.Point(820, 165), new PIXI.Point(768, 165), new PIXI.Point(718, 165), new PIXI.Point(665, 165),
                new PIXI.Point(615, 165), new PIXI.Point(565, 165), new PIXI.Point(468, 165), new PIXI.Point(418, 165),
                new PIXI.Point(367, 165), new PIXI.Point(315, 165), new PIXI.Point(265, 165), new PIXI.Point(215, 165),
                new PIXI.Point(215, 618), new PIXI.Point(268, 618), new PIXI.Point(318, 618), new PIXI.Point(368, 618),
                new PIXI.Point(418, 618), new PIXI.Point(468, 618), new PIXI.Point(565, 618), new PIXI.Point(615, 618),
                new PIXI.Point(665, 618), new PIXI.Point(715, 618), new PIXI.Point(765, 618), new PIXI.Point(815, 618),
                new PIXI.Point(515, 618),
                new PIXI.Point(885, 628), new PIXI.Point(885, 313)
            ];
            _this.arrayPositionSector = [
                new PIXI.Point(515, 250),
                new PIXI.Point(811, 250), new PIXI.Point(762, 250), new PIXI.Point(710, 250), new PIXI.Point(660, 250),
                new PIXI.Point(610, 250), new PIXI.Point(560, 250), new PIXI.Point(463, 250), new PIXI.Point(412, 250),
                new PIXI.Point(363, 250), new PIXI.Point(310, 250), new PIXI.Point(260, 250), new PIXI.Point(210, 250),
                new PIXI.Point(220, 535), new PIXI.Point(270, 535), new PIXI.Point(320, 535), new PIXI.Point(370, 535),
                new PIXI.Point(422, 535), new PIXI.Point(470, 535), new PIXI.Point(565, 535), new PIXI.Point(615, 535),
                new PIXI.Point(665, 535), new PIXI.Point(715, 535), new PIXI.Point(765, 535), new PIXI.Point(815, 535),
                new PIXI.Point(515, 535),
                new PIXI.Point(885, 550), new PIXI.Point(885, 235)
            ];
            _this.position.set(Game_1.Game.WIDTH / 2, Game_1.Game.HEIGHT / 2);
            _this._newBg = new Sprite(Texture.fromImage('assets/bg.png'));
            _this._newBg.position.set(-Game_1.Game.WIDTH / 2, -Game_1.Game.HEIGHT / 2);
            _this.addChild(_this._newBg);
            _this._container = new Container2d();
            _this._container.position.set(-Game_1.Game.WIDTH / 2, -Game_1.Game.HEIGHT / 2);
            _this.addChild(_this._container);
            var bg = new Sprite2d(Texture.WHITE);
            bg.alpha = 0;
            bg.width = Game_1.Game.WIDTH;
            bg.height = Game_1.Game.HEIGHT;
            _this._container.addChild(bg);
            _this.drawSectors();
            _this.drawState();
            _this.listenClick();
            _this.deactivationAllSectors();
            _this.addListener("added", _this.eventListenerAdded, _this);
            return _this;
        }
        Board.prototype.eventListenerAdded = function () {
            this.proj.clear();
            this.updateTransform();
            this.proj.setAxisY(new Point(0, 1650), -1);
        };
        //-----------------Блок отрисовки элементов на доске начало---------------------
        Board.prototype.setState = function (chipPos) {
            for (var i = 0; i < chipPos.length; i++) {
                for (var j = 0; j < chipPos[i].length; j++) {
                    if (chipPos[i].length == 0) {
                        this.arrayChips.push([]);
                    }
                    else if (chipPos[i][j] == 0) {
                        this.arrayChips[i].push(new Chip_1.Chip(Chip_1.Chip.COLOR_WHITE));
                    }
                    else if (chipPos[i][j] == 1) {
                        this.arrayChips[i].push(new Chip_1.Chip(Chip_1.Chip.COLOR_BLACK));
                    }
                }
            }
        };
        Board.prototype.setPosition = function () {
            //задает позицию фишек
            for (var i = 0; i < this.arrayChips.length; i++) {
                for (var j = 0; j < this.arrayChips[i].length; j++) {
                    if (i >= 1 && i < 13) {
                        this.arrayChips[i][j].position.set(this.arrayPositionChip[i].x, this.arrayPositionChip[i].y + this._OFFSET * j);
                    }
                    else {
                        this.arrayChips[i][j].position.set(this.arrayPositionChip[i].x, this.arrayPositionChip[i].y - this._OFFSET * j);
                    }
                }
            }
        };
        Board.prototype.drawState = function () {
            //задает позицию фишек и рисует фишки
            for (var i = 0; i < this.arrayChips.length; i++) {
                for (var j = 0; j < this.arrayChips[i].length; j++) {
                    this.setPosition();
                    this._container.addChild(this.arrayChips[i][j]);
                }
            }
        };
        Board.prototype.setPositionSectors = function () {
            //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
            for (var i = 0; i < this.arrayPositionSector.length; i++) {
                if (i >= 1 && i < 13) {
                    this.arraySectors[i].position.set(this.arrayPositionSector[i].x, this.arrayPositionSector[i].y);
                    this.arraySectors[i].rotation = -3.14;
                }
                else {
                    this.arraySectors[i].position.set(this.arrayPositionSector[i].x, this.arrayPositionSector[i].y);
                }
            }
            this.arraySectors[this._sectorJailWhite].rotation = -3.14;
            this.arraySectors[this._sectorJailWhite].position.set(this.arrayPositionSector[this._sectorJailWhite].x, this.arrayPositionSector[this._sectorJailWhite].y); //Jail
            this.arraySectors[this._sectorJailBlack].position.set(this.arrayPositionSector[this._sectorJailBlack].x, this.arrayPositionSector[this._sectorJailBlack].y); //Jail
            this.arraySectors[this._exitBlack].rotation = -3.14;
            this.arraySectors[this._exitWhite].position.set(this.arrayPositionSector[this._exitWhite].x, this.arrayPositionSector[this._exitWhite].y);
            this.arraySectors[this._exitBlack].position.set(this.arrayPositionSector[this._exitBlack].x, this.arrayPositionSector[this._exitBlack].y);
        };
        Board.prototype.drawSectors = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.setPositionSectors();
                this._container.addChild(this.arraySectors[i]);
            }
        };
        //-----------------Блок отрисовки элементов на доске конец---------------------
        //-----------------Блок деактивации элементов на доске начало---------------------
        Board.prototype.deactivationAllSectors = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].interactiveOff();
            }
        };
        Board.prototype.turnDependsOfTheColor = function () {
            var colorChip; //перевод цвета из 0 и 1 в true false мне так удобнее
            switch (this._activColor) {
                case 0:
                    colorChip = 'white';
                    break;
                case 1:
                    colorChip = 'black';
                    break;
            }
            for (var i = 0; i < this.arrayChips.length; i++) {
                if (this.arrayChips[i].length != 0) {
                    if (this.arrayChips[i][0]._color == colorChip) {
                        this.arraySectors[i].interactiveOn();
                    }
                    else {
                        this.arraySectors[i].interactiveOff();
                    }
                }
            }
        };
        Board.prototype.offHighLightSectors = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].alpha = 0;
            }
        };
        //-----------------Блок деактивации элементов на доске конец---------------------
        Board.prototype.startTurn = function (firsDice, secondDice, activColor) {
            this.setDice(firsDice, secondDice);
            this._activColor = activColor;
            this.turnDependsOfTheColor();
            if (this.arrayChips[this._sectorJailBlack].length != 0 || this.arrayChips[this._sectorJailWhite].length != 0) {
                this.deactivationAllSectors();
                switch (this._activColor) {
                    case 0:
                        this.arraySectors[this._sectorJailWhite].interactiveOn();
                        break;
                    case 1: this.arraySectors[this._sectorJailBlack].interactiveOn();
                }
            }
        };
        Board.prototype.blockOfTurn = function () {
            this._activeDices = [];
            this.endOfTurn();
        };
        Board.prototype.endOfTurn = function () {
            if (this.arrayChips[this._exitWhite].length == 15) {
                console.log('Игра завершена белыми');
                this.emit(Board.EVENT_GAME_END, {
                    CLASS_NAME: 'EndGame',
                    color: 0
                });
            }
            else if (this.arrayChips[this._exitBlack].length == 15) {
                console.log('Игра завершена черными');
                this.emit(Board.EVENT_GAME_END, {
                    CLASS_NAME: 'EndGame',
                    color: 1
                });
            }
            if (this._activeDices.length == 0) {
                this._activeMoves = 0;
                this.deactivationAllSectors();
                this.emit(Board.EVENT_END_OF_TURN);
                this._chipsOnTheLeft = 0;
                this._chipsOnTheRight = 0;
            }
        };
        Board.prototype.listenClick = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].on('pointerdown', this.sectorClick, this);
            }
        };
        Board.prototype.deselectChip = function (firsSelectSectorIndex) {
            this.deactivationAllSectors();
            this.sound.playSoundClickChip();
            this.offHighLightSectors(); //отключаю подсветку
            this.turnDependsOfTheColor();
            this.searchNeighbors();
            this.arrayChips[firsSelectSectorIndex][this.arrayChips[firsSelectSectorIndex].length - 1].selected = false;
            this._chipsOnTheLeft = 0;
            this._chipsOnTheRight = 0;
            this._selectChipColor = '';
            this._countClick = 0;
        };
        Board.prototype.sectorClick = function (data) {
            if (this._countClick == 0) {
                this._firsSelectSectorIndex = this.arraySectors.indexOf(data.target);
                if (this._firsSelectSectorIndex == this._exitWhite || this._firsSelectSectorIndex == this._exitBlack) {
                    this.arraySectors[this._firsSelectSectorIndex].interactiveOff();
                }
                else {
                    this._countClick++;
                    this.sound.playSoundClickChip();
                    this.selectChip(this._firsSelectSectorIndex);
                    this.deactivationAllSectors();
                    this.arraySectors[this._firsSelectSectorIndex].interactiveOn();
                    this.pokaAllHome();
                    this.highlightSector(this._firsSelectSectorIndex);
                }
            }
            else if (this._countClick == 1) {
                this._secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
                // console.log('сектор второй '+ this.secondSelectSectorIndex);
                if (this._firsSelectSectorIndex == this._secondSelectSectorIndex) {
                    this.deselectChip(this._firsSelectSectorIndex);
                }
                else {
                    var currentMove = Math.abs(this._firsSelectSectorIndex - this._secondSelectSectorIndex);
                    switch (this._secondSelectSectorIndex) {
                        case this._exitBlack:
                            this._secondSelectSectorIndex = 0;
                            if (this._firsSelectSectorIndex != this._maxCube && this._firsSelectSectorIndex > this._minCube) {
                                currentMove = this._maxCube;
                            }
                            else {
                                currentMove = this._firsSelectSectorIndex;
                            }
                            break;
                        case this._exitWhite:
                            this._secondSelectSectorIndex = 25;
                            if (this.metamorphoseForWhite(this._firsSelectSectorIndex) != this._maxCube && this.metamorphoseForWhite(this._firsSelectSectorIndex) > this._minCube) {
                                currentMove = this._maxCube;
                            }
                            else {
                                currentMove = this.metamorphoseForWhite(this._firsSelectSectorIndex);
                            }
                            break;
                    }
                    console.log('Сделан ход: ' + currentMove);
                    console.log('Кол-во возможных ходов: ', this._activeMoves);
                    console.log('Активные кубики: ', this._activeDices);
                    this.emit(Board.EVENT_MOVE_CHIP, {
                        CLASS_NAME: 'MoveChip',
                        from: this._firsSelectSectorIndex,
                        cubeValues: currentMove
                    });
                    this._activeMoves -= currentMove;
                    this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
                    this._activeDices = this._activeDices.filter(function (number) {
                        return number <= this._activeMoves;
                    }, this);
                    this._isActive = this._activeMoves != 0;
                }
            }
        };
        Board.prototype.selectChip = function (selectSectorIndex) {
            if (this.arrayChips[selectSectorIndex].length != 0) {
                if (this._countClick == 1) {
                    this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selected = true;
                    if (this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1]._color == 'white') {
                        this._selectChipColor = 'white';
                    }
                    else {
                        this._selectChipColor = 'black';
                    }
                }
            }
        };
        Board.prototype.getChipPosition = function (sectorIndex, chipIndex) {
            var x;
            var y;
            x = this.arrayPositionChip[sectorIndex].x;
            if (this.arrayPositionChip[sectorIndex].x == this.arrayPositionChip[this._exitWhite].x) {
                y = this.arrayPositionChip[sectorIndex].y - 10 * chipIndex;
                return new Point(x, y);
            }
            if (this.arrayPositionChip[sectorIndex].y == 618) {
                y = this.arrayPositionChip[sectorIndex].y - this._OFFSET * chipIndex;
            }
            else {
                y = this.arrayPositionChip[sectorIndex].y + this._OFFSET * chipIndex;
            }
            return new Point(x, y);
        };
        Board.prototype.moveOpponentChip = function (fromSector, toSector) {
            var opponentChip = this.arrayChips[fromSector].pop();
            this._container.addChild(opponentChip);
            var newPosition = this.getChipPosition(toSector, this.arrayChips[toSector].length);
            this.animationMoveChip(opponentChip, newPosition.x, newPosition.y);
            this.arrayChips[toSector].push(opponentChip);
        };
        Board.prototype.animationMoveChip = function (Chip, x, y) {
            TweenLite.to(Chip, 0.5, {
                x: x,
                y: y,
                onStart: this.sound.playSoundMoveChip()
            });
            Chip.selected = false;
            if (this.arraySectors[this._exitWhite].x == x) {
                Chip.chipExit();
            }
        };
        Board.prototype.setDice = function (first, second) {
            this._activeDices = [];
            if (first == second) {
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
            else {
                this._activeDices.push(first);
                this._activeDices.push(second);
                // this._activeDices.push(first + second);
                this._activeMoves = first + second;
            }
            this._maxCube = getMaxOfArray(this._activeDices);
            this._minCube = getMinOfArray(this._activeDices);
            function getMaxOfArray(numArray) {
                return Math.max.apply(null, numArray);
            }
            function getMinOfArray(numArray) {
                return Math.min.apply(null, numArray);
            }
            console.log('Мax and Min  ' + this._maxCube + ',' + this._minCube);
            console.log('Кол-во возможных ходов: ', this._activeMoves);
            console.log('Активные кубики: ', this._activeDices);
            this._isActive = this._activeMoves != 0;
        };
        Board.prototype.moveChip = function (oldPosition, newPosition) {
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
            var oldChip = this.arrayChips[oldPosition].pop();
            this._container.addChild(oldChip);
            var newPositionX = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).x;
            var newPositionY = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).y;
            this.animationMoveChip(oldChip, newPositionX, newPositionY);
            this.arrayChips[newPosition].push(oldChip);
            // this.calculateMoves(newPosition,oldPosition);
            this._countClick = 0;
            // }
            this.offHighLightSectors();
            this.turnDependsOfTheColor();
            this.endOfTurn();
        };
        Board.prototype.highlightSector = function (sectorIndex) {
            if (this._selectChipColor == 'white') {
                this._activeDices.forEach(function (element) {
                    if (sectorIndex + element <= 24)
                        this.calculateHighlights(sectorIndex + element);
                    if (this.pokaAllHome() == 15) {
                        this.goExitWhite(sectorIndex);
                    }
                }, this);
            }
            else {
                this._activeDices.forEach(function (element) {
                    if (sectorIndex - element != 0 && sectorIndex - element > 0)
                        this.calculateHighlights(sectorIndex - element);
                    if (this.pokaAllHome() == 15) {
                        this.goExitBlack(sectorIndex);
                    }
                }, this);
            }
        };
        Board.prototype.calculateHighlights = function (way) {
            if (this.arrayChips[way].length != 0) {
                if (this.arrayChips[way][0].color == this._selectChipColor) {
                    this.arraySectors[way].highlightMove();
                }
                else if (this.arrayChips[way].length == 1) {
                    this.arraySectors[way].highlightMove();
                }
            }
            else {
                this.arraySectors[way].highlightMove();
            }
        };
        Board.prototype.goExitWhite = function (sectorIndex) {
            if (this._chipsOnTheLeft == 0) {
                if (this._chipsOnTheRight == sectorIndex) {
                    this.arraySectors[this._exitWhite].highlightMoveExit();
                }
            }
            if (this.metamorphoseForWhite(sectorIndex) == this._activeDices[0] || this._activeDices[1] == this.metamorphoseForWhite(sectorIndex)) {
                this.arraySectors[this._exitWhite].highlightMoveExit();
            }
        };
        Board.prototype.goExitBlack = function (sectorIndex) {
            if (this._chipsOnTheLeft == 0) {
                if (this._chipsOnTheRight == sectorIndex) {
                    this.arraySectors[this._exitBlack].highlightMoveExit();
                }
            }
            if (sectorIndex == this._activeDices[0] || this._activeDices[1] == sectorIndex) {
                this.arraySectors[this._exitBlack].highlightMoveExit();
            }
        };
        Board.prototype.pokaAllHome = function () {
            var countChipInHome;
            countChipInHome = 0;
            if (this._activColor == 0) {
                for (var i = 19; i <= 24; i++) {
                    if (this.arrayChips[i].length != 0) {
                        if (this.arrayChips[i][0].color == 'white') {
                            countChipInHome += this.arrayChips[i].length;
                        }
                    }
                }
                countChipInHome += this.arrayChips[this._exitWhite].length;
            }
            else if (this._activColor == 1) {
                for (var i = 1; i <= 6; i++) {
                    if (this.arrayChips[i].length != 0) {
                        if (this.arrayChips[i][0].color == 'black') {
                            countChipInHome += this.arrayChips[i].length;
                        }
                    }
                }
                countChipInHome += this.arrayChips[this._exitBlack].length;
            }
            this.searchNeighbors();
            return countChipInHome;
        };
        Board.prototype.searchNeighbors = function () {
            var DiceArray = [this._activeDices[0], this._activeDices[1]];
            function getMaxOfArray(numArray) {
                return Math.max.apply(null, numArray);
            }
            if (this._activeDices.length == 1) {
                this._maxDice = this._activeDices[0];
            }
            else {
                this._maxDice = getMaxOfArray(DiceArray);
            }
            if (this._activColor == 0) {
                var maxDice1 = this._maxDice;
                var maxDice2 = this._maxDice;
                for (maxDice2; maxDice2 <= 6; maxDice2++) {
                    if (this.arrayChips[this.metamorphose(maxDice2)].length != 0) {
                        this._chipsOnTheLeft = this.metamorphose(maxDice2);
                    }
                }
                for (maxDice1; maxDice1 >= 1; maxDice1--) {
                    if (this.arrayChips[this.metamorphose(maxDice1)].length != 0) {
                        this._chipsOnTheRight = this.metamorphose(maxDice1);
                        break;
                    }
                }
            }
            else {
                var maxDice1 = this._maxDice;
                var maxDice2 = this._maxDice;
                for (maxDice2; maxDice2 >= 1; maxDice2--) {
                    if (this.arrayChips[maxDice2].length != 0) {
                        this._chipsOnTheRight = maxDice2;
                        break;
                    }
                }
                for (maxDice1; maxDice1 <= 6; maxDice1++) {
                    if (this.arrayChips[maxDice1].length != 0) {
                        this._chipsOnTheLeft = maxDice1;
                    }
                }
            }
        };
        Board.prototype.metamorphose = function (x) {
            var metX;
            switch (x) {
                case 6:
                    metX = 19;
                    break;
                case 5:
                    metX = 20;
                    break;
                case 4:
                    metX = 21;
                    break;
                case 3:
                    metX = 22;
                    break;
                case 2:
                    metX = 23;
                    break;
                case 1:
                    metX = 24;
                    break;
            }
            return metX;
        };
        Board.prototype.metamorphoseForWhite = function (x) {
            var metX;
            switch (x) {
                case 19:
                    metX = 6;
                    break;
                case 20:
                    metX = 5;
                    break;
                case 21:
                    metX = 4;
                    break;
                case 22:
                    metX = 3;
                    break;
                case 23:
                    metX = 2;
                    break;
                case 24:
                    metX = 1;
                    break;
            }
            return metX;
        };
        Board.EVENT_END_OF_TURN = 'EndOfTurn';
        Board.EVENT_MOVE_CHIP = 'MoveChip';
        Board.EVENT_GAME_END = 'GameEnd';
        return Board;
    }(Container2d));
    exports.Board = Board;
});
//# sourceMappingURL=Board.js.map