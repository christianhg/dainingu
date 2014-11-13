angular.module("dainingu.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("cashregister/cashregister.view.html","awf");
$templateCache.put("dashboard/dashboard.view.html","<div id=\"dashboard\">\n    {{vm.hej}}\n</div>");
$templateCache.put("floor/floor.view.html","awf");
$templateCache.put("home/home.view.html","awf");
$templateCache.put("kitchen/kitchen.view.html","awf");
$templateCache.put("menucard/menucard.view.html","<menu ng-repeat=\"menu in vm.menus\" menu-name=\"menu.name\" menus=\"menu.menus\" dishes=\"menu.dishes\"></menu>\n\n\n<!--<ul>\n    <li ng-repeat=\"menu in vm.menus\">{{menu.title}}\n        <ul>\n            <li ng-repeat=\"menu in menu.menus\">{{menu.title}}\n                <ul>\n                    <li ng-repeat=\"dish in menu.dishes\">{{dish}}</li>\n                </ul>\n            </li>\n            <li ng-repeat=\"dish in menu.dishes\">{{dish}}</li>\n        </ul>\n    </li>\n</ul>-->\n");
$templateCache.put("widgets/dish/dish.html","{{dish}}");
$templateCache.put("widgets/menu/menu.html","{{vm.menuName}}\n<dish ng-repeat=\"dish in vm.dishes\"></dish>");}]);