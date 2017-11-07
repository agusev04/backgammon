
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;

import {Chip} from "./Chip";

import {Sector} from "./Sector";
import InteractionData = PIXI.interaction.InteractionData;



export class Board extends Container {

    public bg_skin: Texture = Texture.fromImage('assets/bg.png');
    public bg: Sprite = new Sprite(PIXI.Texture.WHITE);
    public dice: number [] = [3, 1];
    public OFFSET: number = 30;
    public countClick: number = 0;
    public chipSelectGo: boolean;
    public selectChipWhite: boolean;
    public firsSelectSector:any;
    public tl = new TimelineLite();


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
// ----------Массив position x позиция y высчитывается в зависимости от положения фишки в стеке фишек-------------
    public arrayPosition: number[] = [872, 815, 753, 696, 636, 578, 450, 390, 330, 270, 210, 155,
        155, 210, 270, 330, 390, 450, 578, 636, 696, 753, 815, 872];


    constructor() {
        super();
        this.bg.texture = this.bg_skin;
        this.addChild(this.bg);
        this.listenClick();
        this.drawSectors();
        this.drawState();
    }


    public setPosition() {
        //задает позицию фишек
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                if (i >= 0 && i < 12) {
                    this.arrayChips[i][j].position.x = this.arrayPosition[i];
                    this.arrayChips[i][j].position.y = 60 + this.OFFSET * j;
                } else {
                    this.arrayChips[i][j].position.x = this.arrayPosition[i];
                    this.arrayChips[i][j].position.y = 715 - this.OFFSET * j;
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

    public deleteAllChip() {
        //удаляет все фишки с доски ( собственно тут и кроется вся моя проблема ... не получается удалить одну фишку почему то ... пробовал разными способами 3 дня)
        for (let i = 0; i < this.arrayChips.length; i++) {
            for (let j = 0; j < this.arrayChips[i].length; j++) {
                this.removeChild(this.arrayChips[i][j]);
            }
        }

    }


    public setPositionSectors() {
        //задает позицию секторов которые отслеживают клики. сектора на доске скрыты
        for (let i = 0; i < this.arrayPosition.length; i++) {
            if (i >= 0 && i < 12) {
                this.arraySectors[i].position.set(this.arrayPosition[i], 30);
            } else {
                this.arraySectors[i].position.set(this.arrayPosition[i], 745);
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
            this.arraySectors[i].sectorSprite.on('click', this.sectorClick, this);
        }
    }

    private sectorClick(data: InteractionData): void {
        //тут начинается магия
        if (this.countClick == 0) {
            this.countClick++;
            this.firsSelectSector = data.target.parent;// делаю это для того что бы можно было воспользоваться сектором на который кликнули первый раз т.е выбрали фишку
            this.selectChip(data.target.parent);//в этом методе фишка меняет скин на зеленый (активный)
            this.deactivationSectors();//убираю интерактив с секторов что бы можно было нажать только на подсвеченные сектора
            this.highlightSector(data.target.parent, this.dice);//кидаю туда значение кубиков которые константа 3 и 1
        } else if (this.countClick == 1) {
            // this.moveChip(this.firsSelectSector,data.target.parent);
            this.arrayPush(data.target.parent);//На который сектор кликнули туда пушу новую фишку индекс секторов и индекс массива фишек совпадает
            this.deleteAllChip();
            this.arraySplice(this.firsSelectSector);//удаляю фишку с массива
            this.drawState();
            this.deactivationChip();//делаю фишку не активной
            this.deactivationSector();//делаю сектор не активным
            //P/S в таком состоянии работает все хорошо но без анимации
            //если убрать комент со строки this.moveChip(this.firsSelectSector,data.target.parent);
            //и поставить комент на this.deleteAllChip(); this.drawState();
            // то будет работать с анимацией но постоянно будет оставаться последняя фишка на доске как будто копия какая то хотя в массиве фишки не будет будет только ее скин на доске
            //читая форумы и документацию пикси по логике фишка должна убираться removeChild но removeChild почему то не работает на одну фишку ... работает только если убирать все =( жизнь боль.
        }

    }

    public selectChip(selectSector: any) {
        //передаю сюда сектор по которому кликнули первый раз ( индекс сектора совподает с индексом массива фишек )
        if (this.countClick == 1) {
            if (this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].colorChipWhite) {
                this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].chipSprite.texture = this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].chipSkinWhite_active;
                this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].selectNow = true;
                this.chipSelectGo = true;
                this.selectChipWhite = true;

            } else {
                this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].chipSprite.texture = this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].chipSkinBlack_active;
                this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].selectNow = true;
                this.chipSelectGo = true;
                this.selectChipWhite = false;
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

    public deactivationSectors(){
        //убираю интерактив с секторов что бы можно было нажать только на подсвеченные сектора
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].sectorSprite.interactive = false;
        }
    }

    public deactivationSector(){
        for (let i = 0; i < this.arraySectors.length; i++) {
            this.arraySectors[i].greenTrianglSprite.visible = false;
            this.arraySectors[i].yellowTrianglSprite.visible = false;
            this.arraySectors[i].sectorSprite.interactive = true;
        }
    }

    public arraySplice(selectSector:any){
        //удаляю фишку с массива
        this.arrayChips[selectSector.index].splice(this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1], 1);
    }

    public arrayPush(selectSector: any) {
        //На который сектор кликнули второй раз туда пушу новую фишку
        if (this.chipSelectGo) {
            this.arrayChips[selectSector.index].push(new Chip(this.selectChipWhite));
            this.arrayChips[selectSector.index][this.arrayChips[selectSector.index].length - 1].position.set(selectSector.position.x, selectSector.position.y + this.OFFSET * this.arrayChips[selectSector.index].length);
            this.chipSelectGo = false;
        }
        this.countClick = 0;
    }

    public moveChip(oldPosition:any,newPosition:any) {
        let yPosition:number;

        if(newPosition.position.y == 745){//условие создано для того что бы правильно рассчитывать координату y
            yPosition = newPosition.position.y - this.OFFSET * this.arrayChips[newPosition.index].length;
        }else {
            yPosition = newPosition.position.y + this.OFFSET * this.arrayChips[newPosition.index].length;
        }

        TweenLite.to(this.arrayChips[oldPosition.index][this.arrayChips[oldPosition.index].length - 1], 0.5, {
            x: newPosition.position.x,
            y: yPosition,
            onComplete: goDrawState.bind(this)
        });
        function goDrawState(){
            this.drawState();
        }
    }

    public highlightSector(sector: any, dice: any) {
        //подсветка секторов
        let oneWay:number;
        let secondWay:number;
        let thirdWay:number;

        if(this.selectChipWhite){
            oneWay = sector.index + dice[1];
            secondWay = sector.index + dice[0];
            thirdWay = sector.index + dice[1] + dice[0];
        }else {
            oneWay = sector.index - dice[1];
            secondWay = sector.index - dice[0];
            thirdWay = sector.index - dice[1] - dice[0];
        }

        if(this.arrayChips[oneWay].length!=0){
            if(this.arrayChips[oneWay][0].colorChipWhite == this.selectChipWhite){
                this.arraySectors[oneWay].greenTrianglSprite.visible = true;
                this.arraySectors[oneWay].sectorSprite.interactive = true;
            }else {
                this.arraySectors[oneWay].yellowTrianglSprite.visible = true;
                this.arraySectors[oneWay].sectorSprite.interactive = false;
            }
        }else {
            this.arraySectors[oneWay].greenTrianglSprite.visible = true;
            this.arraySectors[oneWay].sectorSprite.interactive = true;
        }
        if(this.arrayChips[secondWay].length!=0){
            if(this.arrayChips[secondWay][0].colorChipWhite==this.selectChipWhite){
                this.arraySectors[secondWay].greenTrianglSprite.visible = true;
                this.arraySectors[secondWay].sectorSprite.interactive = true;
            }else {
                this.arraySectors[secondWay].yellowTrianglSprite.visible = true;
                this.arraySectors[secondWay].sectorSprite.interactive = false;
            }
        }else {
            this.arraySectors[secondWay].greenTrianglSprite.visible = true;
            this.arraySectors[secondWay].sectorSprite.interactive = true;
        }
        if(this.arrayChips[thirdWay].length!=0){
            if(this.arrayChips[thirdWay][0].colorChipWhite==this.selectChipWhite){
                this.arraySectors[thirdWay].greenTrianglSprite.visible = true;
                this.arraySectors[thirdWay].sectorSprite.interactive = true;
            }else {
                this.arraySectors[thirdWay].yellowTrianglSprite.visible = true;
                this.arraySectors[thirdWay].sectorSprite.interactive = false;
            }
        }else {
            this.arraySectors[thirdWay].greenTrianglSprite.visible = true;
            this.arraySectors[thirdWay].sectorSprite.interactive = true;
        }

    }
}


