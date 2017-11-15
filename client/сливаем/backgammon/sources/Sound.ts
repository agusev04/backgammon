import Container = PIXI.Container;

export class Sound  {
    public soundClickChip:string = '1';
    public soundMoveChip:string = '2';

    constructor() {
        this.loadSound();
    }

    public loadSound(){
        createjs.Sound.registerSound("assets/sound/clickChip.mp3",this.soundClickChip);
        createjs.Sound.registerSound("assets/sound/moveChip.mp3",this.soundMoveChip);
    }
    public playSoundClickChip(){
        createjs.Sound.play(this.soundClickChip);
    }
    public playSoundMoveChip(){
        createjs.Sound.play(this.soundMoveChip);
    }
}