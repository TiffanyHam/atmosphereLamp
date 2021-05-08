
<!-- 档位卡片 -->
<template>
    <div class="hi-cardShift bg_card">
        <div
            v-for="(item, index) in shiftList"
            :key="index"
            class="shiftContent c_90"
            :class="{ 'bg_007DFF10': selectNum == index }"
            @click="handleClick(item, index)"
        >
            <div class="shiftClass" :class="{ 'split-top': index !== 0 }">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HiCardShift",
    props: {
        shiftList: {
            type: Array,
            default: () => []
        },
        selectNum: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleClick (item, index) {
            this.$emit('eventClick', item, index);
           // this.selectNum = index
        }
    }
};
</script>

<style lang='scss' scoped>
.hi-cardShift {
    display: flex;
    flex-direction: column;
    width: 4.44rem;
    overflow: hidden;
    .shiftContent {
        font-size: 0.44rem;
        padding: 0 0.44rem;
        .shiftClass {
            display: flex;
            align-items: center;
            height: 1.33rem;
        }
    }
}
</style>
