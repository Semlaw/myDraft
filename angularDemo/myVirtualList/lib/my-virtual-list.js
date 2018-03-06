angular.module('myVirtualList', [])
	.directive('myVirtualList', [function() {
		'use strict';

		function debounce(func, wait) {
			var timeout, args, context, timestamp, result;
			var later = function() {
				var last = new Date().getTime() - timestamp;
				if(last < wait && last >= 0) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
					result = func.apply(context, args);
					if(!timeout) context = args = null;
				}
			};
			return function() {
				context = this;
				args = arguments;
				timestamp = new Date().getTime();
				if(!timeout) timeout = setTimeout(later, wait);
				return result;
			};
		};
		return {
			restrict: 'E',
			require: "ngModel",
			templateUrl: "views/directives/my-virtual-list.html",
			scope: {
				uiDataProvider: '=',
				uiOnSelect: '&',
				rowHeight: '@',
				canResize: '@'
			},
			link: function(scope, elem, attrs, ngModelCtrl) {
				//列表中每个item的高度
				console.dir(scope)
				var rowHeight = scope.rowHeight || 40,
					handle;
				scope.scrollTop = 0;
				scope.visibleProvider = [];
				scope.cellsPerPage = 0;
				scope.numberOfCells = 0;
				scope.canvasHeight = {};

				// Init
				scope.init = function() {
					scope.height = parseInt(getComputedStyle(elem[0]).height) || 400;
					elem[0].addEventListener('scroll', scope.onScroll);
					//可视区域内元素个数
					scope.cellsPerPage = Math.round(scope.height / rowHeight);
					//总共渲染出来的元素个数
					scope.numberOfCells = 3 * scope.cellsPerPage;
					//列表总高度
					scope.canvasHeight = {
						height: scope.uiDataProvider.length * rowHeight + 'px'
					};
					scope.updateDisplayList();
				};

				scope.updateDisplayList = function() {
					var firstCell = Math.max(Math.floor(scope.scrollTop / rowHeight) - scope.cellsPerPage, 0);
					var cellsToCreate = Math.min(firstCell + scope.numberOfCells, scope.numberOfCells);
					//判断是否需要改变数据模型
					if(scope.visibleProvider[0] !== scope.uiDataProvider[firstCell]) {
						scope.visibleProvider = scope.uiDataProvider.slice(firstCell, firstCell + cellsToCreate);
						for(var i = 0; i < scope.visibleProvider.length; i++) {
							scope.visibleProvider[i].styles = {
								'top': ((firstCell + i) * rowHeight) + "px"
							}
						}
					}
				};
				scope.onScroll = function(evt) {
					scope.scrollTop = elem.prop('scrollTop');
					scope.updateDisplayList();
					scope.$apply();
				};

				scope.onClickOption = function(option) {
					ngModelCtrl.$setViewValue(option);
					scope.currentOption = option;
					console.dir(scope.uiOnSelect);
					scope.uiOnSelect({
						"option": option
					});
				};
				scope.init();
				//容器高度随窗口自适应的情况
				if(scope.canResize) {
					handle = debounce(function() {
						scope.$apply(function() {
							scope.init()
						})
					})
					window.addEventListener.bind('resize', debounce(handle, 200))
				}
			}
		};
	}]);