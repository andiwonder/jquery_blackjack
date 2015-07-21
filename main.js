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

var firstace = new cards('A',"hearts",11,"img/hace.png");
var secondace = new cards('A',"diamonds",11,"img/dace.png");
var thirdace = new cards('A',"spades",11,"img/sace.png");
var fourthace = new cards('A',"clubs",11,"img/cace.png");

var testcasearr = [firstace , secondace ,thirdace , fourthace];

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
	var returnedData = [];
	var arrOfAces = []
	var numbersOfAce = 0;

	for (var i=0 ; i <= myarray.length -1; i++){
		if (myarray[i].valueOfCard === 11) {
			arrOfAces.push(i);
			numbersOfAce += 1;
		}
	}

	returnedData = $.grep(myarray, function (element) {
		return element.valueOfCard == 11;
	});

	console.log(arrOfAces);
	console.log(returnedData);

	for (var i=0 ; i < myarray.length; i++){
		sum += myarray[i].valueOfCard;
		if (sum > 21 && (returnedData.length === 1)){
			sum = 0;
			myarray[arrOfAces[0]].valueOfCard = 1;
			for (var i=0 ; i < myarray.length; i++){
				sum += myarray[i].valueOfCard;
			}
			return sum	
		} else if (sum>21 && (returnedData.length === 2)) {
			// debugger
			sum = 0;
			myarray[arrOfAces[0]].valueOfCard = 1;
			for (var i=0 ; i < myarray.length; i++){
				sum += myarray[i].valueOfCard;
			}
			if (sum > 21) {
				// debugger
				sum = 0;
				myarray[arrOfAces[0]].valueOfCard = 1;
				myarray[arrOfAces[1]].valueOfCard = 1;
				for (var i=0 ; i < myarray.length; i++){
					sum += myarray[i].valueOfCard;
				}
			}
			return sum;
		}
	}
	return sum
}


var timeToSplit = function timeToSplit (array){
	if (array[0].actualCard === array[1].actualCard) {
		console.log("Time to Split up gang!")
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

} else if (playerTotal > 21){
	getTotal(player);
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
	$('img').eq(1).attr("src","img/backofcard.png").css("left","-100px");
	$('img').eq(2).attr("src",player[0].imgURL);
	$('img').eq(3).attr("src",player[1].imgURL).css("left","-100px");
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



$('#test').click(function (){
	turnButtonsOff();
		// console.log("reset clicked");
		$('.standCards').remove();
		$('.hitCards').remove();
		player = [];
		dealer = [];

		randomcards(testcasearr,dealer);
		randomcards(testcasearr,player);
		randomcards(testcasearr,dealer);
		randomcards(testcasearr,player);
		// debugger
		startDealerTotal = dealer[0].valueOfCard;
		playerTotal = getTotal(player);
		dealerTotal = getTotal(dealer);
		rendertoDom(false);
		turnStandOn();
		turnHitOn();
		checkPlayerTotal();

	});


var turnHitOn = function turnHitOn (){

	$('#hit').click(function (){
		randomcards(shoe,player)
		$('.playerTotal').before($('<img class="card player" src ='+ player[player.length-1].imgURL +'>'));
		$('.player').eq(player.length-3).css("left",-200-((player.length-3)*100));
		$('.playerTotal').css("left",470+((player.length-2)*30));
	// $('.third').css("margin-left",40-((player.length-3)*10));
	console.log("look");
	// debugger
	// $('.card').before('.playerTotal').css("left",75*(player.length)"px");
	playerTotal = getTotal(player);
	$('.playerTotal').text(playerTotal);
	// checkTotal(playerTotal);
	

	checkPlayerTotal();

})
}

var turnStandOn = function turnStandOn (){

	$('#stand').click(function evalutestand(){
		$('img').eq(1).attr("src",dealer[1].imgURL);
		$('.dealerTotal').text(dealerTotal);
		randomcards(shoe,dealer)
		$('.dealerTotal').before($('<img class="card dealer" src ='+ dealer[dealer.length-1].imgURL +'>'));
		$('.dealer').eq(dealer.length-3).css("left",-200-((dealer.length-3)*100));
		$('.dealerTotal').css("left",470+((dealer.length-2)*30));
		dealerTotal = getTotal(dealer);
	// checkForACE(dealer);
	$('.dealerTotal').text(dealerTotal);
	
	// checkTotal(dealerTotal);

	//when player choses stand , checks the dealers situation , give him some friendly advice.
	//

	if (dealerTotal<17){
		console.log("hit again!")
		setTimeout(evalutestand, 1000);
		
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
			setTimeout(playerModal.toggle(5000),2000);
		});

	} else if (winner==="dealer") {
		turnButtonsOff();
		bank -= bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		dealerModal.toggle(1000, function (){
			setTimeout(dealerModal.toggle(5000),2000);
		});
	} else if (winner==="playerbust") {
		turnButtonsOff();
		bank -= bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		playerBustModal.toggle(1000, function (){
			setTimeout(playerBustModal.toggle(5000),2000);
		});

	} else if (winner==="dealerbust") {
		turnButtonsOff();
		bank += bet;
		$('.bank').text(bank);
		$('.bet').text(bet);
		dealerBustModal.toggle(1000, function (){
			setTimeout(dealerBustModal.toggle(5000),2000);
		});
	} else if (winner==="tie") {
		turnButtonsOff();
		tieModal.toggle(1000, function (){
			setTimeout(tieModal.toggle(5000),2000);
		});
	} else if (winner==="playerBlackjack") {
		console.log(playerTotal);
		turnButtonsOff();
		blackjackModal.toggle(1000, function (){
			setTimeout(blackjackModal.toggle(5000),2000);
		});
	}
}



$('#reset').click(function (){

	turnButtonsOff();
	// console.log("reset clicked");
	$('.player').remove();
	$('.dealer').remove();
	player = [];
	dealer = [];
	// console.log(player);
	// console.log(dealer);
	// createDeck(deck1);
	dealCards();
	// checkForACE(player);
	// checkForACE(dealer);
	startDealerTotal = dealer[0].valueOfCard;
	playerTotal = getTotal(player);
	dealerTotal = getTotal(dealer);
	rendertoDom(false);
	turnStandOn();
	turnHitOn();
	checkPlayerTotal();
	$('.dealerTotal').css("left","470px");
	$('.playerTotal').css("left","470px");

	
	// else {
	// 	console.log("keep going");
	// }

});



createShoe();
dealCards();
// checkForACE(player);
// checkForACE(dealer);
playerTotal = getTotal(player);
startDealerTotal = dealer[0].valueOfCard;
dealerTotal = getTotal(dealer);
rendertoDom();
turnStandOn();
turnHitOn();
checkPlayerTotal();


// $('#displayDealerTotal').before($('<img src ="img/h6.png">'));

