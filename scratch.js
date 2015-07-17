console.log("cards unite!");

var allCards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var valueOfCards = [2,3,4,5,6,7,8,9,10,10,10,10,11];
var suits = ["hearts","diamonds","clubs","spades"];
var deck1 = [];
var deck2 = [];
var deck3 = [];
var player = [];
var dealer = [];
var playerTotal = 0;
var dealerTotal = 0;
var himg = ["img/h2.png","img/h3.png","img/h4.png","img/h5.png","img/h6.png",
				"img/h7.png","img/h8.png","img/h9.png","img/h10.png","img/hjack.png",
				"img/hqueen.png","img/hking.png","img/hace.png"];
var dimg = ["img/d2.png","img/d3.png","img/d4.png","img/d5.png","img/d6.png",
				  "img/d7.png","img/d8.png","img/d9.png","img/d10.png","img/djack.png",
				  "img/dqueen.png","img/dking.png","img/dace.png"];
var simg = ["img/s2.png","img/s3.png","img/s4.png","img/s5.png","img/s6.png",
				  "img/s7.png","img/s8.png","img/s9.png","img/s10.png","img/sjack.png",
				  "img/squeen.png","img/sking.png","img/sace.png"]
var cimg = ["img/c2.png","img/c3.png","img/c4.png","img/c5.png","img/c6.png",
				  "img/c7.png","img/c8.png","img/c9.png","img/c10.png","img/cjack.png",
				  "img/cqueen.png","img/cking.png","img/cace.png"]


var cards = function cards(actualCard, suit ,valueOfCard ,imgURL){
	this.actualCard = actualCard;
	this.suit = suit;
	this.valueOfCard = valueOfCard;
	this.imgURL = imgURL;	
}



var Game = function Game (){
	var shuffleDeck = function shuffleDeck (){
	}
}



var createDeck = function createDeck(myarray){
	for (var i=0; i<allCards.length; i++){
		var hearts = new cards(allCards[i],suits[0],valueOfCards[i], himg[i]);
		var diamonds = new cards(allCards[i],suits[1],valueOfCards[i],dimg[i]);
		var clubs = new cards(allCards[i],suits[2],valueOfCards[i],cimg[i]);
		var spades = new cards(allCards[i],suits[3],valueOfCards[i],simg[i]);
			// console.log(hearts);
			// console.log(diamonds);
			myarray.push(hearts,diamonds,clubs,spades);
		}
	}

var randomcards = function randomcards(myarray,myarray2){
	var rand1 = myarray[Math.floor(Math.random() * myarray.length)];
	var cardindex = myarray.indexOf(rand1);
	// console.log(rand1);
	myarray.splice(cardindex,1);
	myarray2.push(rand1);
	// console.log("deck is",myarray.length,"dealer/player is",myarray2.length);

	// var rand1 = myarray[Math.floor(Math.random() * myarray.length)];
	// var cardindex = myarray[rand1];
	// debugger
	// // console.log(rand1);
	// myarray.splice(rand1, 1);
	// myarray2.push(cardindex);
	// // console.log("deck is",myarray.length,"dealer/player is",myarray2.length);
	// debugger
}

var dealCards = function dealCards(){
	randomcards(deck1,dealer);
	randomcards(deck1,player);
	randomcards(deck1,dealer);
	randomcards(deck1,player);
	console.log("player has", player[0].actualCard, player[0].suit, "and", player[1].actualCard, player[1].suit);
	console.log("dealer has", dealer[0].actualCard, dealer[0].suit, "and", dealer[1].actualCard, dealer[1].suit);
}

var getTotal = function getTotal(myarray){
	var sum = 0;
	for (var i=0 ; i < myarray.length; i++){
		// console.log(myarray[i].valueOfCard);
		sum += myarray[i].valueOfCard;
		// console.log(sum);
	}
	return sum
}

var rendertoDom = function rendertoDom (){

	$('img').eq(0).attr("src",dealer[0].imgURL);
	$('img').eq(1).attr("src",dealer[1].imgURL);
	$('img').eq(2).attr("src",player[0].imgURL);
	$('img').eq(3).attr("src",player[1].imgURL);
	$('.dealerTotal').text(dealerTotal);
	$('.playerTotal').text(playerTotal);
}

var checkTotal = function checkTotal(total){
	if (total < 21){
		console.log("keep going")
	} else if (total == 21) {
		console.log("Blackjack")
	} else if (total > 21) {
		console.log("Bust!")
	}

}


createDeck(deck1);
dealCards();
playerTotal = getTotal(player);
dealerTotal = getTotal(dealer);
rendertoDom();

$('#hit').click( function (){
	randomcards(deck1,player)
	$('#displayPlayerTotal').before($('<img src ='+ player[player.length-1].imgURL +'>'));
	playerTotal = getTotal(player);
	$('.playerTotal').text(playerTotal);
	checkTotal(playerTotal);
})

$('#stand').click (function (){
	if (dealerTotal<17){
		// draw again
	} else if (dealerTotal>=17 && dealerTotal <=21) {
		//compare against player total
	} else if (dealerTotal>21){
		//Bust!
	}





	randomcards(deck1,dealer)
	$('#displayDealerTotal').before($('<img src ='+ dealer[dealer.length-1].imgURL +'>'));
	dealerTotal = getTotal(dealer);
	$('.dealerTotal').text(dealerTotal);
	checkTotal(dealerTotal);
})



// $('#displayDealerTotal').before($('<img src ="img/h6.png">'));

