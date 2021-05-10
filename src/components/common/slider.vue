<template>
    <div class="hi-slider">
        <div class="bar bg_slider" ref="bar" @click="clickBar($event)">
            <div class="progress bg_007DFF"
                :style="{width: switchLeft}"
            ></div>
            <div
                class="block"
                ref="block"
                :style="{left: switchLeft}"
                @touchmove.prevent="touchMove($event)"
                @touchstart.prevent="touchStart($event)"
                @touchend.prevent="touchEnd($event)"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HiSlider',
    props: {
        percent: {
            type: String,
            default: '0'
        }
    },
    data () {
        return {
            switchLeft: '0',
            initBlock: 0,
            barWidth: 0, // 滑动条长度
            blockWidth: 0, // 滑块宽度
            max: 0, // 能够滑动最大距离
            distance: 0 // 临时变量，记录开始滑动时的位置
        };
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.initBlock = this.$refs.block.offsetLeft;
            this.barWidth = this.$refs.bar.offsetWidth;
            this.blockWidth = this.$refs.block.offsetWidth;
            this.max = this.barWidth - this.blockWidth;
        },
        touchStart (e) {
            if (!this.barWidth) { // 有些机型会出现mounted里获取不到元素宽度问题，做下兼容
                this.init();
            }
            this.distance = e.targetTouches[0].pageX;
        },
        touchMove (e) {
            let diff = e.targetTouches[0].pageX - this.distance;
            let left = this.initBlock + diff;
            if (left < 0) {
                left = 0;
            }
            if (left > this.max) {
                left = this.max;
            }
            this.switchLeft = left + 'px';
            let v = (left / this.max) * 100;
            this.$emit('handleTouchMove', parseInt(v) + '');
        },
        touchEnd (e) {
            this.touchEndCb();
        },
        clickBar (e) {
            let left = e.offsetX > this.max ? this.max : e.offsetX;
            this.switchLeft = left + 'px';
            this.touchEndCb();
        },
        touchEndCb () {
            this.initBlock = parseInt(this.switchLeft);
            let v = (this.initBlock / this.max) * 100;
            this.$emit('handleTouchEnd', parseInt(v) + '');
        }
    },
    watch: {
        percent: {
            handler: function (val) {
                let v = this.max ? (this.initBlock / this.max) * 100 : 0;
                if (+val !== parseInt(v)) {
                    this.$nextTick(() => {
                        this.switchLeft = parseInt(this.max * (val / 100)) + 'px';
                        this.initBlock = parseInt(this.switchLeft);
                    });
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.hi-slider {
    height: 24px;
    width: 100%;
    position: relative;
    .bar {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 2px;
        border-radius: 1px;
        .progress {
            height: 100%;
            border-radius: 1px;
        }
        .block {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 24px;
            width: 24px;
            border-radius: 50%;
            border: 0.25px solid rgba(0, 0, 0, .2);
            background-color: #ffffff;
            box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.15),
                        0 1px 1px 0 rgba(0, 0, 0, 0.16);
        }
    }
}
</style>
