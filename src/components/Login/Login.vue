<template>
	<div class="container demo-1">
		<div class="content">
			<div id="large-header" class="large-header">
				<canvas id="demo-canvas"></canvas>
				<div class="logo_box" id="logobox">
					<div class="box_login active lbox" id="box_login">
						<h3>MapWayOnline</h3>
						<div class="input_outer">
							<span class="u_user"></span>
							<input name="logname" class="text" v-model="loginForm.username" style="color: #FFFFFF !important" type="text" placeholder="请输入账户">
						</div>
						<div class="input_outer">
							<span class="us_uer"></span>
							<input name="logpass" class="text" v-model="loginForm.password" style="color: #FFFFFF !important; position:absolute; z-index:100;" type="password" placeholder="请输入密码">
						</div>
						<div class="mb2">
							<a class="act-but submit" v-on:click="login" href="javascript:;" style="color: #FFFFFF">登录</a>
						</div>
						<div class="fg">
							<div class="forget" v-on:click="toForget">忘记密码</div>
							<div class="register" v-on:click="toRegister">用户注册</div>
						</div>
						</el-form>
					</div>
					<div class="box_forget lbox" id="box_forget">
						<h3>忘记密码</h3>

						<form action="#" name="f" method="post">
							<div class="input_outer">
								<span class="u_user"></span>
								<input name="logname" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户">
							</div>
							<div class="input_outer">
								<span class="us_uer"></span>
								<input name="logpass" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;" value="" type="password" placeholder="请输入密码">
							</div>
							<div class="input_outer">
								<span class="us_uer"></span>
								<input name="logpass" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;" value="" type="password" placeholder="请再输入密码">
							</div>

							<div class="registerbtn">
								<span class="forget_back backbtn" v-on:click="fBackToLogin"></span>
								<span class="register_next nextbtn"></span>
							</div>
						</form>

					</div>
					<div class="box_register lbox" id="box_register">
						<h3>用户注册</h3>
						<form action="#" name="f" method="post">
							<div class="input_outer">
								<span class="u_user"></span>
								<input name="logname" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户">
							</div>
							<div class="input_outer">
								<span class="us_uer"></span>
								<input name="logpass" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;" value="" type="password" placeholder="请输入密码">
							</div>
							<div class="input_outer">
								<span class="us_uer"></span>
								<input name="logpass" class="text" style="color: #FFFFFF !important; position:absolute; z-index:100;" value="" type="password" placeholder="请再输入密码">
							</div>

							<div class="registerbtn">
								<span class="register_back backbtn" v-on:click="rBackToLogin"></span>
								<span class="register_next nextbtn"></span>
							</div>
						</form>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	var Circ = require('./js/EasePack.min.js');
	var TweenLite = require('./js/TweenLite.min.js');
	require('./css/normalize.css');
	require('./css/demo.css');
	require('./css/component.css');
	export default {
		name: 'login',
		data() {
			return {
				loginurl: "user/login",
				loginForm: {
					username: 'admin',
					password: 'admin'
				},
				rememberPassword: true,
				width: 0,
				height: 0,
				largeHeader: document.createElement("div"),
				canvas: {},
				ctx: {},
				points: {},
				target: {},
				animateHeader: true
			}
		},
		beforeUpdate(){
			
		},
		mounted() {
			var _this=this;
			this.initHeader();
			this.initAnimation();
			this.addListeners();
			setTimeout(function() {
					_this.initstar();
				}, 10);
		},
		created() {
			this.loginurl = this.$http.defaults.baseURL + this.loginurl;
			console.log(this.loginurl);
			
			//debugger
		},
		methods: {
			...mapActions([
				'setUserName',
				'setUserInfo'
			]),
			login() {
				//this.setUserName(this.loginForm.username);

				var param = "data=" + JSON.stringify(this.loginForm);
				this.$http.post(this.loginurl, param).then((res) => {
					if(res.data.result){
						this.setUserInfo(res.data.data);
						this.$router.replace('/index')
					}else{
						console.info(res)
					}
				});
				//this.$router.push('/user/' + this.loginForm.username);
			},
			signUp() {
				// 跳转到注册页
				this.$router.replace('/signup')

			},
			//忘记密码
			toForget() {
				document.getElementById("logobox").style.transitionDuration = "2s";
				document.getElementById("logobox").style.transform = "rotateY(180deg)";
				setTimeout(function() {
					document.getElementById("box_forget").style.display = "block";
					document.getElementById("box_forget").style.transform = "rotateY(180deg)";
					document.getElementById("box_login").style.display = "none";
				}, 600);
			},
			//忘记密码返回到登录
			fBackToLogin() {
				document.getElementById("logobox").style.transitionDuration = "2s";
				document.getElementById("logobox").style.transform = "rotateY(0deg)";
				setTimeout(function() {
					document.getElementById("box_login").style.display = "block";
					document.getElementById("box_login").style.transform = "rotateY(0deg)";
					document.getElementById("box_forget").style.display = "none";
				}, 600);
			},
			//注册
			toRegister() {
				document.getElementById("logobox").style.transitionDuration = "2s";
				document.getElementById("logobox").style.transform = "rotateY(180deg)";
				setTimeout(function() {
					document.getElementById("box_register").style.display = "block";
					document.getElementById("box_register").style.transform = "rotateY(180deg)";
					document.getElementById("box_login").style.display = "none";
				}, 600);
			},
			//注册返回到登录
			rBackToLogin() {
				document.getElementById("logobox").style.transitionDuration = "2s";
				document.getElementById("logobox").style.transform = "rotateY(0deg)";
				setTimeout(function() {
					document.getElementById("box_login").style.display = "block";
					document.getElementById("box_login").style.transform = "rotateY(0deg)";
					document.getElementById("box_register").style.display = "none";
				}, 600);
			},
			initHeader() {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
				this.target = {
					x: this.width / 2,
					y: this.height / 2
				};
				this.largeHeader = document.getElementById('large-header');

				this.largeHeader.style.height = this.height + 'px';
				this.canvas = document.getElementById('demo-canvas');
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext('2d');

				this.points = [];
				for(var x = 0; x < this.width; x = x + this.width / 20) {
					for(var y = 0; y < this.height; y = y + this.height / 20) {
						var px = x + Math.random() * this.width / 20;
						var py = y + Math.random() * this.height / 20;
						var p = {
							x: px,
							originX: px,
							y: py,
							originY: py
						};
						this.points.push(p);
					}
				}
				
				//assign a circle to each point
								for(var i in this.points) {
									var c = new this.Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
									this.points[i].circle = c;
									debugger
								}
			},
			initstar(){
					console.time("each point");
				// for each point find the 5 closest points
				for(var i = 0; i < this.points.length; i++) {
					var closest = [];
					var p1 = this.points[i];
					for(var j = 0; j < this.points.length; j++) {
						var p2 = this.points[j]
						if(!(p1 == p2)) {
							var placed = false;
							for(var k = 0; k < 5; k++) {
								if(!placed) {
									if(closest[k] == undefined) {
										closest[k] = p2;
										placed = true;
									}
								}
							}

							for(var k = 0; k < 5; k++) {
								if(!placed) {
									if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
										closest[k] = p2;
										placed = true;
									}
								}
							}
						}
					}
					p1.closest = closest;
				}
				console.timeEnd("each point")

				 
			},
			// Event handling
			addListeners() {
				if(!('ontouchstart' in window)) {
					window.addEventListener('mousemove', this.mouseMove);
				}
				window.addEventListener('scroll', this.scrollCheck);
				window.addEventListener('resize', this.resize);
			},

			mouseMove(e) {
				var posx = 0;
				var posy = 0;
				if(e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				} else if(e.clientX || e.clientY) {
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				this.target.x = posx;
				this.target.y = posy;
			},

			scrollCheck() {
				if(document.body.scrollTop > this.height) this.animateHeader = false;
				else this.animateHeader = true;
			},

			resize() {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
				this.largeHeader.style.height = this.height + 'px';
				this.canvas.width = this.width;
				this.canvas.height = this.height;
			},

			// animation
			initAnimation() {
				this.animate();
				for(var i in this.points) {
					this.shiftPoint(this.points[i]);
				}
			},

			animate() {
				if(this.animateHeader) {
					this.ctx.clearRect(0, 0, this.width, this.height);
					for(var i in this.points) {
						// detect points in range
						if(Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
							this.points[i].active = 0.3;
							//this.points[i].circle.active = 0.6;
						} else if(Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
							this.points[i].active = 0.1;
							//this.points[i].circle.active = 0.3;
						} else if(Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
							this.points[i].active = 0.02;
							//this.points[i].circle.active = 0.1;
						} else {
							this.points[i].active = 0;
							//this.points[i].circle.active = 0;
						}

						this.drawLines(this.points[i]);
						//this.points[i].circle.draw();
					}
				}
				requestAnimationFrame(this.animate);
			},

			shiftPoint(p) {
				var _this = this;
				TweenLite.TweenLite.to(p, 1 + 1 * Math.random(), {
					x: p.originX - 50 + Math.random() * 100,
					y: p.originY - 50 + Math.random() * 100,
					ease: Circ.easeInOut,
					onComplete: function() {
						_this.shiftPoint(p);
					}
				});
			},

			// Canvas manipulation
			drawLines(p) {
				if(!p.active) return;
				for(var i in p.closest) {
					this.ctx.beginPath();
					this.ctx.moveTo(p.x, p.y);
					this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
					this.ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
					this.ctx.stroke();
				}
			},

			Circle(pos, rad, color) {
				var _this = this;

				// constructor
				(function() {
					_this.pos = pos || null;
					_this.radius = rad || null;
					_this.color = color || null;
				})();

				var draw = function() {
					if(!_this.active) return;
					_this.ctx.beginPath();
					_this.ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
					_this.ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
					_this.ctx.fill();
				};
				//返回之后 有误mhf
				//return _this;
			},
			// Util
			getDistance(p1, p2) {
				return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
			}

		}
	}
</script>