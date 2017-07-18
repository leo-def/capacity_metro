(function(){
	"use strict";
	angular.module("highchartsAngular",[])

	.factory("chartDataAdapter", function ($mdComponentRegistry, $rootScope, $mdToast){
			var service = {
				toPieChart: toPieChart,	
				toLineChart:toLineChart,
			}
			return service;
			
			function toPieChart(data, name_key, count_key, ignoring){
				if(!ignoring){ignoring = [];}
				var convertedData = [];
				for(var index in data){
					var row = data[index];
					if(ignoring.indexOf(row[name_key]) !== -1){
						continue;
					}
					convertedData.push({
						name: row[name_key],
						y: assetNumber((row[count_key])),
					});
				}
				return convertedData;
			}
			/*
				categoria são os valores que aparecem na coluna
				
				series 
				 é um conjunto de nome e conjunto de valores
				 
				
				
				parametros
					
					data  (conjunto de dados á serem analizados)
					category_key (nome do campo que contem valor para aparecer na coluna)
					series (lista contento o titulo e chave de cada serie , série é uma informação traçada no gráfico)
			*/
			
			//series = [ {name: '', key: ''}]
			//data = [{ serie.key: '' }]
			//convertedData = {series:[ {name: data[serie.name], data[ {row[serie.key]}] ] }], categories:[ {row[category_key]} ]}
			function toLineChart(data, category_key, series){
				var convertedData = {series: [], categories: []};
				/*inicia as series*/
				for(var index in series){
					convertedData.series.push({name: series[index].name, data:[]});
				}
				
				for(var index in data){
					var row = data[index];
					
					convertedData.categories.push(row[category_key]);
					
					for(var serie_index in series){
						
						var serie =  series[serie_index];
						/* adciona o valor do campo correspondente á categoria*/
						//if(convertedData.categories[serie_index]){
							
						//}else{
						//	convertedData.categories[serie_index] = [];
						//}
						
						
						/* adciona o valor do campo e serie correspondente*/
						convertedData.series[serie_index].data.push(assetNumber(row[serie.key]));
					}
				}
				return convertedData;
			}
			
			// asset that val is float otherwise it will be converted to it
			function assetNumber(val){
				var returnVal = val
				if($.type(val) === "string"){
					returnVal = parseFloat(val);
				}
				return returnVal;
			}
	})
	// Directive for generic chart, pass in chart options
    .directive('hcChart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                options: '='
            },
            link: function (scope, element) {
                Highcharts.chart(element[0], scope.options);
            }
        };
    })
	// Directive for pie charts, pass in title and data only    
    .directive('hcPieChart', function () {
        return {
				restrict: 'E',
				template: '<div></div>',
				scope: {
					title: '@',
					data: '=',
					filename: '@',
				},
				link: link
            }
			function link(scope, element) {
				if(!scope.filename){
					scope.filename = "Graph Image Download";
				}
				loadChart();
				
				scope.$watch(
					function(){
						return scope.data;
					}, 
					function(value) {
						loadChart();
					});
			
				function loadChart(){
					Highcharts.chart(element[0], {
						chart: {
							type: 'pie'
						},
						title: {
							text: scope.title
						},
						plotOptions: {
							pie: {
								allowPointSelect: true,
								cursor: 'pointer',
								dataLabels: {
									enabled: true,
									format: '<b>{point.name}</b>: {point.percentage:.1f} %'
								}
							}
						},
						series: [{
							data: scope.data
						}],
						exporting: {
							buttons: {
								contextButton: {
										menuItems: [{
											textKey: 'downloadPNG',
											onclick: function () {
												this.exportChart();
											}
										}, {
											textKey: 'downloadJPEG',
											onclick: function () {
												this.exportChart({
													type: 'image/jpeg'
												});
											}
										}]
								}
							},
							filename: scope.filename,
						}
						
					});//Highcharts.chart
				};//loadChart
			};// link
        } )//directive
	//
	.directive('hcLineChart', function () {
        return {
				restrict: 'E',
				template: '<div></div>',
				scope: {
					title: '@',
					subtitle: '@',
					column_title: '=',
					data: '=',
					filename: '@',
					
				},
				link: link
            }
			function link(scope, element) {
				if(!scope.filename){
					scope.filename = "Graph Image Download";
				}
				loadChart();
				
				scope.$watch(
					function(){
						return scope.data;
					}, 
					function(value) {
						loadChart();
					});
			
				function loadChart(){
					Highcharts.chart(element[0], {
						chart: {
							type: 'line'
						},
						title: {text: scope.title},//param
						subtitle: {text: scope.subtitle},//param
						xAxis: {
							min: 0.5, max: scope.data.categories.length -1.5,
							minPadding:0,
        					maxPadding:0,
							type: "category",
							categories: scope.data.categories //param
						},
						yAxis: {
							title: {text: scope.column_title}, //param
							labels: {formatter: function () {return this.value ;}}
						},
						tooltip: { pointFormat: '{series.name} <b>{point.y:,.0f}</b>'//Mb/s
						},
						/*
						plotOptions: {
							area: {marker: {enabled: false,symbol: 'circle',radius: 2,states: {hover: {enabled: true}}	}}
						},
						*/
						plotOptions: {
								area: {
									marker: {
										enabled: false,
										symbol: 'circle',
										radius: 2,
										states: {
											hover: {
												enabled: true
											}
										}
									}
								},
								line: {
									marker: {
										enabled: false
									}
								}
							},
						series: scope.data.series,  //param
						exporting: {
							buttons: {
								contextButton: {
										menuItems: [{
											textKey: 'downloadPNG',
											onclick: function () {
												this.exportChart();
											}
										}, {
											textKey: 'downloadJPEG',
											onclick: function () {
												this.exportChart({
													type: 'image/jpeg'
												});
											}
										}]
								}
							},
							filename: scope.filename,
						}
					});//Highcharts.chart
				};//loadChart
			};// link
        } )//directive
		.directive('hcAreaChart', function () {
        return {
				restrict: 'E',
				template: '<div></div>',
				scope: {
					title: '@',
					subtitle: '@',
					column_title: '=',
					data: '='
					
				},
				link: link
            }
			function link(scope, element) {
				loadChart();
				
				scope.$watch(
					function(){
						return scope.data;
					}, 
					function(value) {
						loadChart();
					});
			
				function loadChart(){
					Highcharts.chart(element[0], {
						chart: {
							type: 'area'
						},
						title: {text: scope.title},//param
						subtitle: {text: scope.subtitle},//param
						xAxis: {
							min: 0.5, max: scope.data.categories.length -1.5,
							minPadding:0,
        					maxPadding:0,
							type: "category",
							categories: scope.data.categories //param
						},
						yAxis: {
							title: {text: scope.column_title}, //param
							labels: {formatter: function () {return this.value ;}}
						},
						tooltip: { pointFormat: '{series.name} <b>{point.y:,.0f}</b>'//Mb/s
						},
						/*
						plotOptions: {
							area: {marker: {enabled: false,symbol: 'circle',radius: 2,states: {hover: {enabled: true}}	}}
						},
						*/
						plotOptions: {
								area: {
									marker: {
										enabled: false,
										symbol: 'circle',
										radius: 2,
										states: {
											hover: {
												enabled: true
											}
										}
									}
								}
							},
						series: scope.data.series  //param
					});//Highcharts.chart
				};//loadChart
			};// link
        } );//directive
	
})();