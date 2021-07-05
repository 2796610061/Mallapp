<template>
    <div class="table">
        <div class="img">
            <slot name="hot"></slot>
            <slot name="img"></slot>
        </div>
        <ul class="content">
            <slot name="content"></slot>
        </ul>
    </div>
</template>

<style lang="less" scoped>
.table{
    background: #ffffff;
    border-radius: 10px;
    padding: 10px;
    .img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        .hot{
            width: 20px;
            height: 25px;
            background: #0C34BA;
            color: #ffffff;
            line-height: 25px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 5px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    .content{
        width: 100%;
        margin: auto;
        li:first-child{
            font-size: 16px;
            color: #6D6E71;
        }
        li:nth-child(2){
            width: 100px;
            color: #BCB8B2;
            margin: 5px 0 15px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        li:last-child{
            color: #0C34BA;
            font-size: 18px;
            font-weight: bolder;
        }
    }
}
</style>