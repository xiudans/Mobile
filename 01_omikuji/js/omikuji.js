"use strict";
window.addEventListener("DOMContentLoaded",
	function(){
		$("header").textillate({
			loop:false,
			minDisplayTime:2000,
			initialDelay:2000,
			autoStart:true,
			in:{
				effect:"fadeInLeftBig",
				delayScale:1.5,
				delay:50,
				sync:false,
				shuffle:true
			}
		});

	$(function(){
		ScrollReveal().reveal("#btn1",{duration:9000});
	});	
		setTimeout(
			function(){
				let popmsg = "いらしゃいませ！おみくじを引いてください！";
				window.alert(popmsg); 
			},"5000"
		);	
	},false
);


const omikujiText = document.getElementById('omikujiText');
btn1.addEventListener("click",
	function () {
		//let n =Math.floor(Math.random()*3);
		//switch(n){
		//	case 0:
		//		btn1.textContent = "Very Happy!";
		//		btn1.style.color = "#ff0000";
		//		break;
		//	case 1:
		//		btn1.textContent = "Happy";
		//		btn1.style.color = "#ff0001";
		//		break;
		//	case 2:
		//		btn1.textContent = "UnHappy!";
		//		btn1.style.color = "#261e1c";
		//		break;
		//		}
		let resuItText = ["大吉!!!","吉!!","中吉!!","小吉","末吉!","凶。。"];
		let resuItColor =["#ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#1e90ff"];
		let resuItFontSize =["90px","80px",,"70px","60px","50px","40px"];
		let n = Math.floor(Math.random()*resuItText.length);
		let resuItMaxSpeed = [15,10,8,5,5,5];
		let resuItMaxSize = [45,30,20,15,20,20];
		let resuItImage = ["img/star.png","img/hanabira.png","img/hanabira.png","img/hanabira.png","img/leaf.png","img/snowflakes.png"];
		let resuItSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound5.mp3","sound/omikuji_sound4.mp3"];
		
		omikujiText.textContent = resuItText[n];
		omikujiText.style.color = resuItColor[n];
		omikujiText.style.fontSize = resuItFontSize[n];


	//snowfall stop
		$(document).snowfall("clear");

		//jQuery snowfall
		$(document).ready(function(){
			$(document).snowfall({
				maxSpeed:resuItMaxSpeed[n],
				minSpeed:1.5,
				maxSize:resuItMaxSize[n],
				minSize:1,
				image:resuItImage[n]
			});
		});
		let music = new Audio(resuItSound[n]);
		music.currentTime = 0;
		music.play();
	
	},false
);