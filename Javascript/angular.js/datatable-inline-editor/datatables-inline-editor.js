

    /**
     * <table class="table table-striped table-bordered datatable table-hover"
     *        datatables-inline-editor="datatablesInlineEditor"></table>
     *
     * $scope.datatablesInlineEditor =  {
 *      Source:         '/api/association',     // Where to load the table data
 *      PrimaryKeyName: 'AssociationTypeId',    // The primary key name of each data item
 *      ItemClassName:  'AssociationTypes',     // Which property containing data array in the result from the source.
 *      ItemName:       'Association',          // Just a name to display
 *      EmptyItem:      {                       // Used for add new item.
            AssociationTypeId   : 0,
            Title               : '',
            Description         : '',
            RoleId1             : null,
            RoleId2             : null,
            CreatedOn           : $scope.date,
            UpdatedOn           : $scope.date
 *      },
 *      DataFactory: {                          // A proxy to the actual data factory function.
 *          create: function(data){
 *              return associationData.createAssociation(data);
 *          },
 *          update: function(data, id){
 *              return associationData.editAssociation(data,id);
 *          },
 *          remove: function(id){
 *              return associationData.deleteAssociation(id);
 *          }
 *      },
        Callbacks: function () {
            return {
                customButtonFunction: $scope.anyfunction    // External functions
            };
        },
 *      Columns: [                                          // Define the datatables columns.
            {
                name   : 'AssociationTypeId',
                title  : 'ID',
                editing: null                               // Just display the value. No filter no editor.

            },
            {
                name   : 'Title',
                title  : 'Title',
                editing: 'text'                             // Text inline editor
            },
            {
                name   : 'Description',
                title  : 'Description',
                editing: 'text'
            },
            {
                name   : 'RoleId2',
                title  : 'Primary Role',
                editing: 'select',                          // Select inline editor
                select : {
                    repeat: 'roles',                        // The property name in $scope which provides data to the select.
                    value : 'RoleId',                       // Value of the repeat item.
                    title : 'Title',                        // Title of the repeat item.
                },
                display: function (data, type, full, meta) {
                    return $scope.getRoleName(data);
                }
            },
            {
                name   : 'RoleId1',
                title  : 'Secondary Role',
                editing: 'select',
                select : {
                    repeat: (function(){
                        return $scope.roles;       // The property name in $scope which provides data to the select.
                    }),
                    value : 'RoleId',              // Value of the repeat item.
                    title : 'Title',               // Title of the repeat item.
                },
                display: function (data, type, full, meta) {
                    return $scope.getRoleName(data);
                }
            },
            {
                name   : 'CreatedOn',
                title  : 'Created On',
                editing: 'date'                    // Display formatted date
            },
            {
                name   : 'UpdatedOn',
                title  : 'Updated On',
                editing: 'date'
            },
            {
                name    : null,
                title   : 'Action',
                editing : 'action',
                display : function(data, type, full, meta) {
                    var primaryKey = full.AssociationTypeId;
                    var html += '<md-button ng-click="editor.customButtonFunction(' + primaryKey + ')">Custom Button</md-button>';
                    return html;
                }
            },
            'action'
        ]
 * }
     */

    app.directive('datatablesInlineEditor', ['$compile', function ($compile) {

        var settingName = 'editor';

        function dateHtml(data, type, full, meta) {
            return;
        }

        function GetColumnRenderFactory(editor, settings) {
            return {
                setupCallbacks: function setupCallbacks(callbacks) {
                    if (angular.isFunction(callbacks)) {
                        callbacks = callbacks();
                    }
                    for (var name in callbacks) {
                        if (callbacks.hasOwnProperty(name)) {
                            var callback = callbacks[name];
                            if (angular.isFunction(callback)) {
                                editor[name] = callback;
                            }
                        }
                    }
                },
                date          : function date(name, title, displayCallback, columnOptions) {
                    return function (data, type, full, meta) {
                        var isRequired = '';
                        if (columnOptions.required) {
                            isRequired = ' required="required"';
                        }
                        var html = void 0;
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        if (full.edit) {
                            if (angular.isString(editor.editingItems[itemKey][name])) {
                                return '2010-10-10';
                            }
                            html = '<md-datepicker' + isRequired + ' name="' + name + '" ng-model="' + editingItemName + '.' + name + '"></md-datepicker>' + '<div ng-messages="' + editingItemName + '.errors">' + '<div ng-message="' + name + '">' + '{{ ' + editingItemName + '.errors._messages.' + name + ' }}</div>' + '</div>';
                        } else {
                            if (displayCallback) {
                                html = displayCallback(data, type, full, meta);
                            } else {
                                html = dateHtml(data, type, full, meta);
                            }
                        }
                        return html;
                    };
                },
                other         : function other(name, title, displayCallback, columnOptions) {
                    return function (data, type, full, meta) {
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        return displayCallback(data, type, full, meta);
                    };
                },
                text          : function text(name, title, displayCallback, columnOptions) {
                    return function (data, type, full, meta) {
                        var isRequired = '';
                        if (columnOptions.required) {
                            isRequired = ' required="required"';
                        }
                        var html;
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        if (full.edit) {
                            html = '<div ' + 'ng-class="{\'md-input-invalid\':' + editingItemName + '.$errors.' + name + '}">' + '<input' + isRequired + ' name="' + name + '" ng-model="' + editingItemName + '.' + name + '"' + (columnOptions.uiMask ? ' ui-mask="' + columnOptions.uiMask + '" ui-options="{addDefaultPlaceholder: false}" model-view-value = "true" ' : '') + '>' + '<div ng-messages="' + editingItemName + '.errors">' + '<div ng-message="' + name + '">' + '{{ ' + editingItemName + '.errors._messages.' + name + ' }}</div>' + '</div>';
                        } else {
                            html = displayCallback ? displayCallback(data, type, full, meta) : full[name];
                        }
                        return html;
                    };
                },
                radio         : function radio(name, title, displayCallback, options, columnOptions) {
                    return function (data, type, full, meta) {
                        var html;
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        html = '<input type="radio" aria-label="Primary" name="' + name + '" ' + 'ng-click="' + settingName + '.updatePrimary(\'' + full['_id'] + '\')"  ' + 'ng-checked="' + full[name] + '">' + '<div ng-messages="' + editingItemName + '.errors">' + '<div ng-message="' + name + '">' + '{{ ' + editingItemName + '.errors._messages.' + name + ' }}</div>' + '</div>';
                        html = displayCallback ? displayCallback(data, type, full, meta) : html;
                        return html;
                    };
                },
                checkbox      : function checkbox(name, title, displayCallback, options, columnOptions) {
                    return function (data, type, full, meta) {
                        var html;
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        html = '<input type="checkbox" aria-label="Primary" name="' + name + '" ' + 'ng-click="' + settingName + '.updatePrimary(\'' + full['_id'] + '\')"  ' + 'ng-checked="' + full[name] + '">' + '<div ng-messages="' + editingItemName + '.errors">' + '<div ng-message="' + name + '">' + '{{ ' + editingItemName + '.errors._messages.' + name + ' }}</div>' + '</div>';
                        html = displayCallback ? displayCallback(data, type, full, meta) : html;
                        return html;
                    };
                },
                select        : function select(name, title, displayCallback, options, columnOptions) {
                    return function (data, type, full, meta) {
                        var isRequired =  columnOptions.required ? ' required="required"' : '';
                        var html;
                        var itemKey = GetHiddenIdKey(full['_id']);
                        var editingItemName = settingName + '.editingItems[\'' + itemKey + '\']';
                        if (angular.isFunction(options.repeat)) {
                            //editor.repeater = options.repeat();
                            // unique the repeater
                            var repeaterName = name + '-repeater';
                            editor[repeaterName] = options.repeat();
                        }
                        if (full.edit) {
                            html = '<md-input-container ng-class="{\'md-input-invalid\':' + editingItemName + '.$errors.' + name + '}">' + '<label>' + title + '</label>' + '<md-select' + isRequired + ' name="' + name + '" ng-model="' + editingItemName + '.' + name + '">' + '<md-option class="{{ item.Title }}" ng-repeat="item in editor[\'' + repeaterName + '\']" ' + ' ng-value="item.' + options.value + '">' + '{{item.' + options.title + '}}' + '</md-option>' + '</md-select>' + '<div ng-messages="' + editingItemName + '.errors">' + '<div ng-message="' + name + '">{{ ' + editingItemName + '.errors._messages.' + name + ' }}</div>' + '</div>' + '</md-input-container>';
                        } else {
                            html = displayCallback ? displayCallback(data, type, full, meta) : full[name];
                        }
                        return html;
                    };
                }
            };
        }

        /**
         * @return {string}
         */
        function GetHiddenIdKey(primaryKey) {
            return 'item-' + primaryKey;
        }

        return {
            restrict        : 'A',
            template        : function template(tElement, tAttrs) {
                tElement.removeAttr("datatables-inline-editor");
                tElement.attr("datatable", "");
                tElement.attr("dt-options", "editor.dtOptions");
                tElement.attr("dt-columns", "editor.dtColumns");
                tElement.attr("dt-instance", "editor.dtInstance");
            },
            scope           : {
                datatablesInlineEditor: '=',
                onItemAdding          : '&',
                onItemAdded           : '&',
                onItemRemoved         : '&',
                onItemUpdated         : '&',
            },
            compile         : function compile(tElement, tAttrs, transclude) {
                return {
                    pre : function preLink(scope, iElement, iAttrs, controller) {
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        $compile(iElement[0])(scope);
                    }
                };
            },
            controllerAs    : 'editor',
            bindToController: true,
            controller      : function controller($scope, $element, $attrs, $compile, DTOptionsBuilder, DTColumnBuilder, $q, $timeout) {
                var editor = this;
                var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };

                editor.initialized = false;
                editor.afterInitCallbacks = [];

                editor.editingItems = [];
                editor.sendingItems = {};
                // only work for widget and in instance page
                editor.isBtnDisabled = false;
                var selectedIds = [];
                var isSelectedAll = false;
                var settings = prepareSettings(editor.datatablesInlineEditor);
                var columnRenderFactory = GetColumnRenderFactory(editor, settings);
                var dataFactory = settings.DataFactory;

                if (angular.isUndefined(settings.showAlertAfterChange)) {
                    settings.showAlertAfterChange = true;
                }

                columnRenderFactory.setupCallbacks(settings.Callbacks);
                if (angular.isDefined(settings.isBtnDisabled) && settings.isBtnDisabled) {
                    editor.isBtnDisabled = true;
                }
                if (angular.isUndefined(settings.isSendAjax)) {
                    settings.isSendAjax = true;
                }
                editor.dtOptions = DatatablesOptionsBuilder(settings);
                // Datatables Columns
                editor.dtColumns = DatatablesColumnsBuilder(settings.Columns);
                //Datatables instance
                editor.dtInstance = {};
                angular.extend(settings, GetSettingsExtend());

                // for phone/email widget,  display input element if no any data
                $element.on('init.dt', function (e, dtSettings, json) {
                    $timeout(function () {
                        if (typeof editor.onInit == 'function') {
                            editor.onInit(e, dtSettings, json);
                        }

                        var pagination = localStorage.getItem(settings.ItemName + '.pagination');
                        pagination = pagination ? parseInt(pagination, 0) : 0;
                        GetSettingsExtend().getDataTable().page(pagination);
                        setTimeout(function () {
                            GetSettingsExtend().getDataTable().draw(false);
                        }, 1);

                        editor.initialized = true;
                        for (var i = 0; i < editor.afterInitCallbacks.length; i++) {
                            var callback = editor.afterInitCallbacks[i];
                            callback(editor, settings);
                        }
                        editor.afterInitCallbacks = [];
                    }, 50);
                });
                $element.on('xhr.dt', function (e, dtSettings, json, xhr) {
                    json = setupHiddenId(json);
                });

                function setupHiddenId(data) {
                    var d = new Date().getTime();
                    var res = void 0;
                    // process the format like data.Roles in role page
                    if (angular.isDefined(data[settings.ItemClassName])) {
                        res = data[settings.ItemClassName];
                    } else {
                        // widget data
                        res = data;
                    }
                    for (var i = 0, length = res.length; i < length; i++) {
                        var pk = res[i][settings.PrimaryKeyName];
                        if (pk > 0) {
                            res[i]._id = pk;
                        } else {
                            // widget
                            res[i]._id = d++;
                        }
                    }
                    return res;
                }

                editor.updatePrimary = function (row) {
                    var tableData = getDataTable().data();
                    var itemInfo = getItemByRow(row);
                    var primaryKeyName = '_id';
                    angular.forEach(tableData, function (item) {
                        item.IsPrimary = itemInfo[primaryKeyName] !== item[primaryKeyName] ? false : true;
                    });
                };

                editor.saveItem = function (row) {
                    var hiddenKey = row;
                    var itemKey = GetHiddenIdKey(hiddenKey);
                    if (editor.sendingItems[itemKey]) return;
                    // editor.sendingItems[itemKey] = true;
                    var data = {};
                    angular.copy(editor.editingItems[itemKey], data);
                    delete data.errors;
                    var allItems = getAllData();
                    if (data[settings.PrimaryKeyName] <= 0) {
                        // insert new
                        delete data.CreatedOn;
                        delete data.UpdatedOn;
                        data.edit = false;

                        dataFactory.create.call(editor, editor.personId, data).then(function (result) {
                            var res = result.data;
                            var status = result.status;
                            editor.sendingItems[itemKey] = false;
                            getDtInstance().reloadData(function (json) {
                                getDataTable().page('last').draw('page');
                            }, false);
                            if (settings.showAlertAfterChange) {
								                editor.sendingItems[itemKey] = true;
                                console.log(settings.ItemName + ' ' + getDataTitle(data) + ' was saved. ');
                            }
                            delete editor.editingItems[itemKey];
                            settings.adding = false;
                            if (editor.onItemAdded()) {
                                editor.onItemAdded()(data);
                            }
                        }, function (reason) {
                            var e = reason.data;
                            var status = reason.status;
                            editor.sendingItems[itemKey] = false;
                            editor.editingItems[itemKey].edit = true;
                            editor.editingItems[itemKey].errors = e;
                        });
                    } else {
                        // update
                        dataFactory.update.call(editor, data, hiddenKey, allItems).then(function (result) {
                            var res = result.data;
                            var status = result.status;
                            editor.sendingItems[itemKey] = false;
                            data.edit = false;
                            data.UpdatedOn = new Date().toISOString();
                            getDataTableRow(row).data(data).draw('page');
                            getDtInstance().reloadData(function (json) {
                                getDataTable().page('last').draw('page');
                            }, false);

                            compileRow(row);
                            if (settings.showAlertAfterChange) {
                                //DialogService.openToast(settings.ItemName + ' ' + getDataTitle(data) + ' was saved. ');
                            }
                            delete editor.editingItems[itemKey];
                            settings.adding = false;
                            if (editor.onItemUpdated()) {
                                editor.onItemUpdated()(data);
                            }
                        }, function (reason) {
                            var e = reason.data;
                            var status = reason.status;
                            editor.sendingItems[itemKey] = false;
                            editor.editingItems[itemKey].errors = e;
                        });
                    }
                };
                /**
                 * Cancel the editing
                 * @param row
                 */
                editor.cancelEdit = function (row) {
                    var item = getItemByRow(row);
                    item.edit = false;
                    var primaryKey = item[settings.PrimaryKeyName];
                    if (primaryKey || item.isValid) {
                        getDataTableRow(row).data(item).draw('page');
                        compileRow(row);
                        $element.find("#" + row).removeClass("rowSelect");
                    } else {
                        getDataTableRow(row).remove().draw('page');
                        settings.adding = false;
                    }
                    var itemKey = GetHiddenIdKey(row);
                    delete editor.editingItems[itemKey];
                };
                /**
                 * Edit button clicked
                 * @param row
                 */
                editor.editItem = function (row) {
                    var item = getItemByRow(row);

                    if (item.hasOwnProperty(settings.PrimaryKeyName) && !settings.isSendAjax) {
                        item[settings.PrimaryKeyName] = item._id;
                    }

                    if (editor.onItemAdding()) {
                        if (!editor.onItemAdding()(item, row)) {
                            return false;
                        }
                    }
                    var itemKey = GetHiddenIdKey(item['_id']);
                    var tempItem = {};
                    angular.copy(item, tempItem);
                    editor.editingItems[itemKey] = tempItem;
                    item.edit = true;
                    getDataTableRow(row).data(item).draw('page');
                    $element.find("#" + row).addClass("rowSelect");
                    compileRow(row);
                };
                /**
                 * Trash button clicked
                 * @param row
                 * @param $event
                 */
                editor.deleteItem = function (row, $event) {
                    var itemInfo = getItemByRow(row);
                    // DialogService.showDeleteConfirmation(itemInfo.Title, itemInfo['_id']).then(function (id) {
                    //     return dataFactory.remove.call(editor, id, itemInfo).then(function (result) {
                    //         var tableRow = getDataTableRow(row);
                    //         UtilService.easingDeleting(angular.element(tableRow.node()), function () {
                    //             tableRow.remove().draw('page');
                    //             if (settings.showAlertAfterChange) {
                    //                 DialogService.openToast(settings.ItemName + ' ' + getDataTitle(itemInfo) + ' was deleted successfully. ');
                    //             }
                    //             if (editor.onItemRemoved()) {
                    //                 editor.onItemRemoved()(itemInfo, row);
                    //             }
                    //         });
                    //     });
                    // });
                };

                function actionHtml(data, type, full, meta) {
                    var html;
                    var primaryKey = full['_id'];
                    if (full.edit) {
                        html = '<div class="actionButtons">' + '<button aria-label="Save" class="save" ng-disabled="' + editor.isBtnDisabled + '" ' + 'ng-click="' + settingName + '.saveItem(' + primaryKey + ')" title="Save">Save' +  '</button>' + '<button aria-label="Cancel" ng-disabled="' + editor.isBtnDisabled + '" ng-click="' + settingName + '.cancelEdit(' + primaryKey + ')" title="Cancel">Cancal' + '</button>' + '</div>';
                    } else {
                        html = '<div class="actionButtons">' + '<button aria-label="Edit" ng-click="' + settingName + '.editItem(' + primaryKey + ')" ng-disabled="editing || editor.isBtnDisabled" title="Edit">Edit' + '</md-button>' + '<button aria-label="Delete" class="delete" ng-disabled="' + editor.isBtnDisabled + '" ng-click="' + settingName + '.deleteItem(' + primaryKey + ', $event)" title="Delete">Delete' + '</button>' + '</div>';
                    }
                    return html;
                }

                function getItemByRow(row) {
                    return getDataTableRow(row).data();
                }

                function compileRow(row) {
                    $compile(angular.element(getDataTableRow(row).node()).contents())($scope);
                }

                function getDataTableRow(row) {
                    return getDataTable().row('#' + row);
                }

                function getDataTable() {
                    return getDtInstance().DataTable;
                }

                function getDtInstance() {
                    return editor.dtInstance;
                }

                function getAllData() {
                    var dataInfo = [];
                    var originalData = getDataTable().data();
                    for (var i = 0; i < originalData.length; i++) {
                        if (_typeof(originalData[i]) == 'object') {
                            dataInfo.push(originalData[i]);
                        }
                    }
                    return dataInfo;
                }

                function DatatablesOptionsBuilder(settings) {
                    var options = null;
                    if (settings.Promise) {
                        options = DTOptionsBuilder.fromFnPromise(function () {
                            return settings.Promise().then(function (result) {
                                result = setupHiddenId(result);
                                return result;
                            });
                        });
                    } else {
                        options = DTOptionsBuilder.fromSource(settings.Source).withDataProp(settings.ItemClassName);
                    }

                    // only display table element when used in widget and make table height dynamic
                    // https://www.datatables.net/examples/advanced_init/dom_toolbar.html
                    options.withPaginationType('full_numbers')
                        .withDisplayLength(10)
                        .withOption('rowId', '_id')
                        .withOption('createdRow', function (row, data, dataIndex) {
                            $compile(angular.element(row).contents())($scope);
                        });
                    if (settings.isSendAjax) {
                        return options.withOption('lengthMenu', [5, 10, 25, 50, 100]);
                    } else {
                        return options.withDOM('t').withOption('paging', false);
                    }
                }

                function DatatablesColumnsBuilder(columnSettings) {
                    var columns = [];
                    for (let i = 0; i < columnSettings.length; i++) {
                        let column = columnSettings[i];
                        let columnOption = null;
                        if (angular.isObject(column) && column.hasOwnProperty('class')) {
                            let className = column.class;
                            let actionHtml = eval(className).$instance;
                            columnOption = DTColumnBuilder.newColumn(null, 'Action').notSortable().renderWith(actionHtml);
                        } else {
                            var fieldName = column.name;
                            var fieldTitle = column.title;
                            var fieldEditingType = column.editing;
                            var fieldDisplayCallback = column.display;
                            var notVisible = column.visible === false;
                            var sortable = column.sortable;
                            var withClass = column.withClass;

                            columnOption = DTColumnBuilder.newColumn(fieldName, fieldTitle);
                            columnOption.withOption('name', fieldName);
                            if (notVisible) {
                                columnOption.notVisible();
                            }
                            if (sortable === false) {
                                columnOption.notSortable();
                            }
                            if (withClass) {
                                columnOption.withClass(withClass);
                            }

                            switch (fieldEditingType) {
                                case 'other':
                                    columnOption.renderWith(columnRenderFactory.other(fieldName, fieldTitle, fieldDisplayCallback, column));
                                    break;
                                case 'text':
                                    columnOption.renderWith(columnRenderFactory.text(fieldName, fieldTitle, fieldDisplayCallback, column));
                                    break;
                                case 'select':
                                    var selectOptions = column.select;
                                    columnOption.renderWith(columnRenderFactory.select(fieldName, fieldTitle, fieldDisplayCallback, selectOptions, column));
                                    break;
                                case 'radio':
                                    columnOption.renderWith(columnRenderFactory.radio(fieldName, fieldTitle, fieldDisplayCallback, selectOptions, column));
                                    break;
                                case 'date':
                                    columnOption.renderWith(columnRenderFactory.date(fieldName, fieldTitle, fieldDisplayCallback, column));
                                    break;
                                case 'checkbox':
                                    columnOption.renderWith(columnRenderFactory.checkbox(fieldName, fieldTitle, fieldDisplayCallback, column));
                                    break;
                                case 'action':
                                    columnOption.renderWith(fieldDisplayCallback);
                                    break;
                            }
                        }
                        columns.push(columnOption);
                    }

                    return columns;
                }

                function getDataTitle(data) {
                    return settings.getTitle ? settings.getTitle(data) : data.Title;
                };

                function GetSettingsExtend() {
                    var settingsExtend;
                    settingsExtend = {
                        // Properties
                        getDataTable : function getDataTable() {
                            return editor.dtInstance.DataTable;
                        },
                        selectedIds  : selectedIds,
                        isSelectedAll: isSelectedAll,

                        editingItems    : {}, // Editing items
                        adding          : false, // New item is in editing
                        // Functions
                        /**
                         * Get selected items data
                         **/
                        getSelectedItems: function getSelectedItems() {
                            var ids = settings.getSelectedIds();
                            if (ids.length > 0) {
                                for (var i = 0; i < ids.length; i++) {
                                    ids[i] = "#" + ids[i];
                                }
                                ids = ids.join(',');
                                return editor.dtInstance.DataTable.rows(ids).data();
                            }
                            return [];
                        },

                        getAllRowsData: function getAllRowsData() {
                            settings.adding = false;
                            var dataInfo = [];
                            var originalData = this.getDataTable().data();
                            for (var i = 0; i < originalData.length; i++) {
                                if (_typeof(originalData[i]) == 'object' && originalData[i].isValid) {
                                    dataInfo.push(originalData[i]);
                                }
                            }
                            var primaryKeyName = settings.PrimaryKeyName;
                            dataInfo.forEach(function (item) {
                                if (item.hasOwnProperty(primaryKeyName) && !settings.isSendAjax) {
                                    if (!item[primaryKeyName]) {
                                        item._isNew = true;
                                    }
                                    item[primaryKeyName] = item._id;
                                }
                                if (item.edit) {
                                    item.edit = false;
                                }
                            });
                            return dataInfo;
                        },

                        /**
                         * Get selected items primary keys
                         * @returns {Array}
                         */
                        getSelectedIds  : function getSelectedIds() {
                            var ids = [];
                            for (var id in selectedIds) {
                                if (selectedIds.hasOwnProperty(id)) {
                                    if (selectedIds[id] == true) {
                                        ids.push(id);
                                    }
                                }
                            }
                            return ids;
                        },

                        /**
                         * http://l-lin.github.io/angular-datatables/#/api
                         */
                        changeData      : function changeData(source) {
                            return editor.dtInstance.changeData(source);
                        },
                        /**
                         * http://l-lin.github.io/angular-datatables/#/api
                         */
                        //reloadData: editor.dtInstance.reloadData
                        reloadData      : function reloadData(callback, resetPaging) {
                            settings.clearEditing();
                            settings.adding = false;
                            getDtInstance().reloadData(callback, resetPaging);
                        },
                        /**
                         * Save button clicked
                         * @param row
                         */
                        saveItem        : function saveItem(row) {
                            return editor.saveItem(row);
                        },
                        /**
                         * Cancel the editing
                         * @param row
                         */
                        cancelEdit      : function cancelEdit(row) {
                            return editor.cancelEdit(row);
                        },
                        /**
                         * Edit button clicked
                         * @param row
                         */
                        editItem        : function editItem(row) {
                            return editor.editItem(row);
                        },
                        /**
                         * Trash button clicked
                         * @param row
                         * @param $event
                         */
                        deleteItem      : function deleteItem(row, $event) {
                            return editor.deleteItem(row, $event);
                        },
                        clearEditing    : function clearEditing() {
                            for (var key in editor.editingItems) {
                                var item = editor.editingItems[key];
                                settings.cancelEdit(item._id);
                            }
                        },
                        /**
                         * For button [+Add Item]
                         */
                        addItem         : function addItem() {
                            clearSearch();
                            var emptyItem = {};
                            angular.copy(settings.EmptyItem, emptyItem);
                            emptyItem.edit = true;
                            emptyItem.$errors = {};
                            emptyItem._id = new Date().getTime();
                            editor.editingItems[GetHiddenIdKey(emptyItem._id)] = emptyItem;
                            settings.adding = true;
                            getDataTable().row.add(editor.editingItems[GetHiddenIdKey(emptyItem._id)]).order([0, 'desc']).draw();
                        },
                        draw            : function draw(type) {
                            var table = getDataTable();
                            if (table) {
                                table.draw(type);
                            }
                        },
                        afterInitialized: function afterInitialized(callback) {
                            if (editor.initialized) {
                                callback(editor, settings);
                            } else {
                                editor.afterInitCallbacks.push(callback);
                            }
                        }
                    };
                    return settingsExtend;
                }

                function clearSearch() {
                    getDataTable().search('').draw();
                }

                function prepareSettings(settings) {
                    settings.Columns.unshift({
                        name   : settings.PrimaryKeyName,
                        title  : '_PK_',
                        editing: null,
                        visible: false
                    });
                    settings.Columns.unshift({
                        name   : '_id',
                        title  : '_HPK_',
                        editing: null,
                        visible: false
                    });
                    return settings;
                }
            }
        };
    }]);
