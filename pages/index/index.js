//index.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';

Page({
    data: {
      bgWidth:0,
      bgHeight:0,
      graph: {},
      ctxBg:null
    },
    onLoad(options){
      new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: '/assets/images/zheng.jpg',
          success(res) {
            const imgInfo = {}
            imgInfo.width = res.width;
            imgInfo.height = res.height;
            resolve(imgInfo);
          }
        })
      })
        .then((imgInfo)=>{
          console.log(imgInfo)
          this.setData({
            bgWidth: imgInfo.width,
            bgHeight: imgInfo.height
          })
          this.data.ctxBg = wx.createCanvasContext('canvas-bg');
          // this.data.ctxBg.drawImage('/assets/images/zheng.jpg', 0, 0, imgInfo.width, imgInfo.height);
          // this.data.ctxBg.draw()
          this.data.ctxBg.drawImage('/assets/images/zheng.jpg', 0, 0, this.data.bgWidth, this.data.bgHeight);
          this.data.ctxBg.draw(true);
        })
      
    },
    /**
     * 添加测试图片
     */
    onAddTest() {
      new Promise((resolve, reject)=>{
        wx.getImageInfo({
          src: '/assets/images/test.jpg',
          success(res) {
            const imgInfo = {}
            imgInfo.width = res.width;
            imgInfo.height = res.height;
            resolve(imgInfo);
          }
        })
      })
        .then((imgInfo)=>{
          this.setData({
            graph: {
              w: imgInfo.width,
              h: imgInfo.height,
              type: 'image',
              url: '/assets/images/test.jpg',
            }
          });
      })
    },

    /**
     * 添加图片
     */
    onAddImage() {
        wx.chooseImage({
            success: (res) => {
                this.setData({
                    graph: {
                        w: 200,
                        h: 200,
                        type: 'image',
                        url: res.tempFilePaths[0],
                    }
                });
            }
        })
    },

    /**
     * 添加文本
     */
    onAddText() {
        this.setData({
            graph: {
                type: 'text',
                text: 'helloworld',
            }
        });
    },

    /**
     * 导出图片
     */
    onExport() {
        CanvasDrag.export()
            .then((filePath) => {
                console.log(filePath);
              // wx.saveImageToPhotosAlbum({
              //   filePath: filePath,
              //   success(res) {
              //     console.log(res);
              //   }
              // })
                // wx.previewImage({
                //     urls: [filePath]
                // })
                new Promise((res,rej)=>{
                  this.data.ctxBg.drawImage(filePath, 113, 120, 150, 200);
                  this.data.ctxBg.draw(true);
                  res(filePath)
                }).then(res=>{
                  console.log(res)
                  wx.canvasToTempFilePath({
                    canvasId: 'canvas-bg',
                    success: (res) => {
                      console.log(res.tempFilePath)
                    },
                    fail: (e) => {
                      console.log(e)
                    },
                  }, this);
                })
              
              
            })
            .catch((e) => {
                console.error(e);
            })
    },

    /**
     * 改变文字颜色
     */
    onChangeColor() {
        CanvasDrag.changFontColor('blue');
    },

    /**
     * 改变背景颜色
     */
    onChangeBgColor() {
        CanvasDrag.changeBgColor('yellow');
    },

    /**
     * 改变背景照片
     */
    onChangeBgImage() {
        CanvasDrag.changeBgImage('../../assets/images/test.jpg');
    },

    /**
     * 导出当前画布为模板
     */
    onExportJSON(){
        CanvasDrag.exportJson()
          .then((imgArr) => {
            console.log(JSON.stringify(imgArr));
        })
          .catch((e) => {
              console.error(e);
          });
    },

    onImport(){
        // 有背景
        // let temp_theme = [{"type":"bgColor","color":"yellow"},{"type":"image","url":"../../assets/images/test.jpg","y":98.78423143832424,"x":143.78423143832424,"w":104.43153712335152,"h":104.43153712335152,"rotate":-12.58027482265038,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":24.875030530031438,"y":242.56248473498428,"x":119.57012176513672,"w":116.73966979980469,"h":34.87503053003144,"rotate":8.873370699754087}];
        // 无背景
        let temp_theme = [{"type":"image","url":"../../assets/images/test.jpg","y":103,"x":91,"w":120,"h":120,"rotate":0,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":20,"y":50,"x":50,"rotate":0}];

        CanvasDrag.initByArr(temp_theme);
    },

     onClearCanvas:function(event){
        let _this = this;
        _this.setData({canvasBg:null});
        CanvasDrag.clearCanvas();
    },
});
