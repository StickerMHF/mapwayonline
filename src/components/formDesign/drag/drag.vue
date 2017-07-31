<template>
	
	
    <div class='dragAndResize' ref='container' 
    	@mousedown="containerMouseDown($event)" 
        @mouseup="endMove($event)" 
        @mousemove="moving($event)">       
       <div v-if="renderOk">
            <div v-if="item.sizex!=undefined" 
            	:class="{item:true,moveAnimation:moveAnimate,movingItem:item.isPlayer,canNotDrag:!draggable}"
            	:ref="'item'+index" 
            	v-for="(item,index) in yourList"
                :key="'item'+index" 
                :style="nowItemStyle(item,index)"              	
                > 
                <slot :name="'slot'+index" ></slot>
                <span title="缩放" class="resizeHandle" v-show="resizable" @mousedown="startResize($event,item,index)"></span>
            	<span title="拖动" style="cursor: move;
                	display: inline-block;
                	height: 16px;
                	width: 16px;
           			box-sizing: border-box;
 					background-color: rgba(102,204,255,0.5);
                	position: absolute;
                	z-index：99999;
                	top: 0;
                	left: 0;" 
                	class="dragicon" v-show="draggable" @mousedown="startMove($event,item,index)" 
                	>
                </span>
            </div>
       </div>     
    </div>
</template>

<script>
    import js from "./drag.js"
    export default js

</script>

<style lang="less" scoped>
.dragAndResize
{
    position: relative;
    user-select: none;

    *
    {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .item
    {
        position: absolute;

        width: 100px;
        height: 100px;

     /*   cursor: move;*/

       /* border: 1px dotted #BBBBBB;*/
        background-color: #fff;

        .resizeHandle
        {
            position: absolute;
            right: 2px;
            bottom: 2px;

            width: 0;
            height: 0;

            cursor: nw-resize;

            opacity: .5;
            border-bottom: 10px solid black;
            border-left: 10px solid transparent;
        }
    }

    .moveAnimation
    {
        transition: top 80ms ease;
    }

    .canNotDrag
    {
        cursor: default!important;
    }

    .cloneNode
    {
        z-index: 3;

        transition: none;

        opacity: .5;
    }

    .movingItem
    {
        position: absolute;

        border: none;
        &:before
        {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            content: '';

            background-color: #bbb;
        }
    }

    .positionBox
    {
        position: fixed;
        top: 0;
        right: 100px;

        overflow: auto;

        width: 500px;
        height: 500px;

        border: 1px solid;
    }

    .coords
    {
        position: fixed;
        right: 100px;
        bottom: 200px;

        overflow: auto;

        width: 200px;
        height: 200px;

        border: 1px solid;
    }
}

</style>
