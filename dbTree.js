//-------------------------------------------------------------------------------------------
//   V 0.1.0 : 2020-01-10
//-------------------------------------------------------------------------------------------

var nodeList = [];
var indexNodeList = _.indexBy(nodeList, "id");
var search = "";

function NodePaging(id, page, size, count, total, search) {
  this.id = id;
  this.page = page;
  this.size = size;
  this.count = count;
  this.total = total;
  this.search = search;
}

function GetNode(nodeId, data) {
  if (typeof indexNodeList[nodeId] === "undefined") {
    console.log("ForwardNode:" + nodeId);
    nodeList.push(
      new NodePaging(
        nodeId,
        data.page,
        data.size,
        data.count,
        data.total,
        data.search
      )
    );
    indexNodeList = _.indexBy(nodeList, "id");
  } else {
    console.log(nodeId + " found");
  }
  return indexNodeList[nodeId];
}

function mockData(node) {
  var base = window.location.pathname;
  console.log(node.id);
  switch (node.id) {
    case "#":
      return base + "api/root_data.json";
    case "/SalesOrder":
      return base + "api/SalesOrder_.json";

    default:
      break;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//-------------------- TREE
//------------------------------------------------------------------------
function setupTree(id, url) {
  try {
    if (_debug) {
      console.log("url:" + url);
    }

    var securityToken = getCookie("CognitoJwsToken");
    //debugger;
    if (_debug) {
      console.log(securityToken);
    }
    var _url = url;
    var _srch = "";
    var menuTree = $(id)
      .jstree({
        core: {
          themes: { stripes: true },
          data: {
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            headers: {
              Authorization: "Bearer " + securityToken
            },
            // url,
            url: function(node) {
              if (_mock) {
                return mockData(node);
              }

              if (_debug) {
                console.log("url:" + node);
              }
              return url + "?operation=get_node";
            },

            data: function(node) {
              if (_mock) {
                return "";
                return { id: node.id };
                return "/api/root_data.json";
              }

              if (_debug) {
                console.log("data:" + node);
              }

              var Selector;

              if (node.id == "#") {
                Selector = "#";
                return {
                  id: node.id,
                  search: search,
                  page: 1,
                  count: 0,
                  total: 0,
                  size: 20
                };
              } else {
                Selector = node.original.type;
              }
              //debugger;
              //----------------------------------------
              if (search !== $("#txtSearch").val()) {
                // Reset the page if we have a new search so that we dont get caught in a page
                // that no longer exists when a search term is entered
                var reset = GetNode(node.id, node.data);
                reset.page = 0;
              }
              search = $("#txtSearch").val();

              var data = GetNode(node.id, node.data);

              return {
                id: node.id,
                search: search,
                page: data.page,
                count: data.count,
                total: data.total,
                size: data.size
              };

              //switch (Selector) {
              //    case "#":
              //        if ((Send.search !== $("#txtSearch").val())) {
              //            _.each(Send.MainNodeStates, function (element, index, list) {
              //                 var Key = element.nodeType;
              //                 some_map[Key].page = 0;
              //             });
              //
              //        }
              //        Send.search = $("#txtSearch").val();
              //        return JSON.stringify(Send);
              //
              //    case "CustomRoles":
              //        var ID = node.parent.split('_');
              //        CustomRoles_Operation.id = ID[1]
              //        return JSON.stringify(CustomRoles_Operation);
              //    default:
              //        return '{"id" : "' + ID.toString() + '", "operation": "login", "search": ""  }';
              //        break;
              //}
            },

            success: function(retval) {
              if (_debug) {
                console.log("success:" + retval);
              }
              return retval.d;
            },

            error: function(jqXHR, textStatus, errorThrown) {
              // debugger;
              $(id).html(
                "<h3>There was an error while loading data for this tree</h3><p>" +
                  jqXHR.responseText +
                  "</p>"
              );
            }
          }
        },

        contextmenu: {
          items: function(node) {
            var tables = node.id.split("/");
            var menuType = "none";
            switch (node.type) {
              case "row":
                menuType = tables[tables.length - 2] + "Child";
                break;
              case "table":
                menuType = tables[tables.length - 1];
                break;
            }
            if (_debug) {
              console.log("contextmenu: " + menuType + node);
            }
            switch (menuType) {
              case "#":
                return Main_Menu(node);
              case "Caliper":
                return caliperMenu(node);
              case "SalesOrder":
                return salesOrderMenu(node);
              case "Disc":
                return discMenu(node);

              case "Users":
                return Users_Menu(node);
              case "UsersChild":
                return Users_Menu(node);
              case "none":
                return;
            }
          }
        },

        // -----------------------------------------------------------------
        // Need to add node types that are used in the controller or they
        // will be set to default in the binding section.
        // -----------------------------------------------------------------
        types: {
          "#": {
            icon: "glyphicon glyphicon-file",
            valid_children: []
          },
          table: {
            icon: "glyphicon glyphicon-file"
          },
          row: {
            icon: "glyphicon glyphicon-file"
          },
          page_fwd: {
            icon: "glyphicon glyphicon-file"
          },

          page_back: {
            icon: "glyphicon glyphicon-file"
          },
          default: {
            icon: "glyphicon glyphicon-file"
          },
          Caliper: {
            icon: "glyphicon glyphicon-file"
          }
        },

        // -----------------------------------------------------------------------
        // PLugins addead
        // -----------------------------------------------------------------------
        checkbox: {
          keep_selected_style: false,
          three_state: false, // prevents things from cascading up from parent
          whole_node: false, // to avoid checking the box just clicking the node
          tie_selection: false // for checking without selecting and selecting without checking
        },

        state: function() {
          return key_state;
        },

        //"plugins": [
        //      "search"
        //    , "json_data"
        //    , "contextmenu"
        //    , "wholerow"]

        // -----------------------------------------------------------------------
        // PLugins addead
        // -----------------------------------------------------------------------
        plugins: [
          "state",
          //, 'dnd' // drag and drop
          //, 'sort'
          "types",
          "contextmenu",
          "state",
          //, 'unique'
          //, 'checkbox'
          "search", // added 2019-05-17
          "json_data",
          "wholerow" // makes selection block level
        ]
      }) //end jsTree - config
      .on("delete_node.jstree", function(e, data) {
        $.get("?operation=delete_node", { id: data.node.id }).fail(function() {
          data.instance.refresh();
        });
      }); //end jsTree
  } catch (e) {
    console.log(e);
  }

  // On node click
  $(id).bind("select_node.jstree", function(evt, data) {
    if (_debug) {
      console.log("select_node.jstree \r\n");
      console.log(evt);
      console.log(data);
    }

    var evt = window.event || event;
    var button = evt.which || evt.button;
    if (button != 1 || typeof button == "undefined") return true;

    var type = data.node.type;
    var Node = data.node;
    console.log(type);
    switch (type) {
      case "row":
        //debugger;
        //function GoTo(path) {
        //    window.location.href = path;
        //}
        var pathRow = "#!" + Node.id;
        console.log(pathRow);
        GoTo(pathRow);
        break;

        break;
      case "page_fwd":
        var currParentType = Node.original.parentType;
        Node.state.selected = false;
        var parent_node = menuTree.jstree(true).get_node(Node.parent);
        parent_node.state.selected = false;
        console.log("parent_node");
        console.log(parent_node);
        var nodeData = GetNode(parent_node.id, parent_node.data);
        nodeData.page++;
        menuTree.jstree(true).refresh_node(parent_node);

        return false;
        break;

      case "page_back":
        var currParentType = Node.original.parentType;
        Node.state.selected = false;
        var parent_node = menuTree.jstree(true).get_node(Node.parent);
        var danodeDatata = GetNode(parent_node.id, parent_node.data);
        if (nodeData.page !== 0) {
          nodeData.page--;
        }
        menuTree.jstree(true).refresh(true); // TODO: Make this work so only node is refreshed not whole tree
        //_menuTree.jstree(true).refresh_node(parent_node);
        break;
      case "table":
        break;

      default:
        if (_debug) {
          console.log("case:default");
        }
        break;
    }
  });

  return menuTree;
}
