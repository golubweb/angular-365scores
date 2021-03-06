/***************************
*
* @author: Darko Golubovic
* @date: 06-06-2016
*
***************************/
myApp.controller('mainCtrl', ['$scope', '$timeout', '$interval', 'gamesServices', function($scope, $timeout, $interval, gamesServices){
	
	var scoreBox = function(){
		$scope.getScore();

		$interval(function(){ $scope.getScore(); }, 5000);
	};
	
	$scope.getScore = function(){
		gamesServices.getData('http://mobilews.365scores.com/Data/Games/?lang=1&uc=6&tz=15&countries=1').then(function(response){
			$scope.gamesData = [];
			$scope.gamesData = response.data;
		});
	};

	$scope.$watch('gamesData.LastUpdateID', function(newValue, oldValue){
		if(newValue !== undefined && oldValue === undefined){
			$scope.compsData($scope.gamesData);
		} else if(!angular.equals(newValue, oldValue)) {
			$scope.compsData($scope.gamesData);
		}
	}, true);
	
	$scope.compsData = function(data){
		$scope.compToday = [];
		$scope.gamesToday = [];
		$scope.compYesterday = [];
		$scope.gamesYesterday = [];
		
		$scope.competitions = data.Competitions;
		$scope.games = data.Games; 

		angular.forEach($scope.competitions, function(item, key){
			var compKey = key;
			
			if(item.GamesCount > 0){
				$scope.compToday.push({ img: item.CID, CID: item.ID, name: item.Name }); 
				
				if(Object.keys($scope.compToday).length > 0){
					$scope.compLen = Object.keys($scope.compToday).length;
					
					angular.forEach($scope.games, function(item, key){
						if(item.Comp == $scope.compToday[$scope.compLen - 1].CID){
							item.GTime = item.STime.slice(11);
							item.GDate = item.STime.slice(0, 10);
							
							if(data.CurrentDate !== item.GDate) {
								$scope.dayBefore(item, $scope.competitions[compKey], item.GDate);
							} else {
								$scope.gamesToday.push(item);								
							}
						}
					});
				}
			}
		});
	};
	
	$scope.dayBefore = function(item, competitions, agoDate) {
		var check = moment(agoDate, 'DD/MM/YYYY');
	    
		$scope.dateM = check.format('MMM');
		$scope.dateS = check.format('dddd');
		$scope.dateN = check.format('D');
		
		if(competitions.ID == item.Comp){
			$scope.compYesterday.push(competitions);			
		}
		
		$scope.gamesYesterday.push(item);
		$scope.dayBeforeL =  Object.keys($scope.gamesYesterday).length;
	};
	
	scoreBox();
}]);