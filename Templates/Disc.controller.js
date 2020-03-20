//-------------------- MENU

function ModelDisc() {
    this.Customer = "";
    this.Qty = 0;
    this.HatPart = "";
    this.Loctiteapplied = false; //'false'
    this.Torquedto115Nm = false; //'false'
    this.RunoutLHS = 0;
    this.RunoutRHS = 0;
    this.Signed = null;
    this.Date = null;

    this.LoctiteappliedTime = null;
    this.Torquedto115NmTime = null;
}

if (typeof appMain === 'undefined') {
    console.log("undefind: app.controller(Disc-controller)");
    if (_debug) { alert("app: for Disc-controller not defnied."); }
}


appMain.controller('Disc.controller',
    function (
        $routeParams,
        $scope,
        $http,
        $routeParams,
        // $uibModal, // if you plan to use modal dialogs from here
        $q     
    ) {
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.Item = new ModelDisc();

        var apiUrl = _baseUrl + "/api/Disc_";

        var CRUD = new BaseApiController($scope, $http, apiUrl)


        $scope.btnSave_click = function () {
            $scope.saveItem($scope.Item.SalesOrderId);
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

            if (typeof (status) !== 'undefined') {
                $scope._status = status;
            }
            else {
                $scope.id = $routeParams.id;
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
                            $scope.indexedit($scope.id);
                            break;
                        case 2: // Open for Create
                            $scope.indexCreate(0);
                            break;
                        case 3: // Open for Delete
                            $scope.delete($scope.id);
                            $scope._delete = true;
                            break;
                        case 5: // Open for View 
                            $scope.index($scope.id);
                            break;
                        default:
                            $scope.index($scope.id);
                            break;
                    }
                    return true;

                })
                .catch(CRUD.errorCallback)
            deferred.resolve();
        };


        $scope.chkLoctiteapplied_click = function () {
            if ($scope.Item.Loctiteapplied === true) {
                $scope.Item.LoctiteappliedTime = moment();
            }
            else {
                $scope.Item.LoctiteappliedTime = null;
            }
        }

        $scope.chkTorquedto115Nm_click = function () {
            if ($scope.Item.Torquedto115Nm === true) {
                $scope.Item.Torquedto115NmTime = moment();
            }
            else {
                $scope.Item.Torquedto115NmTime = null;
            }
        }

    });