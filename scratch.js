console.log("cards unite!");

var allCards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
var valueOfCards = [2,3,4,5,6,7,8,9,10,10,10,10,11];
var suits = ["hearts","diamonds","clubs","spades"];
var deck1 = [];
var deck2 = [];
var deck3 = [];
var deck4 = [];
var deck5 = [];
var deck6 = [];
var shoe = [];
var player = [];
var dealer = [];
var startDealerTotal = 0;
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

var bank = 1000;
var bet = 100;
var datModal = $('#modal');
var playerModal = $('#player-modal');
var dealerModal = $('#dealer-modal');
var playerBustModal = $('#player-bust-modal');
var dealerBustModal = $('#dealer-bust-modal');
var tieModal = $('#tie-modal');
var blackjackModal = $('#blackjack-modal');

var cards = function cards(actualCard, suit ,valueOfCard ,imgURL){
	this.actualCard = actualCard;
	this.suit = suit;
	this.valueOfCard = valueOfCard;
	this.imgURL = imgURL;	
}



// var Game = function Game (){
// 	var shuffleDeck = function shuffleDeck (){
// 	}
// }



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

var createShoe = function createShoe (){
	createDeck(deck1);
	createDeck(deck2);
	createDeck(deck3);
	createDeck(deck4);
	createDeck(deck5);
	createDeck(deck6);

shoe = shoe.concat(deck1 , deck2 , deck3 , deck4 , deck5 , deck6)
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

	randomcards(shoe,dealer);
	randomcards(shoe,player);
	randomcards(shoe,dealer);
	randomcards(shoe,player);
	// console.log("player has", player[0].actualCard, player[0].suit, "and", player[1].actualCard, player[1].suit);
	// console.log("dealer has", dealer[0].actualCard, dealer[0].suit, "and", dealer[1].actualCard, dealer[1].suit);
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


var checkForACE = function checkForACE (myarray){
	for (var i=0; i<myarray.length ; i++){
		if (myarray[i].actualCard ==='A') {
			console.log("Ace is here!")
		}
	}
}

var checkPlayerTotal = function checkPlayerTotal(){
	if (playerTotal === 21){
		winner("playerBlackjack");
//======================================================================
	$('img').eq(1).attr("src",dealer[1].imgURL);
	$('.dealerTotal').text(dealerTotal);
	randomcards(shoe,dealer)
	$('#displayDealerTotal').before($('<img class="standCards" src ='+ dealer[dealer.length-1].imgURL +'>'));
	dealerTotal = getTotal(dealer);
	$('.dealerTotal').text(dealerTotal);
	// checkTotal(dealerTotal);

	//when player choses stand , checks the dealers situation , give him some friendly advice.
	//
	if (dealerTotal<17){
		console.log("hit again!")
		evalutestand();
	} else if (dealerTotal>=17 && dealerTotal <=21) {
		if (dealerTotal>playerTotal) {
			winner("dealer");
			console.log("dealer wins!");
		} else if (playerTotal>dealerTotal){
			winner("player");
			console.log("player wins!")
		} else if (playerTotal==dealerTotal){
			winner("tie");
			console.log("push!")
		}
	} else if (dealerTotal>21){
		console.log("dealer loses");
		winner("dealerbust");
	}
	} else if (playerTotal > 21){
		winner("playerbust");
	}
//================================================================

};



//can use firsthand as input argument , look at commented code below.
var rendertoDom = function rendertoDom (){

	// for (var i = 0; i < player.length ; i++ ){
	// 	$('#displayPlayerTotal').before($('<img>').attr("src",dealer[i].imgURL));
	// }

	$('img').eq(0).attr("src",dealer[0].imgURL);
	$('img').eq(1).attr("src","img/joker.png");
	$('img').eq(2).attr("src",player[0].imgURL);
	$('img').eq(3).attr("src",player[1].imgURL);
	$('.dealerTotal').text(startDealerTotal);
	$('.playerTotal').text(playerTotal);
	$('.bank').text(bank);
	$('.bet').text(bet);

	// if (firsthand===true){
	// 	$('.dealerTotal').text(startDealerTotal);
	// } else (firsthand===false){
	// 	$('.dealerTotal').text(dealerTotal);
	// }

}


$('#betbutton').click(function (){
	bet = $('#betinput').val()
	$('.bet').text(bet);
});

var turnHitOn = function turnHitOn (){

$('#hit').click(function (){
	randomcards(shoe,player)
	$('#displayPlayerTotal').before($('<img class="hitCards" src ='+ player[player.length-1].imgURL +'>'));
	playerTotal = getTotal(player);
	$('.playerTotal').text(playerTotal);
	// checkTotal(playerTotal);
	checkForACE(player);
	checkForACE(dealer);

	checkPlayerTotal();

})
}

var turnStandOn = function turnStandOn (){


$('#stand').click(function evalutestand(){
	$('img').eq(1).attr("src",dealer[1].imgURL);
	$('.dealerTotal').text(dealerTotal);
	randomcards(shoe,dealer)
	$('#displayDealerTotal').before($('<img class="standCards" src ='+ dealer[dealer.length-1].imgURL +'>'));
	dealerTotal = getTotal(dealer);
	$('.dealerTotal').text(dealerTotal);
	checkForACE(player);
	checkForACE(dealer);
	// checkTotal(dealerTotal);

	//when player choses stand , checks the dealers situation , give him some friendly advice.
	//

	if (dealerTotal<17){
		console.log("hit again!")
		evalutestand();
	} else if (dealerTotal>=17 && dealerTotal <=21) {
		if (dealerTotal>playerTotal) {
			winner("dealer");
			console.log("dealer wins!");
		} else if (playerTotal>dealerTotal){
			winner("player");
			console.log("player wins!")
		} else if (playerTotal==dealerTotal){
			winner("tie");
			console.log("push!")
		}
	} else if (dealerTotal>21){
		console.log("dealer loses");
		winner("dealerbust");
	}
})

}

var turnButtonsOff = function turnButtonsOff(){
	$('#stand').off('click');
	$('#hit').off('click')
}


var winner = function (winner){
	if (winner==="player") {
		turnButtonsOff();
		bank += bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		playerModal.toggle(1000, function (){
			playerModal.toggle(500);
		});

	} else if (winner==="dealer") {
		turnButtonsOff();
		bank -= bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		dealerModal.toggle(1000, function (){
			dealerModal.toggle(500);
		});
	} else if (winner==="playerbust") {
		turnButtonsOff();
		bank -= bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		playerBustModal.toggle(1000, function (){
			playerBustModal.toggle(500);
		});

	} else if (winner==="dealerbust") {
		turnButtonsOff();
		bank += bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		dealerBustModal.toggle(1000, function (){
			dealerBustModal.toggle(500);
		});
	} else if (winner==="tie") {
		turnButtonsOff();
		tieModal.toggle(1000, function (){
			tieModal.toggle(500);
		});
	} else if (winner==="playerBlackjack") {
		console.log(playerTotal);
		turnButtonsOff();
		blackjackModal.toggle(1000, function (){
			blackjackModal.toggle(500);
		});
	}
}



$('#reset').click(function (){

	turnButtonsOff();
	console.log("reset clicked");
	$('.standCards').remove();
	$('.hitCards').remove();
	player = [];
	dealer = [];
	console.log(player);
	console.log(dealer);
	// createDeck(deck1);
	dealCards();
	checkForACE(player);
	checkForACE(dealer);
	startDealerTotal = dealer[0].valueOfCard;
	playerTotal = getTotal(player);
	dealerTotal = getTotal(dealer);
	rendertoDom(false);
	turnStandOn();
	turnHitOn();
	checkPlayerTotal();

	
	// else {
	// 	console.log("keep going");
	// }

});



createShoe();
dealCards();
checkForACE(player);
checkForACE(dealer);
playerTotal = getTotal(player);
startDealerTotal = dealer[0].valueOfCard;
dealerTotal = getTotal(dealer);
rendertoDom();
turnStandOn();
turnHitOn();
checkPlayerTotal();


// $('#displayDealerTotal').before($('<img src ="img/h6.png">'));

