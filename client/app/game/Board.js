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
define(["require", "exports", "./Chip", "./Sector", "./Sound"], function (require, exports, Chip_1, Sector_1, Sound_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var Point = PIXI.Point;
    //TODO если делаю отмену клика и в этот момент есть кто то в тюрьме то хуй мы походим больше
    //TODO eсли черная фишка выходит из тюрьмы то есть какой то рамс с последующими ходами надо исправить
    //TODO исправить метод для звука
    //TODO сделать выход фишек с поля
    //TODO сделать нумерацию секторов от 1 легче будет считать плюс серверники считают от 1
    //TODO если мы отменим клик с фишки которая в тюрьме можно будет пользоваться любой фишкой
    var Board = (function (_super) {
        __extends(Board, _super);
        function Board() {
            var _this = _super.call(this) || this;
            _this.bg_skin = Texture.fromImage('assets/bg.png');
            _this.bg = new Sprite(PIXI.Texture.WHITE);
            _this.dice = [3, 1];
            _this.OFFSET = 30;
            _this.countClick = 0;
            _this.tl = new TimelineLite();
            _this.sound = new Sound_1.Sound();
            _this.sectorJailWhite = 24;
            _this.sectorJailBlack = 25;
            // ----------Массив с фишками(два последних Тюрьма)-------------
            _this.arrayChips = [
                [new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [], [], [], [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [], [], [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [], [], [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [], [], [], [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [],
                []
            ];
            // ----------Массив секторов которые отслеживают клики на поле(на доске они скрыты)-(два последних Тюрьма)------------
            _this.arraySectors = [new Sector_1.Sector(0), new Sector_1.Sector(1), new Sector_1.Sector(2), new Sector_1.Sector(3), new Sector_1.Sector(4), new Sector_1.Sector(5), new Sector_1.Sector(6), new Sector_1.Sector(7), new Sector_1.Sector(8), new Sector_1.Sector(9), new Sector_1.Sector(10), new Sector_1.Sector(11), new Sector_1.Sector(12),
                new Sector_1.Sector(13), new Sector_1.Sector(14), new Sector_1.Sector(15), new Sector_1.Sector(16), new Sector_1.Sector(17), new Sector_1.Sector(18), new Sector_1.Sector(19), new Sector_1.Sector(20), new Sector_1.Sector(21), new Sector_1.Sector(22), new Sector_1.Sector(23), new Sector_1.Sector(24), new Sector_1.Sector(25)];
            // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек(два последних Тюрьма)-------------
            _this.arrayPositionPoint = [new PIXI.Point(872, 60), new PIXI.Point(815, 60), new PIXI.Point(753, 60), new PIXI.Point(696, 60), new PIXI.Point(636, 60), new PIXI.Point(578, 60), new PIXI.Point(450, 60), new PIXI.Point(390, 60), new PIXI.Point(330, 60),
                new PIXI.Point(270, 60), new PIXI.Point(210, 60), new PIXI.Point(155, 60), new PIXI.Point(155, 715), new PIXI.Point(210, 715), new PIXI.Point(270, 715), new PIXI.Point(330, 715), new PIXI.Point(390, 715), new PIXI.Point(450, 715), new PIXI.Point(578, 715), new PIXI.Point(636, 715),
                new PIXI.Point(696, 715), new PIXI.Point(753, 715), new PIXI.Point(815, 715), new PIXI.Point(872, 715), new PIXI.Point(515, 30), new PIXI.Point(515, 715)];
            _this.bg.texture = _this.bg_skin;
            _this.addChild(_this.bg);
            _this.listenClick();
            _this.drawSectors();
            _this.drawState();
            _this.deactivationAllSectors(); //убираю интерактив с секторов
            return _this;
        }
        //-----------------Блок отрисовки элементов на доске начало---------------------
        Board.prototype.setPosition = function () {
            //задает позицию фишек
            for (var i = 0; i < this.arrayChips.length; i++) {
                for (var j = 0; j < this.arrayChips[i].length; j++) {
                    if (i >= 0 && i < 12) {
                        this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x, this.arrayPositionPoint[i].y + this.OFFSET * j);
                    }
                    else {
                        this.arrayChips[i][j].position.set(this.arrayPositionPoint[i].x, this.arrayPositionPoint[i].y - this.OFFSET * j);
                    }
                }
            }
        };
        Board.prototype.drawState = function () {
            //задает позицию фишек и рисует фишки
            for (var i = 0; i < this.arrayChips.length; i++) {
                for (var j = 0; j < this.arrayChips[i].length; j++) {
                    this.setPosition();
                    this.addChild(this.arrayChips[i][j]);
                }
            }
        };
        Board.prototype.setPositionSectors = function () {
            //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
            for (var i = 0; i < this.arrayPositionPoint.length; i++) {
                if (i >= 0 && i < 12) {
                    this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 30);
                }
                else {
                    this.arraySectors[i].position.set(this.arrayPositionPoint[i].x, 745);
                    this.arraySectors[i].rotation = -3.14;
                }
            }
            this.arraySectors[this.sectorJailWhite].rotation = 0;
            this.arraySectors[this.sectorJailWhite].position.set(this.arrayPositionPoint[24].x, this.arrayPositionPoint[24].y); //Jail
            this.arraySectors[this.sectorJailBlack].position.set(this.arrayPositionPoint[25].x, this.arrayPositionPoint[25].y); //Jail
        };
        Board.prototype.drawSectors = function () {
            //задает позицию сектора и добовляет его на доску
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.setPositionSectors();
                this.addChild(this.arraySectors[i]);
            }
        };
        //-----------------Блок отрисовки элементов на доске конец---------------------
        //-----------------Блок деактивации элементов на доске начало---------------------
        Board.prototype.deactivationSectorsAndJail = function () {
            if (this.arrayChips[this.sectorJailWhite].length != 0 || this.arrayChips[this.sectorJailBlack].length != 0) {
                for (var i = 0; i < 24; i++) {
                    this.arraySectors[i].interactiveOff();
                }
            }
        };
        Board.prototype.deactivationChip = function () {
            //делаю фишку не активной
            for (var i = 0; i < this.arrayChips.length; i++) {
                for (var j = 0; j < this.arrayChips[i].length; j++) {
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
        };
        Board.prototype.deactivationAllSectors = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].interactiveOff();
            }
        };
        Board.prototype.turnDependsOfTheColor = function () {
            var colorChip; //перевод цвета из 0 и 1 в true false мне так удобнее
            // console.log('цвет пришел');
            // console.log(this._activColor);
            switch (this._activColor) {
                case 0:
                    colorChip = true;
                    break;
                case 1:
                    colorChip = false;
                    break;
            }
            console.log('цвет стал');
            console.log(colorChip);
            for (var i = 0; i < this.arrayChips.length; i++) {
                if (this.arrayChips[i].length != 0) {
                    if (this.arrayChips[i][0].colorChipWhite == colorChip) {
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
                this.arraySectors[i].greenTrianglSprite.visible = false;
                this.arraySectors[i].yellowTrianglSprite.visible = false;
            }
        };
        //-----------------Блок деактивации элементов на доске конец---------------------
        Board.prototype.startTurn = function (firsDice, secondDice, activColor) {
            console.log('цвет который приходит в старт терн от гейма в борд');
            console.log(activColor);
            this.setDice(firsDice, secondDice);
            this._activColor = activColor;
            this.turnDependsOfTheColor();
            this.deactivationSectorsAndJail();
        };
        Board.prototype.endOfTurn = function () {
            if (!this._isActive || this._activeMoves < 0) {
                this._activeMoves = 0;
                this.deactivationAllSectors();
                this.deactivationSectorsAndJail();
                this.emit(Board.EVENT_END_OF_TURN);
            }
        };
        Board.prototype.listenClick = function () {
            //слушает клики на секторе
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].on('click', this.sectorClick, this);
            }
        };
        Board.prototype.sectorClick = function (data) {
            //тут начинается магия
            if (this.countClick == 0) {
                this.countClick++;
                this.sound.playSoundClickChip();
                this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target); // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
                if (this.arraySectors.indexOf(data.target) == 24) {
                    this.whiteIsJail = true;
                }
                this.selectChip(this.firsSelectSectorIndex); //в этом методе фишка меняет скин на зеленый (активный)
                this.deactivationAllSectors(); //убираю интерактив после выбора фишки со всех секторов кроме подсвеченных и кроме того на котором фишка стоит что бы можно было отметить выбранную фишку
                this.arraySectors[this.firsSelectSectorIndex].interactiveOn();
                this.highlightSector(this.firsSelectSectorIndex);
            }
            else if (this.countClick == 1) {
                this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
                if (this.firsSelectSectorIndex == this.secondSelectSectorIndex) {
                    this.sound.playSoundClickChip();
                    this.deactivationChip(); //делаю фишку не активной
                    this.offHighLightSectors(); //отключаю подсветку
                    this.turnDependsOfTheColor();
                    this.countClick = 0;
                }
                else {
                    // this.moveChip(this.firsSelectSectorIndex,this.secondSelectSectorIndex);
                    this.emit(Board.EVENT_MOVE_CHIP, {
                        CLASS_NAME: 'MoveChip',
                        from: this.firsSelectSectorIndex,
                        to: this.secondSelectSectorIndex
                    });
                    this.deactivationChip(); //делаю фишку не активной
                    // this.endOfTurn()
                }
            }
        };
        Board.prototype.selectChip = function (selectSectorIndex) {
            //передаю сюда сектор по которому кликнули первый раз ( индекс сектора совподает с индексом массива фишек )
            if (this.arrayChips[selectSectorIndex].length != 0) {
                if (this.countClick == 1) {
                    if (this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].colorChipWhite) {
                        this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinWhite_active;
                        this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                        this.chipSelectGo = true;
                        this.selectChipWhite = true;
                    }
                    else {
                        this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSprite.texture = this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].chipSkinBlack_active;
                        this.arrayChips[selectSectorIndex][this.arrayChips[selectSectorIndex].length - 1].selectNow = true;
                        this.chipSelectGo = true;
                        this.selectChipWhite = false;
                    }
                }
            }
        };
        Board.prototype.getChipPosition = function (sectorIndex, chipIndex) {
            var x;
            var y;
            x = this.arrayPositionPoint[sectorIndex].x;
            if (this.arrayPositionPoint[sectorIndex].y == 715) {
                y = this.arrayPositionPoint[sectorIndex].y - this.OFFSET * chipIndex;
            }
            else {
                y = this.arrayPositionPoint[sectorIndex].y + this.OFFSET * chipIndex;
            }
            return new Point(x, y);
        };
        Board.prototype.animationMoveChip = function (Chip, x, y) {
            // this.emit(Board.EVENT_MOVE_CHIP,{
            //     oldPositionX:Chip.position.x,
            //     oldPositionY:Chip.position.y,
            //     newPositionX:x,
            //     newPositionY:y,
            // });
            TweenLite.to(Chip, 0.5, {
                x: x,
                y: y,
                onStart: this.sound.playSoundMoveChip()
            });
        };
        Board.prototype.setDice = function (first, second) {
            this.dice[0] = first;
            this.dice[1] = second;
            this._activeDices = [];
            if (first == second) {
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
            else {
                this._activeDices.push(first);
                this._activeDices.push(second);
                this._activeDices.push(first + second);
                this._activeMoves = first + second;
            }
            console.log('Кол-во возможных ходов: ', this._activeMoves);
            console.log('Активные кубики: ', this._activeDices);
            this._isActive = this._activeMoves != 0;
        };
        Board.prototype.moveChip = function (oldPosition, newPosition) {
            if (this.arrayChips[newPosition].length == 1 && this.arrayChips[oldPosition][0].colorChipWhite != this.arrayChips[newPosition][0].colorChipWhite) {
                var positionJail_X = void 0;
                var positionJail_Y = void 0;
                var oldChip = this.arrayChips[oldPosition].pop();
                this.addChild(oldChip);
                var opponentChip = this.arrayChips[newPosition][0];
                this.addChild(opponentChip);
                switch (opponentChip.colorChipWhite) {
                    case true:
                        this.arrayChips[this.sectorJailWhite].push(opponentChip);
                        positionJail_X = this.getChipPosition(this.sectorJailWhite, this.arrayChips[this.sectorJailWhite].length).x;
                        positionJail_Y = this.getChipPosition(this.sectorJailWhite, this.arrayChips[this.sectorJailWhite].length).y;
                        break;
                    case false:
                        this.arrayChips[this.sectorJailBlack].push(opponentChip);
                        positionJail_X = this.getChipPosition(this.sectorJailBlack, this.arrayChips[this.sectorJailBlack].length).x;
                        positionJail_Y = this.getChipPosition(this.sectorJailBlack, this.arrayChips[this.sectorJailBlack].length).y;
                }
                this.arrayChips[newPosition].pop();
                this.animationMoveChip(opponentChip, positionJail_X, positionJail_Y);
                var newPositionX = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).x;
                var newPositionY = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).y;
                this.animationMoveChip(oldChip, newPositionX, newPositionY);
                this.arrayChips[newPosition].push(oldChip);
                var currentMove = void 0;
                if (this.whiteIsJail) {
                    currentMove = newPosition + 1;
                    this.whiteIsJail = false;
                }
                else {
                    currentMove = Math.abs(newPosition - oldPosition);
                }
                this._activeMoves -= currentMove;
                this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
                this._activeDices = this._activeDices.filter(function (number) {
                    return number <= this._activeMoves;
                }, this);
                console.log('Сделан ход: ', currentMove);
                console.log('Кол-во возможных ходов: ', this._activeMoves);
                console.log('Активные кубики: ', this._activeDices);
                this._isActive = this._activeMoves != 0;
                // this.endOfTurn();
                this.countClick = 0;
            }
            else {
                var oldChip = this.arrayChips[oldPosition].pop();
                this.addChild(oldChip);
                var newPositionX = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).x;
                var newPositionY = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).y;
                this.animationMoveChip(oldChip, newPositionX, newPositionY);
                this.arrayChips[newPosition].push(oldChip);
                var currentMove = void 0;
                if (this.whiteIsJail) {
                    currentMove = newPosition + 1;
                    this.whiteIsJail = false;
                }
                else {
                    currentMove = Math.abs(newPosition - oldPosition);
                }
                this._activeMoves -= currentMove;
                this._activeDices.splice(this._activeDices.indexOf(currentMove), 1);
                this._activeDices = this._activeDices.filter(function (number) {
                    return number <= this._activeMoves;
                }, this);
                console.log('Сделан ход: ', currentMove);
                console.log('Кол-во возможных ходов: ', this._activeMoves);
                console.log('Активные кубики: ', this._activeDices);
                this._isActive = this._activeMoves != 0;
                // this.endOfTurn();
                this.countClick = 0;
            }
            this.offHighLightSectors(); //отключаю подсветку
            this.turnDependsOfTheColor();
            this.endOfTurn();
        };
        Board.prototype.highlightSector = function (sectorIndex) {
            if (this.selectChipWhite) {
                this._activeDices.forEach(function (element) {
                    if (sectorIndex + element < 24) {
                        this.calculateHighlights(sectorIndex + element);
                    }
                    else if (sectorIndex == 24) {
                        this.calculateHighlights(element - 1);
                    }
                }, this);
            }
            else {
                this._activeDices.forEach(function (element) {
                    if (sectorIndex == 25) {
                        this.calculateHighlights(24 - element);
                    }
                    else
                        this.calculateHighlights(sectorIndex - element);
                }, this);
            }
        };
        Board.prototype.calculateHighlights = function (way) {
            if (this.arrayChips[way].length != 0) {
                if (this.arrayChips[way][0].colorChipWhite == this.selectChipWhite) {
                    this.arraySectors[way].highlightMove();
                }
                else if (this.arrayChips[way].length == 1) {
                    this.arraySectors[way].highlightAttack();
                }
            }
            else {
                this.arraySectors[way].highlightMove();
            }
        };
        Board.EVENT_END_OF_TURN = 'EndOfTurn';
        Board.EVENT_MOVE_CHIP = 'moveChip';
        return Board;
    }(Container));
    exports.Board = Board;
});
//# sourceMappingURL=Board.js.map