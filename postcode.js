	var area = ["AB","AL","B","BA","BB","BD","BH","BL","BN","BR","BS","BT","CA","CB","CF","CH","CM","CO","CR","CT","CV","CW","DA","DD","DE","DG","DH","DL","DN","DT","DY","E","EC","EH","EN","EX","FK","FY","G","GL","GU","GY","HA","HD","HG","HP","HR","HS","HU","HX","IG","IM","IP","IV","JE","KA","KT","KW","KY","L","LA","LD","LE","LL","LN","LS","LU","M","ME","MK","ML","N","NE","NG","NN","NP","NR","NW","OL","OX","PA","PE","PH","PL","PO","PR","RG","RH","RM","S","SA","SE","SG","SK","SL","SM","SN","SO","SP","SR","SS","ST","SW","SY","TA","TD","TF","TN","TQ","TR","TS","TW","UB","W","WA","WC","WD","WF","WN","WR","WS","WV","YO","ZE"]

	console.log(area);

    var app = angular.module('postcodeApp', []);
     app.controller('postcodeCTL', function($scope , $http) {

        $scope.fetchData = function() {
            
			lengthCheck($scope , $http);
        }
		
    });
	

	function lengthCheck($scope , $http){
	
			if($('#postcode').val().length <= 2) 
			{
				searchForInputString($scope , $http);
				
				
			}else if($('#postcode').val().length = 0){
			
				$scope.data = "";
				
			}else{
			
			http($scope , $http);
			
			}
	
	}
	
	
	function searchForInputString($scope , $http){
	
	
		//for each postcode start in the json Array
		$.each(area,function(key , item){
			
			var capString =	$scope.string.toUpperCase();
			
			//see if the charecter is in the string 
			var found = item.search(capString) >= 0;
			
			//if the charescter exists in the string 
			if(found  === true){
					
				console.log(item);
			}
		});
	
	}
	
	
	function http($scope, $http){
	
	
	
		$http.get("https://api.getAddress.io/v2/uk/" + $scope.string + "?api-key=f-6c7zTikE23lszGBMcnlQ6350").success(function(response)
		{
			console.log(response);
			
			
			
			$scope.data = response;
				
		});
	
	}