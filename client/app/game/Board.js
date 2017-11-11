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
            // ----------Массив с фишками-------------
            _this.arrayChips = [
                [new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [], [], [], [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [], [], [],
                [new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true), new Chip_1.Chip(true)],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [], [], [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false), new Chip_1.Chip(false)],
                [], [], [], [],
                [new Chip_1.Chip(false), new Chip_1.Chip(false)]
            ];
            // ----------Массив секторов которые отслеживают клики(на доске они скрыты)-------------
            _this.arraySectors = [new Sector_1.Sector(0), new Sector_1.Sector(1), new Sector_1.Sector(2), new Sector_1.Sector(3), new Sector_1.Sector(4), new Sector_1.Sector(5), new Sector_1.Sector(6), new Sector_1.Sector(7), new Sector_1.Sector(8), new Sector_1.Sector(9), new Sector_1.Sector(10), new Sector_1.Sector(11), new Sector_1.Sector(12),
                new Sector_1.Sector(13), new Sector_1.Sector(14), new Sector_1.Sector(15), new Sector_1.Sector(16), new Sector_1.Sector(17), new Sector_1.Sector(18), new Sector_1.Sector(19), new Sector_1.Sector(20), new Sector_1.Sector(21), new Sector_1.Sector(22), new Sector_1.Sector(23)];
            // ----------Массив position X позиция и начальной позиции Y конечная позиция Y высчитывается в зависимости от положения фишки в стеке фишек-------------
            _this.arrayPositionPoint = [new PIXI.Point(872, 60), new PIXI.Point(815, 60), new PIXI.Point(753, 60), new PIXI.Point(696, 60), new PIXI.Point(636, 60), new PIXI.Point(578, 60), new PIXI.Point(450, 60), new PIXI.Point(390, 60), new PIXI.Point(330, 60),
                new PIXI.Point(270, 60), new PIXI.Point(210, 60), new PIXI.Point(155, 60), new PIXI.Point(155, 715), new PIXI.Point(210, 715), new PIXI.Point(270, 715), new PIXI.Point(330, 715), new PIXI.Point(390, 715), new PIXI.Point(450, 715), new PIXI.Point(578, 715), new PIXI.Point(636, 715),
                new PIXI.Point(696, 715), new PIXI.Point(753, 715), new PIXI.Point(815, 715), new PIXI.Point(872, 715),];
            _this.bg.texture = _this.bg_skin;
            _this.addChild(_this.bg);
            _this.listenClick();
            _this.drawSectors();
            _this.drawState();
            _this.deactivationSectors(); //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
            return _this;
        }
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
        };
        Board.prototype.drawSectors = function () {
            //задает позицию сектора и добовляет его на доску
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.setPositionSectors();
                this.addChild(this.arraySectors[i]);
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
                this.sound.playSoundClickChip();
                this.countClick++;
                this.firsSelectSectorIndex = this.arraySectors.indexOf(data.target); // делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
                this.selectChip(this.firsSelectSectorIndex); //в этом методе фишка меняет скин на зеленый (активный)
                // console.log('кубики с сервера и их тип');
                // console.log(typeof this.diceFromServer);
                // console.log(this.diceFromServer);
                this.deactivationAllSectors(); //убираю интерактив после выбора фишки со всем секторов кроме подсвеченных
                this.highlightSector(this.firsSelectSectorIndex, this.dice); //кидаю туда значение кубиков которые константа 3 и 1
            }
            else if (this.countClick == 1) {
                this.secondSelectSectorIndex = this.arraySectors.indexOf(data.target);
                this.moveChip(this.firsSelectSectorIndex, this.secondSelectSectorIndex);
                this.deactivationChip(); //делаю фишку не активной
                this.offHighLightSectors(); //отключаю подсветку
                this.deactivationSectors(); //убираю интерактив с секторов что бы можно было нажать только на те на которых есть фишки
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
        Board.prototype.deactivationChip = function () {
            //делаю сектор не активным
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
        Board.prototype.deactivationSectors = function () {
            //убираю интерактив с секторов что бы можно было нажать только на подсвеченные сектора
            for (var i = 0; i < this.arrayChips.length; i++) {
                if (this.arrayChips[i].length == 0) {
                    this.arraySectors[i].interactiveOff();
                }
                else {
                    this.arraySectors[i].interactiveOn();
                }
            }
        };
        Board.prototype.offHighLightSectors = function () {
            for (var i = 0; i < this.arraySectors.length; i++) {
                this.arraySectors[i].greenTrianglSprite.visible = false;
                this.arraySectors[i].yellowTrianglSprite.visible = false;
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
        Board.prototype.setDice = function (first, second) {
            this.dice[0] = first;
            this.dice[1] = second;
        };
        Board.prototype.moveChip = function (oldPosition, newPosition) {
            // let yPosition:number;
            // let newSector:Sector = this.arraySectors[newPosition];
            // //
            // // console.log();
            // // if(newSector.position.y == 745){//условие создано для того что бы правильно рассчитывать координату y
            // //     yPosition =(newSector.position.y-30)- this.OFFSET * this.arrayChips[newPosition].length;
            // // }else {
            // //     yPosition =(newSector.position.y*2) + this.OFFSET * this.arrayChips[newPosition].length;
            // // }
            var oldChip = this.arrayChips[oldPosition].pop();
            this.addChild(oldChip);
            var newPositionX = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).x;
            var newPositionY = this.getChipPosition(newPosition, this.arrayChips[newPosition].length).y;
            TweenLite.to(oldChip, 0.5, {
                x: newPositionX,
                y: newPositionY,
                onStart: this.sound.playSoundMoveChip()
            });
            this.arrayChips[newPosition].push(oldChip);
            this.countClick = 0;
        };
        Board.prototype.highlightSector = function (sectorIndex, dice) {
            //подсветка секторов
            var oneWay;
            var secondWay;
            var thirdWay;
            if (this.selectChipWhite) {
                oneWay = sectorIndex + dice[1];
                secondWay = sectorIndex + dice[0];
                thirdWay = sectorIndex + dice[1] + dice[0];
            }
            else {
                oneWay = sectorIndex - dice[1];
                secondWay = sectorIndex - dice[0];
                thirdWay = sectorIndex - dice[1] - dice[0];
            }
            if (this.arrayChips[oneWay].length != 0) {
                if (this.arrayChips[oneWay][0].colorChipWhite == this.selectChipWhite) {
                    this.arraySectors[oneWay].highlightMove();
                }
                else {
                    this.arraySectors[oneWay].highlightAttack();
                }
            }
            else {
                this.arraySectors[oneWay].highlightMove();
            }
            if (this.arrayChips[secondWay].length != 0) {
                if (this.arrayChips[secondWay][0].colorChipWhite == this.selectChipWhite) {
                    this.arraySectors[secondWay].highlightMove();
                }
                else {
                    this.arraySectors[secondWay].highlightAttack();
                }
            }
            else {
                this.arraySectors[secondWay].highlightMove();
            }
            if (this.arrayChips[thirdWay].length != 0) {
                if (this.arrayChips[thirdWay][0].colorChipWhite == this.selectChipWhite) {
                    this.arraySectors[thirdWay].highlightMove();
                }
                else {
                    this.arraySectors[thirdWay].highlightAttack();
                }
            }
            else {
                this.arraySectors[thirdWay].highlightMove();
            }
        };
        Board.prototype.arrayDicaOfSrtingDice = function (diceFromGame) {
            this.diceFromServer = diceFromGame.split(',');
        };
        return Board;
    }(Container));
    exports.Board = Board;
});
//# sourceMappingURL=Board.js.map