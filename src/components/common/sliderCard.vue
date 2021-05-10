<!--
 * @Author: your name
 * @Date: 2021-05-10 16:00:13
 * @LastEditTime: 2021-05-10 16:17:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \atmosphereLamp\src\components\common\sliderCard.vue
-->
<template>
    <div class="hi-card">
        <div class="left">
            <div class="left-txt c_90">{{leftTxt}}</div>
            <div class="left-msg c_007DFF" v-if="leftMsg">{{leftMsg}}</div>
        </div>
        <div class="right">
            <hi-slider :percent="percent" @handleTouchEnd="sliderTouchEnd" @handleTouchMove="sliderTouchMove"></hi-slider>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sliderCard',
    data () {
        return {
            showVal: '0'
        };
    },
    props: {
        leftTxt: {
            type: String,
            default: ''
        },
        
        percent: {
            type: String,
            default: '0'
        },
        unit: {
            type: String,
            default: ''
        }
    },
    methods: {
        sliderTouchEnd (val) {
            this.$emit('sliderTouchEnd', val);
        },
        sliderTouchMove (val) {
            this.showVal = val;
        }
    },
    computed: {
        leftMsg () {
            return `${this.showVal}${this.unit}%`;
        }
    },
    watch: {
        percent: {
            handler: function (val) {
                this.showVal = val;
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.hi-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    // padding: 0 24px;
    .left {
        width: 20%;
        line-height: 1.33;
        margin-left: 24px;
        .left-txt {
            font-size: 16px;
        }
        .left-msg {
            font-size: 12px;
            margin-top: 2px;
        }
    }
    .right {
        flex: 1;
        // height: 100%;
        margin: 0 24px 0 8px;
    }
}
</style>