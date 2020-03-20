    //alert("hey")

     function SalesOrderModel() { 
        this.CustomerName = "E&M Autobody";  
        this.DateOrdered = moment(); // "22 10 2019";  
        this.SalesOrderID = 387;  
        this.CompanyNameopt = "Vorshlag (USA)";  
        this.DateDue = moment(); // "08 11 2019";  
        this.Volusion = " ";  
        this.CustomerPO = "VM11078";  
        this.DepositPaid = "n/a";  
        this.AddedtoWIP = " ";  
        this.VehicleMakeModel = "Ford Mustang S197";  
        this.EngineType = " ";  
        this.Year = "";  
        this.Applicationracestreettrack = " ";  
        this.CaliperType = "X6EL";  
        this.DiscSizeandSlotType = "RR350x34mm";  
        this.CaliperColour = "Hard";  
        this.KitCaliperQTY = "One";  
        this.Hoses = "Yes";  
        this.HosesAdditionalInfo = " ";  
        this.FrontBrakePadCompound = " ";  
        this.BrakeFluid = " ";  
        this.BrakeFluidQTY = " ";  
        this.RearBrakePadCompound = " ";  
        this.AdditionalItemsegreardiscs = "  ";  
        this.PlatformCode = "";  
        this.HatCode = "";  
        this.BracketCode = "";  
        this.CaliperOrientation = "";  
        this.PistonRatio = "";  
        this.Serials = "";  
        this.Discfloatsystem = "";  
        this.Radialmountbolts = "";  
        this.Axialmountboltsopt = "";  
     } 
//debugger;

if (typeof appMain === 'undefined') {
    console.log("undefind: app.controller(modalDlg_controller)")
    if (_debug) { alert("app: for stockOrder_controller not defnied.")}
}

appMain.controller('SalesOrder.controller',        
      function (                                 
         $routeParams,
         $scope, 
      	 $http,
         $routeParams,
         // $uibModal, // if you plan to use modal dialogs from here
         $q     
      )                                          
  {       
    //debugger;
    //$scope.SalesOrder = new SalesOrderModel();   

    $scope.Item   = new SalesOrderModel();   

    var apiUrl = _baseUrl + "/api/SalesOrder_";

    var CRUD = new BaseApiController($scope, $http, apiUrl)
   

	 $scope.btnSave_click = function () {
		 $scope.saveItem($scope.Item.SalesOrderId );
	 }

	 $scope.btnEdit_click = function () {
		 $scope.edit();
	 }
   
	 $scope.btnCancel_click = function () {
		 window.location.href = "#!/";
	 }


    $scope.init = function (status) {
		    
        var deferred = $q.defer();
        var promise = deferred.promise;     
        //debugger;

        // in order to set this parameter call as follows UsersFrm.aspx?=12"#?=val
        // this hash is required in order for $location to read key, and declaring twice is required in order
        // for the form to be reloaded. 
  //debugger;
        if (typeof (status) !== 'undefined') {
            $scope._status = status;
        }
        else {
             $scope.Users_id = $routeParams.id;
             if (typeof ($routeParams.status) !== 'undefined') {
                 $scope._status = parseInt($routeParams.status);
             }
             else {
                //if (typeof ($location.search().ID) === 'undefined') {
                //    return;
               // }

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



    $scope.init();	     


    // Manage Date collection;     
    // --------------------------------------------------------------------------------                                  
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];             
    $scope.format = $scope.formats[0];         
                                                 
   
    $scope.$watch('Item.DateOrdered', function (newValue, oldValue) {
        //debugger;
        var date = $scope.Item.DateOrdered;
        $scope.Item.DateOrdered_formated = moment(date).format("YYYY - MMM - DD (ddd)");
       _day = moment(date).format("YYYY/MM/DD");
    }); 
    $scope.popupDateOrdered =  {
       opened: false
    }
    $scope.openDateOrdered = function () {
       $scope.popupDateOrdered.opened = true;
    }        
  
    $scope.$watch('Item.DateDue', function (newValue, oldValue) {
        var date = $scope.Item.DateDue;
        $scope.Item.DateDue_formated = moment(date).format("YYYY - MMM - DD (ddd)");
       _day = moment(date).format("YYYY/MM/DD");
    }); 
    $scope.popupDateDue =  {
       opened: false
    }
    $scope.openDateDue = function () {
       $scope.popupDateDue.opened = true;
    }        
                                   
  });   