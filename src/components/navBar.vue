<template>
	<div id="nav-bar">
		<div class="logo">
			<router-link to='/'><i class="nav_logo"></i></router-link>
		</div>
		<ul class="nav-list">
			<el-tooltip class="item" effect="dark" content="数据中心" placement="right">
				<li class="nav-item"  @click = "hoverClick($event)">
					<router-link to='/datacenter' class="navDataImg imgPar">
						<i class="nav_data nav_img"></i>
					</router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="FormDesign" placement="right">
				<li class="nav-item" @click = "hoverClick($event)">
					<router-link to='/formDesign' class="navFormImg imgPar" ><i class="nav_form nav_img"></i></router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="MapDesign" placement="right">
				<li class="nav-item" @click = "hoverClick($event)">
					<router-link to='/mapdesign' class="navMapImg imgPar"><i class="nav_map nav_img"></i></router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="ChartDesign" placement="right">
				<li class="nav-item" @click = "hoverClick($event)">
					<router-link to='/chartDesign' class="navChartImg imgPar"><i class="nav_chart nav_img"></i></router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="AppDesign" placement="right">
				<li class="nav-item" @click = "hoverClick($event)">
					<router-link to='/formDesign' class="navAppImg imgPar"><i class="nav_app nav_img"></i></router-link>
				</li>
			</el-tooltip>
		</ul>

		<ul class="user-info">
			<el-tooltip class="item" effect="dark" content="个人中心" placement="right">
				<li class="user-item">
					<router-link to='/userCenter'><i class="nav_user nav_img"></i></router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="帮助" placement="right">
				<li class="user-item">
					<router-link to='/formDesign'><i class="nav_help nav_img"></i></router-link>
				</li>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="退出" placement="right">
				<li class="user-item" @click="CleanCookie">
					<router-link to='/login'><i class="nav_logout nav_img"></i></router-link>
				</li>
			</el-tooltip>
		</ul>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'navBar',
		components: {},
		data() {
			return {
//        actived:1,
			}
		},
		computed: {
			...mapGetters([
				'getLogin'
			]),
		},
		methods: {
      	hoverClick($event){
	        var imgPar=document.getElementsByClassName("imgPar");
	        for(var i=0;i<imgPar.length;i++){
	          imgPar[i].children[0].style.backgroundPosition="0px -34px";
	        }
	        if($event.target.tagName=="A"){
	          $event.target.children[0].style.backgroundPosition="0px -2px";
	        }else if($event.target.tagName=="I"){
	          $event.target.style.backgroundPosition="0px -2px";
	        }
      	},
      	GetCookieValue(name){
				    var cookieValue = "";
				    var search = escape(name) + "=";
				    if(document.cookie.length > 0)
				    {
				        var offset = document.cookie.toString().indexOf(search);
				        if (offset != -1)
				        {
				            offset += search.length;
				            var end = document.cookie.indexOf(";", offset);
				            if (end == -1)
				                end = document.cookie.length;
				            cookieValue = decodeURIComponent((document.cookie.substring(offset, end)))
				        }
				    }
				    return cookieValue;
		},
      	CleanCookie() {
		  var exp = new Date();
		  exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
		  var cval1 = this.GetCookieValue('userid');
		  var cval2 = this.GetCookieValue('username');
		  document.cookie = 'userid' + "=" + cval1 + "; expires=" + exp.toGMTString();
		  document.cookie = 'username' + "=" + cval2 + "; expires=" + exp.toGMTString();
		}
		},
		created() {

		},
		mounted() {
//      var imgPar=document.getElementsByClassName("imgPar");
//      imgPar[0].children[0].style.backgroundPosition="0px -2px";
		}
	}
</script>

<style lang="less" scoped>
	ul,
	li {
		list-style: none;
		text-decoration: none;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		line-height: 60px;
		text-align: center;
	}
  .navItemFormBg{
    border:1px solid red;
  }

	a {
		position: inherit;
		display: block;
		width: 100%;
		height: 100%;
	}

	a:hover {
		background-color: #232c32;
		color: #FFFFFF;
	}

	.logo a:hover {
		background-color: #2093ef;
		color: #FFFFFF;
	}

	.user-info a:hover {
		background-color: #2093ef;
		color: #FFFFFF;
	}

	#nav-bar {
		padding: 0;
		position: absolute;
		width: 60px;
		height: 100%;
		background-color: #181f24;
		top: 0;
		left: 0;
		bottom: 0;
		overflow: hidden;
		flex: 0 0 60px;
		width: 60px;
    z-index:999;
		.logo {
			color: #FFF;
			text-align: center;
			line-height: 60px;
			height: 60px;
			width: 100%;
			background-color: #2093ef;
			position: absolute;
			top: 0;
			left: 0;
		}
		.nav-list {
			margin-top: 60px;
			width: 100%;
			.nav-item {
				width: 100%;
				height: 60px;
			}
		}
		.user-info {
			width: 100%;
			position: absolute;
			bottom: 0px;
			left: 0;
			background: #232c32;
			.user-item {
				width: 100%;
				height: 60px;
			}
		}
	}

	.nav_img {
		width: 32px;
		height: 32px;
		display: block;
		/*background-size: 100% 100% !important;*/
		margin: 14px;
		position: fixed;
	}

	.nav_logo {
		margin: 15px;
		/*background-size: 100% 100% !important;*/
		display: block;
		width: 30px;
		height: 30px;
		background: url(../../static/Index/img/logo.png) no-repeat;
	}

	.nav_data {
		background: url(../../static/Index/img/01a.png) 0px -34px no-repeat;
	}

  .navDataImg:hover .nav_data{
    background-position: 0px -2px ;
  }

	.nav_form {
		background: url(../../static/Index/img/02a.png) 0px -34px no-repeat;
	}

  .navFormImg:hover .nav_form {
    background-position: 0px -2px ;
  }

	.nav_map {
		background: url(../../static/Index/img/03a.png) 0px -34px no-repeat;
	}

  .navMapImg:hover .nav_map {
    background-position: 0px -2px ;
  }

	.nav_chart {
		background: url(../../static/Index/img/04a.png) 0px -34px no-repeat;
	}

  .navChartImg:hover .nav_chart{
    background-position: 0px -2px ;
  }

  .nav_app {
		background: url(../../static/Index/img/05a.png) 0px -34px no-repeat;
	}

  .navAppImg:hover .nav_app {
    background-position: 0px -2px ;
  }

	.nav_help {
		background: url(../../static/Index/img/help.png) no-repeat;
	}

  .nav_help :hover{
    background: url(../../static/Index/img/help.png) no-repeat;
  }

	.nav_user {
		background: url(../../static/Index/img/user.png) no-repeat;
	}

	.nav_logout {
		background: url(../../static/Index/img/logout.png) no-repeat;
	}
    /*.isHover{*/
      /*background-position: 0px -2px;*/
      /*!*border:1px solid green;*!*/
      /*!*border: 1px solid red;*!*/
    /*}*/
</style>
