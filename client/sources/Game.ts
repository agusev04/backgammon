///<reference path="Board.ts"/>
/**
 * @author Вячеслав И.Э.
 * @version 1.0
 * @since 08 Октябрь 2017
 */
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;


import {Board} from "./Board";
import {Chip} from "./Chip";
import {Sector} from "./Sector";
import {Network} from "./Network";
import EventEmitter = PIXI.utils.EventEmitter;
declare const Draggable:any;
declare const TweenMax:any;

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<
    public static EVENT = new EventEmitter();
    public static WIDTH:number = 1024;
    public static HEIGHT:number = 768;


    // public array_chips:Board[] = [
    //     new Board(5,false,155,60),
    //     new Board(3,false,390,60),
    //
    //     new Board(5,true,155,715),
    //     new Board(3,true,390,715),
    //
    //     new Board(5,false,580,60),
    //     new Board(2,false,875,60),
    //
    //     new Board(5,true,580,715),
    //     new Board(2,true,875,715),
    // ];

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this.configurate();
    }

    protected configurate():void
    {
        let bg:Sprite = new Sprite(PIXI.Texture.WHITE);

        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;

        let logo:Sprite = Sprite.fromImage('assets/logo.jpg');
        let server:Network = new Network('ws://localhost:8888/ws');

        setTimeout(function () {
            console.log('константа состояния =    '+server._soket.readyState.toString());
            let Hello = { "CLASS_NAME": "EnterPackage" ,
                           "Name":"P1"};

            server.send(Hello);

            // server.disconnect();
        },6000);

        // Game.EVENT.on('disconnect',function () {
        //     console.log('disckonect_mejdy_nami_okeani')
        // });
        // let dice:number [] = [3,2];
        let board:Board = new Board;
        this.addChild(bg);
        this.addChild(logo);
        this.addChild(board);
        // board.emit('dice',dice);
        // this.addChild(board);
        // this.addTriangles();

        // Game.EVENT.on('go_draw', function () {
        //     board.drawState();
        // });

        // Game.EVENT.on('go_ot4et',function () {
        //     console.log(board.chip_select.chip_sprite.position.x);
        // });

        // Game.EVENT.on('go_draw',function () {
        //     board.create_chip_v_1_4();
        //     Game.EVENT.emit('add_chips')
        // });

        logo.anchor.set(0.5);
        logo.x = Game.WIDTH / 2;
        logo.y = Game.HEIGHT / 2;

    }

    // public addChips(){
    //     for (let i = 0  ; i < Board.array_chips.length; i++){
    //         for (let j = 0  ; j < Board.array_chips[i].length; j++){
    //             this.addChild(Board.array_chips[i][j])
    //         }
    //     }
    // }

    // public addChips() {
    //     for (let i = 0; i < Board.array_chips.length; i++) {
    //         this.addChild(Board.array_chips[i])
    //     }
    // }
    // protected addTriangles(){
    //     for (let i = 0; i < this.Triangles_position_start.length; i ++){
    //     this.addChild(this.Triangles_position_start[i]);
    //     }
    // }
    //



    // Base >>--------------------------------------------------------------<<<<

    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}