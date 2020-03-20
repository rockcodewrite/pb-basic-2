appMain.config(function ($routeProvider, $locationProvider) {

            $routeProvider.
                when('/Disc/:id', {
                    templateUrl: function () {
                        //debugger;
                        return 'Templates/Disc.html'
                    },
                    reloadOnSearch: true,
                    controller: 'Disc.controller'
                });


            $routeProvider.
                when('/SalesOrder/:id', {
                    templateUrl: 'Templates/SalesOrder.html',
                    reloadOnSearch: false,
                    controller: 'SalesOrder.controller'
                });


            $routeProvider.
                when('/Caliper/:id', {
                    templateUrl: function() {
                        //debugger;
                        return 'Templates/Caliper.html'
                    },
                    reloadOnSearch: true,
                    controller: 'Caliper.controller'
                });

            $routeProvider.
                when('/Users/:id', {
                    templateUrl: 'Templates/Users_ui.html',
                    reloadOnSearch: true,
                    controller: 'UsersFrm_Controller'
                });                

            // go to this if we cannot find anything
            $routeProvider.
                otherwise({
                    templateUrl: 'Templates/Home.html?v=0.1'
                });

             //$locationProvider.html5Mode(true);                
        });