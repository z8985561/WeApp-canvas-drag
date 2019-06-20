class CanvasDrag{
  constructor(option){
    this.option = option;
    this.init();
  }
  init(){
    this.context = wx.createCanvasContext(this.option.selection);
    this.setCanvasBg();
    this.drawArea();
  }
  // 设置背景
  setCanvasBg(){
    this.context.drawImage(this.option.bg, 0, 0)
    this.context.restore(true)
  }
  // 设置绘画区域
  drawArea(){
    this.context.setStrokeStyle('red')
    this.context.strokeRect(this.option.drawAreaX, this.option.drawAreaY, this.option.drawAreaWidth, this.option.drawAreaHeight)
    this.context.draw()
  }
}
export default CanvasDrag;