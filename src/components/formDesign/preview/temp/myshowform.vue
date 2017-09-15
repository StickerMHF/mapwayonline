<template>
	<div id="myshowform">
    <!---->
    <div> <el-button type="success" @click="sel = true">选择源</el-button></div>

    <div class="form-main" id="form-main" :style="formdata.formConfig.style" v-if="ready">
        <!--解析展示的样子-->
        <div class="widget_item"
              v-for="(item,index) in formdata.widgetList"
             :key = "item.tagname"
             :style="[{'width':item.layout.w,'height':item.layout.h,'top':item.layout.y,'left':item.layout.x},item.style]">
          <!--展示图片-->
          <label class="widget_content" v-if="item.tagname === 'img'">
            <img :class="item.tagname" :src="item.src?item.src : ''" alt="图片加载失败···">
          </label>
          <!--展示标题-->
          <label class="widget_content" v-if="item.tagname === 'h1'">
            <span :is="item.tagname" :class="item.tagname">{{item.description}}</span>
          </label>
          <!--展示段落-->
          <label class="widget_content" v-if="item.tagname === 'p'">
            <span :is="item.tagname" :class="item.tagname">{{item.description}}</span>
          </label>
          <!--其他空间 balbala-->
          <!--展示其他-->
          <label class="widget_content" v-else>
            <span class="widget_label">{{item.label}}</span>
            <span class="widget_value" >{{ oneData[item.bindFiled] }}</span>
          </label>



        </div>


    </div>

    <!--选择查找源的模态框-->
    <transition name='el-zoom-in-center'>
      <div class="model-bg" v-show ='sel'>
        <div class="model-box"  >

            <div class="model-header">
              <span>请输入展示的源 </span>
              <el-button @click="sel = false" type="text"> × </el-button>
            </div>
            <div class="model-content">
              <div class="input-box">
                <el-input size="small" v-model="detail_source" type="text"></el-input>
              </div>
            </div>
            <div class="model-footer">
              <el-button type="success" @click="showDetail">确定</el-button>
              <el-button @click="showCancel" >取消</el-button>
            </div>

        </div>
      </div>
    </transition>


	</div>
</template>

<script>
	export default {
		name:'myshowform',
		components:{},
    props : {
		  selected: {
		    type:Boolean,
        default:function () {
          return true
        }
      },
      formdata: {
        type: Object,
        default: function () {
          return {}
        }
      },
      showdata:{
        type: String,
        default: function () {
          return ''
        }
      }
    },
		data(){
			return {
        oneData: {},
        ready: false,
        sel: true,
        detail_source:''
			}
		},
		methods:{
      showCancel(){
        // 取消操作 ， 跳转。。
      },
      restoreCanvas(){
        // 还原布局的画布属性

      },
      getDataInfo() { // 获取具体的某一条数据 用于展示
        let that = this;
        //判断是否为数据模型
        if(this.formdata.formConfig.datamodel){
          // 使用数据模型请求数据
          console.log("使用数据源？",this.formdata.formConfig.datamodel);
          console.log('数据模型');
          let url = "formdesign/forms/" + this.formdata.formConfig.tablename + "/field?field=" + this.formdata.formConfig.selectfield + "&value=" + this.detail_source;
          this.$http.get(url).then((res) => {
            if (res.data.result) {
              console.log(res.data)

              if(res.data.data.length > 0){
                that.oneData = res.data.data[0];
              }else{
                this.$message("查询没有结果");
                this.sel = true;
              }

            }else{
              console.log(res.data.message);
              this.$message(res.data.message);
              this.sel = true;

            }
          }).catch((err) => {
            console.log(err);

          });


        }else{
          // 判断这条数据是否已经绑定过表和查找字段了
          if(this.formdata.formConfig.tablename ==="" || this.formdata.formConfig.selectfield ===""){
            this.$message('未绑定表名或者查找源字段!')
          }else{
              console.log('数据表');
              let url = "formdesign/forms/" + this.formdata.formConfig.tablename + "/byField?field=" + this.formdata.formConfig.selectfield + "&value=" + this.detail_source;
              this.$http.get(url).then((res) => {
                if (res.data.result) {
                  that.oneData = res.data.data;

                }else{
                  console.log(res.data.message);
                  this.$message(res.data.message);
                  this.sel = true;

                }
              }).catch((err) => {
                console.log(err);

              });


          }

        }



      },
      restoreWidget(){
        // 还原控件布局的属性
          this.formdata.widgetList.forEach(function(item){
            item.layout.x = item.layout.x + 'px';
            item.layout.y = item.layout.y + 'px';
            item.layout.w = item.layout.w + 'px';
            item.layout.h = item.layout.h + 'px';
            if(item.option){
              item.option = item.option.split(',');
            }

          })

      },
      showDetail(){
        if(this.detail_source !== ''){
          this.getDataInfo();
          this.sel = false;
        }else{
          this.$message("请输入展示源!!")
        }
      }
		},
		created(){
      this.detail_source = this.showdata;
      this.sel = this.selected ;
      console.log(this.formdata,this.showdata);
		},
		mounted(){
      this.restoreCanvas();
      this.restoreWidget();
      this.ready = true;
      if(this.detail_source!==''&&this.detail_source!=="new"){
		    this.sel = false;
        this.getDataInfo();
      }

		},
	}
</script>

<style lang="less" scoped>
.model-bg{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 1995;
  .model-box{
    position: absolute;
    top: 120px;
    left: 50%;
    width: 400px;
    height: 300px;
    background-color: white;
    border-radius: 6px;
    margin-left: -200px;
    .model-header{
      height: 50px;
      padding-left: 30px;
      font-size: 16px;
      border-bottom: 1px solid #ececec;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .model-content{
      padding: 30px 50px;

    }
    .model-footer{
      position: absolute;
      bottom: 30px;
      width: 100%;
      left: 0;
      text-align: center;
    }
  }
}
  #myshowform{
    font-size: 14px;

    .form-main{
      margin: 0 auto;
      position: relative;
      text-align: left;
    }
    .widget_item{
      position: absolute;
      overflow: hidden;
      box-sizing: border-box;
      .widget_content{
        display: flex;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        justify-content: center;

        .img,.h1,.p{
          width: 100%;
          height: 100%;

        }
        .widget_label{
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #c3c3c3;
          width: 100px;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          background-color: rgba(251,251,251,0.7);
          font-size: 14px;
        }
        .widget_value{
          flex-grow: 1;
          display: flex;
          overflow-x: hidden;
          overflow-y: auto;
          align-items: center;
        }


      }


    }
  }


</style>
