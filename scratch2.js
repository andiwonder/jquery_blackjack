var getTotal = function getTotal(myarray){
	var sum = 0;
	var numbersOfAce = 0;
	var returnedData = $.grep(myarray, function (element) {
    return element.valueOfCard == 11;
	});
	debugger
	for (var i=0 ; i < myarray.length; i++){
		// console.log(myarray[i].valueOfCard);
		sum += myarray[i].valueOfCard;
		// if (myarray === player) {
			if (sum > 21 && myarray.length === 2){
				console.log("its triggered!");
				// debugger
				sum = 0;
	// 			for (var i=0 ; i <= myarray.length -1; i++){
	// 				if (myarray[i].valueOfCard === 11) {
	// 					// debugger
	// 					numbersOfAce += 1;
	// 						if (numbersOfAce === 2){
	// 							console.log(numbersOfAce);
	// 							myarray[1].valueOfCard = 1;
	// 							// debugger
	// 							// if (myarray[2].valueOfCard >= 10){
	// 							// 	myarray[0].valueOfCard = 1;
	// 							// }
	// 						} else if (numbersOfAce === 3){
	// 							console.log(numbersOfAce);
	// 							myarray[0].valueOfCard = 1;
	// 							myarray[1].valueOfCard = 1;
	// 						} 					
	// 					// console.log(sum);
	// 				};
	// 				sum += myarray[i].valueOfCard;
	// 			}
	// 		} else if (sum > 21 && myarray.length===3){
	// 			console.log("its triggered!");
	// 			// debugger
	// 			sum = 0;
	// 			for (var i=0 ; i <= myarray.length -1; i++){
	// 				if (myarray[i].valueOfCard === 11) {
	// 					// debugger
	// 					numbersOfAce += 1;
	// 						if (numbersOfAce === 2){
	// 							console.log(numbersOfAce);
	// 							myarray[1].valueOfCard = 1;
	// 							myarray[1].valueOfCard = 1;
	// 							// debugger
	// 							// if (myarray[2].valueOfCard >= 10){
	// 							// 	myarray[0].valueOfCard = 1;
	// 							// }
	// 						} else if (numbersOfAce === 3){
	// 							console.log(numbersOfAce);
	// 							myarray[0].valueOfCard = 1;
	// 							myarray[1].valueOfCard = 1;
	// 						} 					
	// 					// console.log(sum);
	// 				};
	// 				sum += myarray[i].valueOfCard;
	// 			}
	// 		} else if (sum > 21 && myarray.length === 4){
	// 			sum = 0;
	// 			for (var i=0 ; i <= myarray.length -1; i++){
	// 				if (myarray[i].valueOfCard === 11) {
	// 					numbersOfAce += 1;
	// 					// debugger
	// 						if (numbersOfAce === 2){
	// 							console.log(numbersOfAce);
	// 							myarray[1].valueOfCard = 1;
	// 							myarray[0].valueOfCard = 1;
	// 						}
	// 				}
	// 				sum += myarray[i].valueOfCard;
	// 			}
	// 		}
	// }
	return sum
}












//________________________________________________________________________
var getTotal = function getTotal(myarray){
	var sum = 0;
	var numbersOfAce = 0;
	var returnedData = $.grep(myarray, function (element) {
    return element.valueOfCard == 11;
	});
	// debugger
		if (sum > 21 && returnedData.length >= 1){
			console.log("its triggered!");
			// debugger
			sum = 22;
		} else { for (var i=0 ; i < myarray.length; i++){
			sum += myarray[i].valueOfCard;
		}