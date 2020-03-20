        if ( typeof(appMain) === 'undefined' )   {
            alert(" appMain in file index_routes.js has not been defined yet");

        }

        appMain.config(function ($routeProvider, $locationProvider) {

            $routeProvider.
                when('/Find', {
                    templateUrl: function () {
                        
                        console.log("Hey Find was pressed!");
                        return 'Templates/Home.html'
                    },
                    reloadOnSearch: true, //
                    controller: 'SalesOrder.controller'//stockOrder_controller'
                });


            $routeProvider.
                when('/CreateSalesOrder', {
                    templateUrl: 'Templates/SalesOrder.html',
                    reloadOnSearch: true,
                    controller: 'SalesOrder.controller'//stockOrder_controller'
                });

                
            $routeProvider.
                otherwise({
                    templateUrl: 'Templates/stockOrder.html',
                    reloadOnSearch: true,
                    controller: 'stockOrder_controller'//stockOrder_controller'
                });            



             //$locationProvider.html5Mode(true);                
        });

