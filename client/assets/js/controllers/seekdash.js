rogueone.controller("seekdash", function($scope,$route, $window,$rootScope,Inventory,$http,$timeout,Account) {

	$rootScope.showbackbtn=false,$scope.selected=[],$rootScope.showcartbtn=true,$rootScope.headertitle='Seek Advertise Templates';

	$scope.addData = [{
			id:'Premium',
			imgsrc:'client/assets/images/premium.png',
			caliber:[{
				"text":"First page first look"
			},{
				"text":"High visibility to daily visitors"
			},{
				"text":"Advertisement at the top"
			}],
			btnFlag : false,
			price:"394.99"

	},{
			id:'Standout',
			imgsrc:'client/assets/images/standout.png',
			caliber:[{
				"text":"Allows advertisers to use a company logo"
			},{
				"text":"Use a longer presentation text"
			}],
			btnFlag : false,
			price:"322.99"

	},{
			id:'Classic',
			imgsrc:'client/assets/images/classic.png',
			caliber:[{
				"text":"Offers the most basic level of advertisement"
			}],
			btnFlag : false,
			price:"269.99"

	}];

	$scope.addToCart = function(index){
		$scope.selected.push(index);
		var getindexs = $scope.selected.join(',');

		var data = {
			"currentUser":$rootScope.currentUser,
			"indexes":getindexs
		}
		Inventory.newAppEntry(data).then(function(response){

			if(response.data[0].status == 'success'){
					  toastr.success('successfully added to cart');	
				      $scope.loaddata();
			}

		})

	}

	$scope.goCart = function(){
		  window.location.href  ='#/cart'
	}

	 Inventory.isuserloggedIn().then(function(response){
            
            $rootScope.isloggeduser = response.data[0].status;

      if (!$rootScope.isloggeduser) {
            window.location.href="/"
        }
        else {

            window.location.href="#/dash";
            $rootScope.isloggedIn = true;
            $rootScope.currentUser = response.data[0].isloggeduser;
            $rootScope.isadmin = response.data[0].isadmin;
            $scope.loaddata();
        }
      });

	 $scope.loaddata = function(){
	 	Inventory.getHome().then(function(response){

				 	var selectedoptions = response.data[0].selected;
				 	
				 	if(selectedoptions.length > 0){
				 		$scope.selected = selectedoptions.split(',');
				 	
				 		for(i=0;i<$scope.selected.length;i++){
				 			var index = $scope.selected[i];
				 			$scope.addData[index].btnFlag = true;
				 		}

				 	}

				 	
	            })
	 }
});