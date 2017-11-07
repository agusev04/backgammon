



import Container = PIXI.Container;
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {Board} from "./Board";



export class Chip extends Container{


    public chipColorBlack: boolean;
    public chipSprite: Sprite = new Sprite(PIXI.Texture.WHITE);
    public chipSkinWhite: Texture = Texture.fromImage('assets/white.png');
    public chipSkinWhite_active: Texture = Texture.fromImage('assets/white_active.png');
    public chipSkinBlack: Texture = Texture.fromImage('assets/black.png');
    public chipSkinBlack_active: Texture = Texture.fromImage('assets/black_active.png');
    public colorChipWhite:boolean;
    public selectNow:boolean;

    // public chip_color_black: boolean;
    // public chip_sprite: Sprite = new Sprite(PIXI.Texture.WHITE);
    // public chip_skin_white: Texture = Texture.fromImage('assets/white.png');
    // public chip_skin_white_active: Texture = Texture.fromImage('assets/white_active.png');
    // public chip_skin_black: Texture = Texture.fromImage('assets/black.png');
    // public chip_skin_black_active: Texture = Texture.fromImage('assets/black_active.png');
    // public color_chip_white:boolean;
    // public select_now:boolean;


    constructor(color_white:boolean){
        super();
        this.colorChipWhite = color_white;
        this.black_or_white();
        this.chipSprite.anchor.set(0.5);
        this.chipSprite.width = 60;//Game.WIDTH/15;
        this.chipSprite.height = 60;//Game.HEIGHT/15;
        this.selectNow = false;
        this.addChild(this.chipSprite);

    }


    // constructor(color_black:boolean,position_x:number,index:number){
    //     super();
    //     this.chip_color_black = color_black;
    //     this.chip_sprite.texture= this.chip_skin_white;
    //     this.chip_sprite.position.x = position_x;
    //     if(this.chip_color_black){
    //         this.chip_sprite.position.y = 715-index*30;
    //     }else
    //         this.chip_sprite.position.y = 60+index*30;
    //
    //     this.addChild(this.chip_sprite);
    //     this.setup();

//                                                                                                  ПЕРВЫЙ ВАРИАНТ
    // constructor(color_black:boolean, position_x:number,position_y:number){
    //     super();
    //     this.chip_color_black = color_black;
    //     // this.chip_index = chip_index;
    //     this.chip_sprite.texture= this.chip_skin_white;
    //     this.chip_sprite.position.x = position_x;
    //     this.chip_sprite.position.y = position_y;
    //     // this.step_position_stack =
    //     this.addChild(this.chip_sprite);
    //     this.setup();
    //
    // };



    public black_or_white(){
        if(this.colorChipWhite){
            this.chipSprite.texture = this.chipSkinWhite;
        }
        else
            this.chipSprite.texture = this.chipSkinBlack;
    }
    // protected setup() {
    //     this.chipSprite
    //          .on('pointerdown', onDragStart)
    //          .on('pointerup', onDragEnd)
    //          .on('pointerupoutside', onDragEnd)
    //          .on('pointermove', onDragMove);
    //
    //      function onDragStart(event:any){
    //          this.data = event.data;
    //          this.alpha = 0.5;
    //          this.dragging = true;
    //      }
    //      function onDragEnd(){
    //          this.alpha = 1;
    //          this.dragging = false;
    //          this.data = null;
    //      }
    //      function onDragMove() {
    //          if (this.dragging) {
    //              var newPosition = this.data.getLocalPosition(this.parent);
    //              this.x = newPosition.x;
    //              this.y = newPosition.y;
    //          }
    //      }
    // }

    // }
    // protected changeTexture(on_off:boolean){
    //     if(on_off){
    //         if(this.color_chip_black){
    //             this.chip_sprite.texture = this.chip_skin_black_active;
    //         }else
    //             this.chip_sprite.texture = this.chip_skin_white_active;
    //
    //     }else
    //         if(this.color_chip_black){
    //             this.chip_sprite.texture = this.chip_skin_black;
    //         }else
    //             this.chip_sprite.texture = this.chip_skin_white;
    // }
}