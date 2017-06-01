rogueone.factory('Inventory',function ($http) {
	return {
		getHome: function () {    
			//console.log('true')
            return $http.get('/getHome');
		},
        newAppEntry:function(data){
          return $http.post('/insertApp',data)
        },
        updateAppEntry:function(data){
          return $http.post('/updateApp',data)
        },
        deleteAppEntry:function(data){
          return $http.post('/deleteApp',data)
        },
        login:function(data){
          return $http.post('/login',data)
        },
        newregister:function(data){
          return $http.post('/register',data)
        },
        checkusernameavail:function(data){
            return $http.post('/checkusername',data)
        },
        isuserloggedIn:function(){
            return $http.post('/isLogin');
        },
        logoff:function(){
            return $http.post('/logoff');
        },
        isApprove:function(data){
            return $http.post('/approve',data);
        }
        
        
        
	}
	
});
