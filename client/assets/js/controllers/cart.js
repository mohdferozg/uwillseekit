rogueone.controller("cart", function($scope,$route, $window,$rootScope,Inventory,$http,$timeout,Account) {

	$rootScope.showbackbtn=true,$scope.selected=[],$rootScope.showcartbtn=false,$scope.CartItems=[],$scope.total=0,$rootScope.headertitle='Seek Advertise Checkout';

	$scope.addData = [{
			id:'Premium',
			imgsrc:'client/assets/images/premium.png',
			desc:"Premium Ads description",
			price:"394.99",
			quantity:"1"

	},{
			id:'Standout',
			imgsrc:'client/assets/images/standout.png',
			desc:"Standout Ads description",
			price:"322.99",
			quantity:"1"

	},{
			id:'Classic',
			imgsrc:'client/assets/images/classic.png',
			desc:"Classic Ads description",
			price:"269.99",
			quantity:"1"

	}];

	 Inventory.isuserloggedIn().then(function(response){
            
      $rootScope.isloggeduser = response.data[0].status;
 
      if (!$rootScope.isloggeduser) {

            window.location.href="/"
        }
        else {

            window.location.href="#/cart";
            $rootScope.isloggedIn = true;
            $rootScope.currentUser = response.data[0].isloggeduser;
            $rootScope.isadmin = response.data[0].isadmin;
            $scope.loaddata();
	    }
      });

	 $scope.loaddata = function(){
	 	Inventory.getHome().then(function(response){
				 	//console.log(response)
				 	var selectedoptions = response.data[0].selected;
				 		if(selectedoptions.length > 0){
				 			var splitoptions = selectedoptions.split(',');
					 		for(i=0;i<splitoptions.length;i++){
					 			var index = splitoptions[i];

					 			if($rootScope.currentUser == 'apple')
					 				 $scope.standoutpricedrop(index,'299.99')
								else if($rootScope.currentUser == 'ford')
					 				$scope.standoutpricedrop(index,'309.99')
					 			
					 			$scope.CartItems.push($scope.addData[index]);
					 			$scope.total += parseFloat($scope.addData[index].price);
					 			
					 		}
					 		$scope.total = $scope.total.toFixed(2);
				 		}	
				})
	 }

	 $scope.changetot = function(datas){

	 	if(parseFloat(datas.quantity) >= 1){
	 		$scope.total = 0;
	 		for(i=0;i<$scope.CartItems.length;i++)
	 	$scope.total += parseFloat($scope.CartItems[i].price) * parseFloat($scope.CartItems[i].quantity); 
	 	$scope.total = $scope.total.toFixed(2);

	 	if($rootScope.currentUser == 'unilever'){

	 		var index = $scope.CartItems.findIndex(x => x.id==datas.id);

			console.log(index);
			if(!isNaN(index) && datas.id =="Classic"){
				var itemsquant = parseFloat($scope.CartItems[index].quantity)
				if(itemsquant >= 3 && itemsquant % 3 == 0){
					 $scope.classicdeals(3,2)
				}
			}
			

	 	}
	 	else if($rootScope.currentUser == 'nike'){

	 		var index = $scope.CartItems.findIndex(x => x.id==datas.id);

			
			if(!isNaN(index) && datas.id =="Premium"){
				console.log(index);
				var itemsquant = parseFloat($scope.CartItems[index].quantity)
				if(itemsquant >= 4){
						 $scope.discountonpurchase(15,itemsquant);
				}
			}
			

	 	}
	 	else if($rootScope.currentUser == 'ford'){

	 		var index = $scope.CartItems.findIndex(x => x.id==datas.id),classicindex = $scope.CartItems.findIndex(x => x.id==datas.id);

			
			if(!isNaN(index) && datas.id =="Premium"){
				console.log(index);
				var itemsquant = parseFloat($scope.CartItems[index].quantity)
				if(itemsquant >= 3){
						 $scope.discountonpurchase(5,itemsquant);
				}
			}

		
			if(!isNaN(classicindex) && datas.id =="Classic"){
				var classitemsquant = parseFloat($scope.CartItems[classicindex].quantity);
				if(classitemsquant >= 5 && classitemsquant % 5 == 0){
					 $scope.classicdeals(5,4)
				}
			}
			

	 	}

	 	}

	 }

	 $scope.classicdeals = function(x,y){
	 	$scope.total = parseFloat($scope.total) -  269.99;
	 	$scope.total = $scope.total.toFixed(2);
		toastr.success("congrats u get "+x+" for "+y+" deal");
	 }

	 $scope.discountonpurchase = function(x,itemsquant){
	 	$scope.total = parseFloat($scope.total) -  parseFloat(x*itemsquant);
		toastr.success('congrats u get a discount of '+x+' on purchase');
	 }

	 $scope.standoutpricedrop = function(index,setprice){
		var ifstandout = $scope.addData[index].id;
		if(ifstandout == 'Standout')	
		$scope.addData[index].price = setprice;
	}

	$scope.Checkout = function(){
		toastr.success('implementation will be done in phase 2');
	}
});