class ActionColumn {
  static $instance(data, type, full, meta) {
      var html;
      var primaryKey = full['_id'];
      if (full.edit) {
        html = '<div class="actionButtons">'
          + '<button aria-label="Save" class="save" ng-click="editor.saveItem(' + primaryKey + ')" title="Save">Save</button>'
          + '<button aria-label="Cancel" ng-click="editor.cancelEdit(' + primaryKey + ')" title="Cancel">Cancal</button>'
          + '</div>';
      } else {
        html = '<div class="actionButtons">'
          + '<button aria-label="Edit" ng-click="editor.editItem(' + primaryKey + ')" title="Edit">Edit</button>'
          + '<button aria-label="Delete" class="delete"  ng-click="editor.deleteItem(' + primaryKey + ', $event)" title="Delete">Delete' + '</button>'
          + '</div>';
      }
      return html;
  }
}
