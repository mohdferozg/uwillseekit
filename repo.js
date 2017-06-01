var express = require('express');
var mysql   = require('mysql');
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var cors = require('cors');
var mysql_helper = require('./custom_modules/mysql_helper');
var session = require('express-session');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        httpOnly: false,
        expires: false
    }
}));
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.use("/", express.static(__dirname + '/'));
//app.use('/node_modules',  express.static(__dirname + 'node_modules'));

app.use('/client',  express.static(__dirname + 'client'));



app.get('/',function(req,res){
    res.sendFile('index.html',{'root': __dirname + '/'});
})


var getdbData = '';

 


app.get('/getHome', urlencodedParser, function (req, res) {
  console.log(sess);

    console.log("admin:"+sess.isadmin);
     //req.query = "select * from employees"
     // if(sess && sess.isadmin)
     //  req.query = "select * from employees"
     //  else{
     //      req.query = "select id,app_id, app_name, app_description,business_sect,business_subsect,business_owner,it_dept,it_owner,domain_lead,ea_domain,business_capability,business_criticality,avail_requirements,country_usage,year_implemented,age_of_app,message_format,app_plan,appsoft_type,app_server,integrattion_type,appsoft_prodname,prog_lang,report_tool,app_architecture,ntier_app_arch,hosting_location,virtual_environ,dr_available,app_hardware,app_os_family,app_os,db,db_hardware,db_os,client_hardware,client_os,nw_accessiblity,network,no_inter_otherapp,depinteg_core,totres_supapp,no_of_users,types_of_users,no_of_licenses,type_of_license,monthly_trans,sw_yearly_cost,half_yearly_cost,telco_yearly_cost,vendor_supp_cost,proj_benefits,yearly_support_cost,vend_supp_app,isapp_still_vend,vend_hav_locoff,obs_tech_supp_sol,obsolete_tech,obs_tech_remarks,curr_supp_insource,curr_supp_osource,curr_supp_joint,curr_supp_remarks,curr_enha_insource,curr_enha_osource,curr_enha_joint,curr_enha_remarks,source_avail_yes,source_avail_no,source_ifno_poss,source_availremark,rational_plan,rational_remarks,rational_genremark,enduser_comp_app,msa_worry_bucket,sustain_assessrisk,msa_app,itb_techrisk_involve,business_platform,prob_apps,blueprint_critical from employees where isApproved=1";
          
     //  }
       req.query = "select selected from users WHERE username='"+sess.isLoggedInUser+"';"
     
       mysql_helper.getValues(req, function (status, rows) {
           console.log(rows)
          getdbData = JSON.stringify(rows);
          console.log(getdbData)
        if (status == "success") {
          res.send(getdbData);
        }
  
     });
  
});


app.post('/insertApp', urlencodedParser, function (req, res) {

        
    var data  = req.body;
     jsonResponse = [{
        status: "",
        data: ""
        }];
    console.log("body:"+JSON.stringify(data));
    
    
    
    //return;
    
   // connection.query = "INSERT IGNORE INTO employees (id, name,location,Gender,Age)  VALUES " +data
     
     req.query = "update users set selected='"+req.body.indexes+"' WHERE username='"+req.body.currentUser+"';"
    // update users set selected="feroz" WHERE username="feroz"

    
     console.log("Query  :"+ req.query);
       // return;
    
       //req.query =connection.query;
       mysql_helper.insertValues(req, function (status, rows) {
           
           console.log(status);
           //return;
           
        if (status == "success") {
        jsonResponse = [{
        status: "success",
        data: ""
        }];
            res.send(jsonResponse);
        }
  
     });
    
    

});


app.post('/isLogin', urlencodedParser, function (req, res)
{
     sess = req.session;
    console.log("sess :"+JSON.stringify(sess))
    //var loggedin = sess.isLoggedIn;
    //console.log("from session loggedin :"+loggedin)
     jsonResponse = [{
                status:sess.isLoggedIn,
                isloggeduser:sess.isLoggedInUser,
                isadmin:sess.isadmin
                }];
              res.send(jsonResponse);  
    
});
app.post('/login', urlencodedParser, function (req, res) {
    
    var data = req.body;
    
    console.log(data.username)
       // SELECT `username`, `password` FROM `users` WHERE 1
     req.query = "select * FROM users WHERE username='"+data.username+"' and password='"+req.body.password+"';"
     sess = req.session;
    console.log("sess :")
    console.log(req.query)
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
        
          console.log(rows[0])
          //console.log("rows:"+rows[0].isAdmin);
          //return;
          
          if(rows.length>0){
           
            sess.isLoggedIn = true;
            sess.isLoggedInUser = data.username;
              if(rows[0].isAdmin == '1')
                sess.isadmin = true; 
              else
                   sess.isadmin = false; 
              jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
               sess.isLoggedIn = false;
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
//        if (status == "success") {
//        jsonResponse = [{
//        status: "success",
//        data: ""
//        }];
//        }
  
     });
    
   // console.log(req.body);

});
app.post('/register', urlencodedParser, function (req, res) {
    
    console.log(req.body);
    req.query = "INSERT INTO users (username,password,isAdmin) VALUES ('"+req.body.regusername+"','"+req.body.regpassword+"',"+parseInt(req.body.isAdmin)+")"
    
    console.log("query:"+req.query)
     mysql_helper.insertValues(req, function (status, rows) {
          
           console.log(status);
        if (status == "success") {
                req.query = "select * FROM users WHERE username='"+req.body.regusername+"' and password='"+req.body.regpassword+"';"
     sess = req.session;
    console.log("sess :")
    console.log(req.query)
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
        
          //console.log("getData.length:"+rows.length)
          //console.log("rows:"+rows[0].isAdmin);
          //return;
          
          if(rows.length>0){
           
            sess.isLoggedIn = true;
            sess.isLoggedInUser = req.body.regusername;
              if(rows[0].isAdmin == '1')
                sess.isadmin = true; 
              else
                   sess.isadmin = false; 
              jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
               sess.isLoggedIn = false;
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
//        if (status == "success") {
//        jsonResponse = [{
//        status: "success",
//        data: ""
//        }];
//        }
  
     });
        }
  
     });

});
app.post('/checkusername', urlencodedParser, function (req, res) {
    
    console.log(req.body.user);
     req.query = "select username FROM users WHERE username='"+req.body.user+"';"
     
      mysql_helper.getValues(req, function (status, rows) {
          //var getIndex = rows.findIndex(x => x.username = data.username)
          var getData = JSON.stringify(rows);
          console.log("status:"+status)
          console.log("rows:" +rows[0]);
          //return;
          if(rows.length>0){
           
                jsonResponse = [{
                status: "success",
                data: rows
                }];
               
            console.log(" success length > 0");
          }
          else{
              
               jsonResponse = [{
                status: "failure",
                data: ""
                }];
              console.log(" failure length == 0");
          }
         res.send(jsonResponse);
     });
    //return;

});
app.post('/logoff', urlencodedParser, function (req, res) {
     console.log('called');
          sess.destroy(); 
          sess.isLoggedIn = false;
          sess.isLoggedInUser='';
          sess.isadmin = false;
      
     
})
//connection.end();
// Binding express app to port 3000
app.listen(app.get('port'),function(){
    console.log('Node server running @ http://localhost:3000')
});