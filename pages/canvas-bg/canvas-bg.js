import CanvasDrag from "../../lib/CanvasDrag.js"

// pages/canvas-bg/canvas-bg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option:{
      bg: "/assets/images/zheng.jpg",
      selection:"firstCanvas",
      drawAreaX:120,
      drawAreaY: 100,
      drawAreaWidth:140,
      drawAreaHeight:160,
    }
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    new CanvasDrag(this.data.option)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})