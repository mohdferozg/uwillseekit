
rogueone.controller("loginctrl", function($scope,$route, $window,$rootScope,Inventory,$http,$timeout,Account) {

    $scope.isSignin = true,$rootScope.currentUser='',$rootScope.isloggedIn = false,$rootScope.headertitle='Seek Advertise',$scope.isloggeduser='',$scope.matchpassword=true,$scope.validcredentials=true,$rootScope.showbackbtn=false;
    
    
   Inventory.isuserloggedIn().then(function(response){

            $rootScope.isloggeduser = response.data[0].status;
              if (!$rootScope.isloggeduser) {
            //window.location.href="/"
        }
        else {
            window.location.href="#/dash";
        }
      });
    
    $scope.signin = function(){
        
        var datas = this.formData;
      
        Inventory.login(datas).then(function(response){
            var datainJson = response.data[0];
       
            if(response.data[0].status == 'success'){
                    
               
                    $rootScope.currentUser = datas.username;
                    window.location.href= "#/dash";
                    $rootScope.isloggedIn = true;
                    toastr.success("Successfully Logged in welcome");
                    $rootScope.isadmin = datainJson.data[0].isAdmin;
               }
            else{
                    $scope.validcredentials=false;

            }
               
          
        });
       
    }
    $scope.showlogsign = function(status){
        $scope.isSignin = status;
    }
    $scope.checkusername = function(){
     
        var username = $('.checkusername').val();
       
        if(username.length > 1){
            
            var datas = {
                user:username
            }
            Inventory.checkusernameavail(datas).then(function(response){
               
                var getdata = response.data[0];
                if(response.data[0].status == 'success'){
                   $scope.username_avail = true;
                }
                else
                    $scope.username_avail = false;
                
            })
        }
        
            
        
        
    }
    $scope.matchpass = function(){
        if($('.regpassword').val() == $('.confirmpass').val()){
            $scope.matchpassword = true;
        }
        else{
             $scope.matchpassword = false;
        }
           
    }
    $scope.isregister  = function(){
      
        if($scope.username_avail){
            //alert('username not avail');
   
        }
        else if(!$scope.matchpassword){
             //$('.matchpass').removeClass('hide').addClass('show')
         }
        else{
            
            var datas = this.formData;
            datas.isAdmin = 0;
            console.log(datas)
            Inventory.newregister(datas).then(function(response){
                console.log(response);
                if(response.data[0].status=='success'){
                       toastr.success("Successfully Registered welcome");
                      window.location.href = '#/dash';
                }
               
            });
        }
            
    }
    $rootScope.logout = function(){
        Inventory.logoff().then(function(){
             toastr.success("Successfully Logged off");
        });
         window.location.href="#"
    }
    $scope.gocart  = function(){
         window.location.href  ='#/cart'
     }
     $scope.backbtn = function(){
          window.location.href  ='#/dash'
     }
}); //controller