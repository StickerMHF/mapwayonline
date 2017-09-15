<template>
	<div >
		<button id="btn" :disabled="disabled || time > 0" style="cursor: pointer;">		
			{{ text }}
		</button>			
	</div>
	
	
</template>

<script>
	
	export default{
		name:'code',
		  props: {
                second: {
                    type: Number,
                    default: 60
                },
                disabled: {
                    type: Boolean,
                    default: false
                },
            },
            data() {
                return {
                    time: 0
                }
            },
            methods: {
                run() {
                    this.time = this.second
                    this.timer()
                },
                timer() {
                    if (this.time > 0) {
                        this.time--;
                        setTimeout(this.timer, 1000);
                    }
                },
                stop(){
                	this.time = 0
                }
            },
            computed: {
                text() {
                    return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
                }
            }
		
		
		
	}
</script>

<style>
	#btn{
		background-color: transparent;
		outline: none;
		border: none;
		color: white;
		width: 100%;
		height: 100%;
	}
	
	
</style>