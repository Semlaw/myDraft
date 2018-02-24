//dateRangePicker directive

<div date-component time-range="10" time-format="yyyy-mm-dd" time-type='M' ng-model="dateArea"></div>
1.directive name: date-component （AE）;
2.attr
 time-range设置开始和结束时间的跨度（单位天）；
 time-format设置时间格式；（默认yyyy-mm-dd）；
 time-type 设置为'M'时可以最小只选择月(默认为天)；
 ng-model 通过设置数据模型格式为  
	{endTime: "2017-09-12", startTime: "2017-09-07"}
 可以初始化时间；
reset 显示重置时间按钮