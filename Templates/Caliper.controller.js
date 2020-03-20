    function ModelCaliper() { 
          this.SalesOrderId = 0;  
          this.CaliperTypeName = '';  
          this.SerialId = 0;  
          this.CaliperBoresTol = '';//'Tol. XX.110 to XX.145mm';  
          this.BoresInner1 = 0.0;//1;  
          this.BoresInner2 = 0.0;//22;  
          this.BoresInner3 = 0.0;//333;  
          this.BoresOuter1 = 0.0;//1;  
          this.BoresOuter2 = 0.0;//2;  
          this.BoresOuter3 = 0.0;//0;  
          this.CaliperPistonsTol = '';//'Tol. XX.950 to XX.970mm';  
          this.PistonsInner1 = 0.0;//1;  
          this.PistonsInner2 = 0.0;//2;  
          this.PistonsInner3 = 0.0;//0;  
          this.PistonsOuter1 = 0.0;//1;  
          this.PistonsOuter2 = 0.0;//2;  
          this.PistonsOuter3 = 0.0;//0;  
          this.Dimensions = false; //'false'  
          this.DimensionsTime = null;  
          this.Seal3 = false; //'false'  
          this.Seal3Time = null;  
          this.Seal4 = false; //'false'  
          this.Seal4Time = null;  
          this.Loctite = false; //'false'  
          this.LoctiteTime = null;  
          this.CenterSeal = false; //'false'  
          this.CenterSealTime = null;  
          this.Torque = false; //'false'  
          this.TorqueTime = null;  
          this.BallBearings = false; //'false'  
          this.BallBearingsTime = null;  
          this.WaterTest = false; //'false'  
          this.WaterTestTime = null;  
          this.Orientation = false; //'false'  
          this.OrientationTime = null;  
          this.RClips = false; //'false'  
          this.RClipsTime = null;  
          this.Side = false; //'false'  
          this.SideTime = null;  
     } 

  //-------------------- MENU                    
  //var app = angular.module('app', [              
  //   'ui.bootstrap'            
  //]);                                            
                                                 
  appMain.controller('Caliper.controller',        
      function (                                 
         $routeParams,
         $scope, 
      	 $http,
         $routeParams,
         // $uibModal, // if you plan to use modal dialogs from here
         $q                                  
      )                                          
  {                                              
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];             
    $scope.format = $scope.formats[0];         
    $scope.Item = new ModelCaliper();          


    //debugger;


    var urlbase = _baseUrl +  "/api/Caliper_";
    //var urlFK_List_UserType = _baseUrl + "/api4/V4_UserType_";

           
    $scope.FK_List_UserType;  
    $scope.Users_id = -1;


    var CRUD = new BaseApiController($scope, $http, urlbase, _token);
   
    
    // ------------------- 
    
    
    $scope.init = function (status) {
        var deferred = $q.defer();
        var promise = deferred.promise;     

        // in order to set this parameter call as follows UsersFrm.aspx?=12"#?=val
        // this hash is required in order for $location to read key, and declaring twice is required in order
        // for the form to be reloaded. 

        if (typeof (status) !== 'undefined') {
            $scope._status = status;
        }
        else {
             $scope.Users_id = $routeParams.id;
             if (typeof ($routeParams.status) !== 'undefined') {
                 $scope._status = parseInt($routeParams.status);
             }
             else {
                 $scope._status = 5;  //default edit : // 1 = edit // 2 = create // 3 = delete // 4 - list
             }
         }
		
        promise                  
        .then(function (val) {
             //debugger;
             switch ($scope._status) {
                 case 1: // Open for Edit
                     $scope.indexedit($scope.Users_id);
                     break;
                 case 2: // Open for Create
                     $scope.indexCreate(0);
                     break;
                 case 3: // Open for Delete
                     $scope.delete($scope.Users_id);
                     $scope._delete = true;
                     break;
                 case 5: // Open for View 
                     $scope.index($scope.Users_id);
                     break;
                 default:
                     $scope.index($scope.Users_id);
                     break;
      			}
            return true;
            
        })
         .catch(CRUD.errorCallback)
         deferred.resolve();
    };


	 $scope.btnSave_click = function () {
		 $scope.saveItem($scope.Item.SalesOrderId );
	 }

	 $scope.btnEdit_click = function () {
		 $scope.edit();
	 }
   
	 $scope.btnCancel_click = function () {
		 window.location.href = "#!/";
	 }


    $scope.init();	 


  // --------------------------------------------------------------------------------------------------------------       
                                                 
  
   $scope.chkDimensions_click = function()    {  
      //debugger;  
       if ($scope.Item.Dimensions === true) {  
           $scope.Item.DimensionsTime = moment();     
        }                                    
      else    {                              
            $scope.Item.DimensionsTime = null;          
         }                                    
     }  
 
   $scope.chkSeal3_click = function()    {    
       if ($scope.Item.Seal3 === true) {  
           $scope.Item.Seal3Time = moment();     
        }                                    
      else    {                              
            $scope.Item.Seal3Time = null;          
         }                                    
     }  
 
   $scope.chkSeal4_click = function()    {    
       if ($scope.Item.Seal4 === true) {  
           $scope.Item.Seal4Time = moment();     
        }                                    
      else    {                              
            $scope.Item.Seal4Time = null;          
         }                                    
     }  
 
   $scope.chkLoctite_click = function()    {    
       if ($scope.Item.Loctite === true) {  
           $scope.Item.LoctiteTime = moment();     
        }                                    
      else    {                              
            $scope.Item.LoctiteTime = null;          
         }                                    
     }  
 
   $scope.chkCenterSeal_click = function()    {    
       if ($scope.Item.CenterSeal === true) {  
           $scope.Item.CenterSealTime = moment();     
        }                                    
      else    {                              
            $scope.Item.CenterSealTime = null;          
         }                                    
     }  
 
   $scope.chkTorque_click = function()    {    
       if ($scope.Item.Torque === true) {  
           $scope.Item.TorqueTime = moment();     
        }                                    
      else    {                              
            $scope.Item.TorqueTime = null;          
         }                                    
     }  
 
   $scope.chkBallBearings_click = function()    {    
       if ($scope.Item.BallBearings === true) {  
           $scope.Item.BallBearingsTime = moment();     
        }                                    
      else    {                              
            $scope.Item.BallBearingsTime = null;          
         }                                    
     }  
 
   $scope.chkWaterTest_click = function()    {    
       if ($scope.Item.WaterTest === true) {  
           $scope.Item.WaterTestTime = moment();     
        }                                    
      else    {                              
            $scope.Item.WaterTestTime = null;          
         }                                    
     }  
 
   $scope.chkOrientation_click = function()    {    
       if ($scope.Item.Orientation === true) {  
           $scope.Item.OrientationTime = moment();     
        }                                    
      else    {                              
            $scope.Item.OrientationTime = null;          
         }                                    
     }  
 
   $scope.chkRClips_click = function()    {    
       if ($scope.Item.RClips === true) {  
           $scope.Item.RClipsTime = moment();     
        }                                    
      else    {                              
            $scope.Item.RClipsTime = null;          
         }                                    
     }  
 
   $scope.chkSide_click = function()    {    
       if ($scope.Item.Side === true) {  
           $scope.Item.SideTime = moment();     
        }                                    
      else    {                              
            $scope.Item.SideTime = null;          
         }                                    
     }  
                                   
  });     
 