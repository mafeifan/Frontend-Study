/**
 * Core script to handle plugins
 */

var Plugins = function() {

	"use strict";

	/**
	 * $.browser for jQuery 1.9
	 */
	var initBrowserDetection = function() {
		$.browser={};(function(){$.browser.msie=false;
		$.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
		$.browser.msie=true;$.browser.version=RegExp.$1;}})();
	}

	/**
	 * Daterangepicker
	 */
	var initDaterangepicker = function() {
		if ($.fn.daterangepicker) {
			$('.range').daterangepicker({
				startDate: moment().subtract('days', 29),
				endDate: moment(),
				minDate: '01/01/2012',
				maxDate: '12/31/2014',
				dateLimit: { days: 60 },
				showDropdowns: true,
				showWeekNumbers: true,
				timePicker: false,
				timePickerIncrement: 1,
				timePicker12Hour: true,
				ranges: {
				   'Today': [moment(), moment()],
				   'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
				   'Last 7 Days': [moment().subtract('days', 6), moment()],
				   'Last 30 Days': [moment().subtract('days', 29), moment()],
				   'This Month': [moment().startOf('month'), moment().endOf('month')],
				   'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
				},
				opens: 'left',
				buttonClasses: ['btn btn-default'],
				applyClass: 'btn-sm btn-primary',
				cancelClass: 'btn-sm',
				format: 'MM/DD/YYYY',
				separator: ' to ',
				locale: {
					applyLabel: 'Submit',
					fromLabel: 'From',
					toLabel: 'To',
					customRangeLabel: 'Custom Range',
					daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
					monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					firstDay: 1
				}
			},

			function (start, end) {
				var range_updated = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');

				App.blockUI($("#content"));
				setTimeout(function () {
					App.unblockUI($("#content"));
					noty({
						text: '<strong>Dashboard updated to ' + range_updated + '.</strong>',
						type: 'success',
						timeout: 1000
					});
					//App.scrollTo();
				}, 1000);

				$('.range span').html(range_updated);
			});

			$('.range span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
		}
	}

	/**
	 * Sparklines
	 */
	var initSparklines = function() {
		if ($.fn.sparkline) {
			// Set default options
			$.extend(true, $.fn.sparkline.defaults, {
				line: {
					highlightSpotColor: App.getLayoutColorCode('green'),
					highlightLineColor: App.getLayoutColorCode('red')
				},
				bar: {
					barColor: App.getLayoutColorCode('blue'),
					negBarColor: App.getLayoutColorCode('red'),
					barWidth: 5,
					barSpacing: 2
				},
				tristate: {
					posBarColor: App.getLayoutColorCode('green'),
					negBarColor: App.getLayoutColorCode('red')
				},
				box: {
					medianColor: App.getLayoutColorCode('red')
				}
			});

			$(window).resize(function () {
				$.sparkline_display_visible();
			}).resize();

			// Initialize statbox sparklines
			$('.statbox-sparkline').each(function () {
				$(this).sparkline('html', Plugins.getSparklineStatboxDefaults());
			})
		}
	}

	/**************************
	 * Tooltips               *
	 **************************/
	var initTooltips = function() {
		// Set default options

		// TODO: $.extend does not work since BS3!

		// This fixes issue #5865
		// (When using tooltips and popovers with the Bootstrap input groups,
		// you'll have to set the container option to avoid unwanted side effects.)
		$.extend(true, $.fn.tooltip.defaults, {
			container: 'body'
		});

		// Use e.g. "#container" as container (instead of "body")
		// if you're experience errors when using Ajax
		$('.bs-tooltip').tooltip({
			container: 'body'
		});
		$('.bs-focus-tooltip').tooltip({
			trigger: 'focus',
			container: 'body'
		});
	}

	/**************************
	 * Popovers               *
	 **************************/
	var initPopovers = function() {
		$('.bs-popover').popover();
	}

	/**************************
	 * Noty                   *
	 **************************/
	var initNoty = function() {
		if ($.noty) {
			// Set default options
			$.extend(true, $.noty.defaults, {
				type: 'alert',
				timeout: false,
				maxVisible: 5,
				animation: {
					open: {
						height:'toggle'
					},
					close: {
						height:'toggle'
					},
					easing: 'swing',
					speed: 200
				}
			});
		}
	}

	/**************************
	 * Easy Pie Chart         *
	 **************************/
	var initCircularCharts = function() {
		if ($.easyPieChart) {
			// Set default options
			$.extend(true, $.easyPieChart.defaultOptions, {
				lineCap: 'butt',
				animate: 500,
				barColor: App.getLayoutColorCode('blue')
			});

			// Initialize defaults
			$('.circular-chart').easyPieChart({
				size: 110,
				lineWidth: 10
			});
		}
	}

	/**************************
	 * DataTables             *
	 **************************/
	var initDataTables = function() {
		if ($.fn.dataTable) {
			// Set default options
			$.extend(true, $.fn.dataTable.defaults, {
				"oLanguage": {
					"sSearch": ""
				},
				"sDom": "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'f>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
				// set the initial value
				"iDisplayLength": 5,
				fnDrawCallback: function () {
					if ($.fn.uniform) {
						$(':radio.uniform, :checkbox.uniform').uniform();
					}

					if ($.fn.select2) {
						$('.dataTables_length select').select2({
							minimumResultsForSearch: "-1"
						});
					}

					// SEARCH - Add the placeholder for Search and Turn this into in-line formcontrol
					var search_input = $(this).closest('.dataTables_wrapper').find('div[id$=_filter] input');

					// Only apply settings once
					if (search_input.parent().hasClass('input-group')) return;

					//search_input.attr('placeholder', 'Search')
					search_input.addClass('form-control')
					search_input.wrap('<div class="input-group"></div>');
					search_input.parent().prepend('<span class="input-group-addon"><i class="icon-search"></i></span>');
					//search_input.parent().prepend('<span class="input-group-addon"><i class="icon-search"></i></span>').css('width', '250px');

					// Responsive
					/*if (typeof responsiveHelper != 'undefined') {
						responsiveHelper.respond();
					}*/
				}
			});

			$.fn.dataTable.defaults.aLengthMenu = [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]];

			// Initialize default datatables
			$('.datatable').each(function () {
				var self = $(this);
				var options = {};

				/*
				 * Options via data-attribute
				 */

				// General Wrapper
				var data_dataTable = self.data('datatable');
				if (typeof data_dataTable != 'undefined') {
					$.extend(true, options, data_dataTable);
				}

				// Display Length
				var data_displayLength = self.data('displayLength');
				if (typeof data_displayLength != 'undefined') {
					$.extend(true, options, {
						"iDisplayLength": data_displayLength
					});
				}

				// Horizontal Scrolling
				var data_horizontalWidth = self.data('horizontalWidth');
				if (typeof data_horizontalWidth != 'undefined') {
					$.extend(true, options, {
						"sScrollX": "100%",
						"sScrollXInner": data_horizontalWidth,
						"bScrollCollapse": true
					});
				}

				/*
				 * Other
				 */

				// Checkable Tables
				if (self.hasClass('table-checkable')) {
					$.extend(true, options, {
						'aoColumnDefs': [
							{ 'bSortable': false, 'aTargets': [0] }
						]
					});
				}

				// TableTools
				if (self.hasClass('table-tabletools')) {
					$.extend(true, options, {
						"sDom": "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>", // T is new
						"oTableTools": {
							"aButtons": [
								"copy",
								"print",
								"csv",
								"xls",
								"pdf"
							],
							"sSwfPath": "plugins/datatables/tabletools/swf/copy_csv_xls_pdf.swf"
						}
					});
				}

				// ColVis
				if (self.hasClass('table-colvis')) {
					$.extend(true, options, {
						"sDom": "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'Cf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>", // C is new
						"oColVis": {
							"buttonText": "Columns <i class='icon-angle-down'></i>",
							"iOverlayFade": 0
						}
					});
				}

				// TableTools and ColVis
				if (self.hasClass('table-tabletools') && self.hasClass('table-colvis')) {
					$.extend(true, options, {
						"sDom": "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'TCf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>", // C is new
					});
				}

				// If ColVis is used with checkable Tables
				if (self.hasClass('table-checkable') && self.hasClass('table-colvis')) {
					$.extend(true, options, {
						"oColVis": {
							"aiExclude": [0]
						}
					});
				}

				// Responsive Tables
				if (self.hasClass('table-responsive')) {
					var responsiveHelper;
					var breakpointDefinition = {
						tablet: 1024,
						phone: 480
					};

					// Preserve old function from $.extend above
					// to extend a function
					var old_fnDrawCallback = $.fn.dataTable.defaults.fnDrawCallback;

					$.extend(true, options, {
						bAutoWidth: false,
						fnPreDrawCallback: function () {
							// Initialize the responsive datatables helper once.
							if (!responsiveHelper) {
								responsiveHelper = new ResponsiveDatatablesHelper(this, breakpointDefinition);
							}
						},
						fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
							responsiveHelper.createExpandIcon(nRow);
						},
						fnDrawCallback: function (oSettings) {
							// Extending function
							old_fnDrawCallback.apply(this, oSettings);

							responsiveHelper.respond();
						}
					});
				}

				// Set options via external function
				var data_dataTableFunction = self.data('datatableFunction');
				if (typeof data_dataTableFunction != 'undefined') {
					$.extend(true, options, window[data_dataTableFunction]() );
				}

				// Check, if table should be initialized with a ColumnFilter
				if (self.hasClass('table-columnfilter')) {
					// With ColumnFilter

					var options_columnfilter = {};

					var data_columnFilter = self.data('columnfilter');
					if (typeof data_columnFilter != 'undefined') {
						$.extend(true, options_columnfilter, data_columnFilter);
					}

					$(this).dataTable(options).columnFilter(options_columnfilter);

					// Style inputs
					self.find('.filter_column').each(function() {
						// Check, if selectboxes should be converted into Select2s
						var data_columnFilterSelect2 = self.data('columnfilterSelect2');
						if (typeof data_columnFilterSelect2 != 'undefined') {
							$(this).children('input').addClass('form-control');

							$(this).children('select').addClass('full-width-fix').select2({
								placeholderOption: 'first',
								allowClear: true
							});
						} else {
							$(this).children('input, select').addClass('form-control');
						}
					});
				} else {
					// Without ColumnFilter (regular)
					$(this).dataTable(options);
				}
			});
		}
	}







	/**************************
	 * Template               *
	 **************************/
	var initTemplate = function() {
		if ($.fn.template) {
			// Set default options
			$.extend(true, $.fn.template.defaults, {

			});
		}
	}

	return {

		// main function to initiate all plugins
		init: function () {
			initBrowserDetection(); // $.browser for jQuery 1.9
	
			initDataTables(); // Managed Tables


			//initTemplate(); // Template
		},




	};

}();