
<template>
   <div class="bleDialog" v-show="isAppear">
        <!-- 蒙版 -->
        <div class="mask animate__animated animate__fadeIn" key="1" @click="close" v-if="show" @touchmove.prevent>
        </div>
        <div class="dialog" v-show="show" key="2">
            <div class="dialogTitle">
                <slot name="title">{{$t('Hint.tipTitle')}}</slot>
            </div>
            <div class="dialogContent">
                <div>
                    <slot>{{$t('Hint.tipText')}}</slot>
                    <br />
                    <slot>{{$t('Hint.tipText1')}} </slot>
                    <br />
                    <slot>{{$t('Hint.tipText2')}}</slot>
                    <br />
                    <slot>{{$t('Hint.tipText3')}}</slot>
                </div>
                
            </div>
            <div class="dialog_footer fb">
                <span @click="close">{{$t('Hint.known')}}</span>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  name: 'Cdialog',
  data(){
      return{
         isAppear:true,
         show: true
      }
  },
  props: {
  },
  methods:{
      close(){
          this.show = false
      }
  }

}
</script>
<style lang="scss" scoped>
.bleDialog {
    .mask {
        background-color: rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
    button {
        background: #f95644;
        border-radius: 32px;
        width: 180px;
        height: 50px;
        font-size: 18px;
        color: #ffffff;
    }
    .close {
        top: 0;
        right: 10px;
        position: absolute;
        display: block;
        width: 40px;
        height: 40px;
    }

    .dialog {
        border-radius: 15px;
        width: 328px;
        padding: 0px 24px;
        z-index: 999;
        position: absolute;
        left: 50%;
        bottom: 16px;
        margin-left: -164px;
        background-color: #fff;

        .dialogTitle {
            font-size: 20px;
            color: rgba(0, 0, 0, .9);
            // margin: 0 0 15px 0;
            height: 56px;
            line-height: 56px;
        }
        .options {
            width: 100%;
            .item_title {
                font-size: 16px;
                color: rgba(0, 0, 0, .9);
            }
            .item_round {
                width: 16px;
                height: 16px;
            }
            .bottomBorderNone {
                border-bottom: none;
            }
        }
        .dialogContent {
            font-size: 16px;
            line-height: 24px;
            color: rgba(0, 0, 0, .9);
            text-align: left;
            // letter-spacing: 1px;
        }
        .dialog_footer {
            width: 100%;
            //  margin: 8px 0 0 0;
            color: #007DFF;
            font-size: 16px;
            justify-content: center;
            height: 56px;
            line-height: 56px;
            .line {
                    height: 50%;
                    border: 0.0069rem solid rgba(0, 0, 0, 0.2);
                    margin: 0 50px;
                }
                .btn {
                    display: inline-block;
                    width: 50%;
                }
                .btn_left {
                    //border: 1px solid red;
                    text-align: right;
                }
                .btn_right {
                    //border: 1px solid red;
                    text-align: left;
                }
        }
    }
    .fb {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .flexR {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
// 暗黑模式
.theme-dark {
    .dialog {
        background-color: #262626;
        .dialogTitle {
            color: rgba(255, 255, 255, .9);
        }
        .dialogContent {
            color: rgba(255, 255, 255, .86);
        }
        .dialog_footer {
            color: #3F97E9;
        }
    }
}
</style>