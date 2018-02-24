angular.module('forDate', [])
	.directive('dateComponent', [function() {
		return {
			restrict: 'AE',
			require: "ngModel",
			template: `<div class="clearfix">
						<div class="pull-left formDate">
							<input type="text" class="datetimeStart form-control w-200 border-radius-0" name="from" placeholder="起始时间" id="datetimeStart" readonly="readonly" />
						</div>
						<div class="pull-left m-t-5">&nbsp;-&nbsp;</div>
						<div class="pull-left formDate">
							<input type="text" class="datetimeEnd form-control w-200 border-radius-0" name="to" placeholder="结束时间" id="datetimeEnd" readonly="readonly" />
						</div>
						<div class="date-reset-btn m-l-10 pull-left btn">
							重新选择
						</div>
					</div>`,
			replace: true,
			scope: {
				timeRange: '@',
				timeFormat: '@',
				timeType: '@'
			},
			link: function(scope, elem, attrs, ngModel) {
				console.dir(arguments)
				if(!attrs.reset){
					console.dir(elem.find('.data-reset-btn'))
					elem.find('.date-reset-btn').hide();
				}
				var format = scope.timeFormat || "yyyy-MM-dd";
				var ranges = scope.timeRange;
				var options = {
					format: format,
					language: "zh-CN",
					autoclose: true,
					todayBtn: true,
					minView: 2,
					pickerPosition: "bottom-right"
				};
				if(scope.timeType == 'M') {
					options.weekStart = 1;
					options.minView = 3;
					options.startView = 3;
				}
				function rerestLimit(){
					console.log('reset')
					elem.find('.datetimeEnd').datetimepicker('setEndDate',new Date);
					elem.find('.datetimeEnd').datetimepicker('setStartDate','0');
					elem.find('.datetimeStart').datetimepicker('setStartDate','0');
					elem.find('.datetimeStart').datetimepicker('setEndDate',new Date)
				}
				function changeHandle() {
					var s = elem.find('.datetimeStart').val();
					var e = elem.find('.datetimeEnd').val();
					var obj = ngModel.$modelValue || {};
					obj.startTime = s;
					obj.endTime = e;
					ngModel.$setViewValue(obj);
				};

				function limitEndTime() {
					console.log('limitEndTime')
					var val = elem.find('.datetimeStart').val();
					elem.find('.datetimeEnd').datetimepicker("setStartDate", val);
					if(ranges) {
						var time = new Date(val);
						time.setDate(time.getDate() + Number(ranges));
						elem.find('.datetimeEnd').datetimepicker("setEndDate", time);
						time = null;
					}
				};

				function limitStartTime() {
					console.log('limitStartTime')
					var val = elem.find('.datetimeEnd').val();
					elem.find('.datetimeStart').datetimepicker("setEndDate", val);
					if(ranges) {
						var time = new Date(val);
						time.setDate(time.getDate() - ranges);
						elem.find('.datetimeStart').datetimepicker("setStartDate", time);
						time = null;
					}
				};
				elem.find('.datetimeStart')
					.datetimepicker(options)
					.on("change", function(ev) {
						changeHandle();
						limitEndTime();
					});
				elem.find('.datetimeEnd')
					.datetimepicker(options)
					.on("change", function(ev) {
						changeHandle();
						limitStartTime()
					});

				elem.find('.date-reset-btn')
					.on('click', function() {
						elem.find('.datetimeStart').val('');
						elem.find('.datetimeEnd').val('');
						rerestLimit();
						var obj = ngModel.$modelValue || {};
						obj.startTime = '';
						obj.endTime = '';
						ngModel.$setViewValue(obj);
					})
				setTimeout(function() {
					if(ngModel.$modelValue) {
						elem.find('.datetimeStart').val(ngModel.$modelValue.startTime || '');
						elem.find('.datetimeEnd').val(ngModel.$modelValue.endTime || '');
						limitEndTime();
						limitStartTime();
					}
				})
			}
		}
	}])