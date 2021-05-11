<template>
    <div class="spinning-box">
        <div class="spinning-content">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    </div>

</template>
<script>
export default {
    
}
</script>
<style scoped>
        /* 圆圈位置 */
    .spinning-box {
        position: relative;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: orange;
    }

/* 内圈圆容器   调整宽高  小圆点缩放比例自行调整 */
.spinning-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-53%, -50%);
    width: 40px;
    height: 40px;
}
.circle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50% 50%;
    background-color: #d0d0d0;
    animation: loading 1.2s linear infinite;
}
@keyframes loading {
    0% {
        transform: scale(1, 1);
        background-color: #d0d0d0 ;
    }
    10% {
        transform: scale(1.2, 1.2);
        background-color: #a0a0a0 ;
    }
    20% {
        transform: scale(1.8, 1.8);
        background-color: #666666 ;
    }
    40% {
        transform: scale(1, 1);
        background-color: #808080 ;
    }
    60% {
        transform: scale(1, 1);
        background-color: #d0d0d0 ;
    }
    80% {
        transform: scale(1, 1);
        background-color: #d0d0d0 ;
    }
    100% {
        transform: scale(1, 1);
        background-color: #d0d0d0 ;
    }
}
.circle:nth-child(1) {
    top: 50%;
    left: 0%;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

.circle:nth-child(2) {
    top: 23%;
    left: 6%;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.circle:nth-child(3) {
    top: 5%;
    left: 26%;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

.circle:nth-child(4) {
    top: -4%;
    left: 50%;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.circle:nth-child(5) {
    top: 5%;
    left: 77%;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
}

.circle:nth-child(6) {
    top: 23%;
    left: 95%;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.circle:nth-child(7) {
    top: 50%;
    left: 100%;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
}

.circle:nth-child(8) {
    top: 76%;
    left: 95%;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

.circle:nth-child(9) {
    top: 95%;
    left: 75%;
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
}

.circle:nth-child(10) {
    top: 100%;
    left: 50%;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
}

.circle:nth-child(11) {
    top: 96%;
    left: 23%;
    -webkit-animation-delay: 1.1s;
    animation-delay: 1.1s;
}

.circle:nth-child(12) {
    top: 75%;
    left: 6%;
    -webkit-animation-delay: 1.2s;
    animation-delay: 1.2s;
} 
</style>