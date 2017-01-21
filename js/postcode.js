
	var area = ["AB","AL","B","BA","BB","BD","BH","BL","BN","BR","BS","BT","CA","CB","CF","CH","CM","CO","CR","CT","CV","CW","DA","DD","DE","DG","DH","DL","DN","DT","DY","E","EC","EH","EN","EX","FK","FY","G","GL","GU","GY","HA","HD","HG","HP","HR","HS","HU","HX","IG","IM","IP","IV","JE","KA","KT","KW","KY","L","LA","LD","LE","LL","LN","LS","LU","M","ME","MK","ML","N","NE","NG","NN","NP","NR","NW","OL","OX","PA","PE","PH","PL","PO","PR","RG","RH","RM","S","SA","SE","SG","SK","SL","SM","SN","SO","SP","SR","SS","ST","SW","SY","TA","TD","TF","TN","TQ","TR","TS","TW","UB","W","WA","WC","WD","WF","WN","WR","WS","WV","YO","ZE"]

	//angular entry point / app
    var app = angular.module('postcodeApp', []);
	
	//angular controller
     app.controller('postcodeCTL', function($scope , $http) {

		//the fetchData() function fron the ng-change attribute
        $scope.fetchData = function() {

            //get postcode input DOM object
            var postcodeInput = $('#postcode');

			//run this 
			lengthCheck($scope , $http , postcodeInput);

            //re-init the select using materialise
            //$('select').material_select();
		}
		
    });


	function lengthCheck($scope , $http , postcodeInput){


			//if the users input is less than or equal to 3 charecters long 
			if(postcodeInput.val().length <= 2)
			{
				//run this
				searchForInputString($scope , postcodeInput);
				
				//if there is nothing in input box 
			}else if(postcodeInput.val() == ""){
				
				//set data to be null
				$scope.data = "";


                //re-init the select using materialise
				//$('select').material_select();

                //jQuery auto-suggest
                $( function() {
                    postcodeInput.autocomplete({
                        source: $scope.data
                    });
                });

            }else{
			
				//run this
				http($scope , $http);
			}
	
	}
	
	
	function searchForInputString($scope , postcodeInput){
	
			//make array to store matching strings
			var matchArray = []; 
	
		//for each postcode start in the json Array
		$.each(area,function(key , item){
			
			//input to uppercase
			var capString =	$scope.string.toUpperCase();
			var postcodeString = capString.trim();

			//see if the character is in the string 
			var found = item.search(postcodeString) >= 0;
			
			//if the character exists in the string 
			if(found === true){
				
				//add matching string to array 
				matchArray.push(item);
				
				//return matchArray
				$scope.data = matchArray;

                //jQuery auto-suggest
                $( function(matchArray){
                    postcodeInput.autocomplete({
                        source: matchArray
                    });
                });

                //re-init the select using materialise
                //$('select').material_select();
			}
		});
	
	}
	
	
	function http($scope, $http){



	    //make a get request to api using the full postcode
		$http.get("https://api.getAddress.io/v2/uk/" + $scope.string + "?api-key=f-6c7zTikE23lszGBMcnlQ6350").success(function(response)
		{
			//return the address array 
			$scope.data = response['Addresses'];
            var data = [];
            //console.log(response);

            $.each(response['Addresses'] , function(key ,elem){

                elem.toString(elem);
                console.log(elem);
               data.push(elem);
            });
            //console.log(addressList);

            //jQuery auto-suggest
            $( function(data) {
                var postcodeInput = $('#postcode');
                postcodeInput.autocomplete({
                    source: data
                });
            });


		});


	}