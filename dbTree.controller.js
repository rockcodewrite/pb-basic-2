/*         var appMain = angular.module('appMain', [
               'ngRoute'
             , 'ngSanitize'
             ,'ui.bootstrap'
        ]);   
*/



          appMain.controller('Tree_Controller', function ($scope, $http, $timeout, $location, $q) {

            /// Alert attributes
            $scope._Error = "";
            $scope._errorFlag = false;
            $scope._operationFlag = false;
            $scope._Operation = ""
            $scope._debugMessage = "";

            $scope.btnSearch_click = function () {
                _menuTree.jstree("refresh");
            }

            var errorCallback = function (data, status, headers, config) {
                try {
                    $scope._errorFlag = true;
                    var Err = data.data;

                    $scope._Error = Err.Message.replace(/(\r\n|\n|\r)/gm, " ");

                    var DebugErr = ""
                    if (typeof (Err.MessageDetail) !== 'undefined') {
                        DebugErr += Err.MessageDetail.replace(/(\r\n|\n|\r)/gm, " ");
                    }

                    if (typeof (Err.ExceptionMessage) !== 'undefined') {
                        $scope._Error += Err.ExceptionMessage.replace(/(\r\n|\n|\r)/gm, " ");
                        DebugErr += Err.ExceptionMessage.replace(/(\r\n|\n|\r)/gm, " ");
                    }

                    if (typeof (Err.StackTrace) !== 'undefined') {
                        DebugErr += Err.StackTrace.replace(/(\r\n|\n|\r)/gm, " ");
                    }

                    $scope._debugMessage = DebugErr;
                    console.log(data);
                    return false;
                }
                catch (e) {
                    $scope._debugMessage += " " + status;
                    console.log(e);
                }
            };

            $scope.closeError = function () {
                $scope._errorFlag = false;
            };

            $scope.closeAlert = function () {
                $scope._operationFlag = false;
            };

            $scope.init = function () {
                //$scope.DriverTag.StartDate = moment();
            };

            $scope.init();
        });        
