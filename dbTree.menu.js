function discMenu(node) {
    menu = {};

    menu["Disc"] = new TreeViewMenu("glyphicon glyphicon-plus", "Add New Disc. . .");
    menu["Disc"].action = function (obj) {
        //debugger;
        GoTo('#!Disc/0?status=2');
    }
    return menu;
}


function caliperMenu(node) {
    menu = {};

    menu["Caliper"] = new TreeViewMenu("glyphicon glyphicon-plus", "Add New Caliper QA  . .");
    menu["Caliper"].action = function (obj) {
        //debugger;
        GoTo('#!Caliper/0?status=2');
    }
    return menu;
}



function salesOrderMenu(node) {
    menu = {};

    menu["SalesOrder"] = new TreeViewMenu("glyphicon glyphicon-plus", "New Sales Order. . .");
    menu["SalesOrder"].action = function (obj) {
            //debugger;
        GoTo('#!SalesOrder/0?status=2');
    }
        return menu;
}



        function TreeViewMenu(i, l) {
            this.separator_before = false;//": false,
            this.separator_after = false;;//": false,
            this.icon = i;//"glyphicon glyphicon-remove";
            this.label = l;// "Close iFrame";
            this.action = function (obj) { }
        }


        function Users_Menu(node) {
            menu = {};

            menu["FindUsers"] = new TreeViewMenu("glyphicon glyphicon-search", "Find Users . . .");
            menu["FindUsers"].action = function (obj) {

                var ID = node.data.id.split('_');
                GoTo('#!Users/' + ID[1] + "?status=1");
            }

            menu["CreateUsers"] = new TreeViewMenu("glyphicon glyphicon-plus", "Create Users . . .");
            menu["CreateUsers"].action = function (obj) {
                GoTo('#!Users/0?status=2');

            }

            menu["UP3"] = new TreeViewMenu("glyphicon glyphicon-plus", "Refresh Node . . .");
            menu["UP3"].action = function (obj) {
                alert("Refresh")
                GoTo('#!Users/0?status=2');

            }

            return menu;

        }    