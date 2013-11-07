(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {
  initialize: function() {
    var Router;
    Router = require('router');
    this.router = new Router();
    Backbone.history.start();
    if (typeof Object.freeze === 'function') {
      return Object.freeze(this);
    }
  }
};

});

;require.register("collections/doctype_collection", function(exports, require, module) {
var DoctypeCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DoctypeCollection = (function(_super) {
  __extends(DoctypeCollection, _super);

  function DoctypeCollection() {
    _ref = DoctypeCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeCollection.prototype.model = require('../models/doctype_model');

  DoctypeCollection.prototype.url = 'doctypes';

  return DoctypeCollection;

})(Backbone.Collection);

});

;require.register("collections/result_collection", function(exports, require, module) {
var ResultCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = ResultCollection = (function(_super) {
  __extends(ResultCollection, _super);

  function ResultCollection() {
    _ref = ResultCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultCollection.prototype.model = require('../models/result_model');

  ResultCollection.prototype.url = function() {
    return 'search?page=' + this.page + '&nbperpage=' + this.nbPerPage;
  };

  ResultCollection.prototype.page = 1;

  ResultCollection.prototype.nbPerPage = 10;

  return ResultCollection;

})(Backbone.Collection);

});

;require.register("initialize", function(exports, require, module) {
var app;

app = require('application');

$(function() {
  require('lib/app_helpers');
  return app.initialize();
});

});

;require.register("lib/app_helpers", function(exports, require, module) {
(function() {
  return (function() {
    var console, dummy, method, methods, _results;
    console = window.console = window.console || {};
    method = void 0;
    dummy = function() {};
    methods = 'assert,count,debug,dir,dirxml,error,exception,\
                   group,groupCollapsed,groupEnd,info,log,markTimeline,\
                   profile,profileEnd,time,timeEnd,trace,warn'.split(',');
    _results = [];
    while (method = methods.pop()) {
      _results.push(console[method] = console[method] || dummy);
    }
    return _results;
  })();
})();

(function() {
  return $.fn.spin = function(opts, color) {
    var presets;
    presets = {
      tiny: {
        lines: 8,
        length: 2,
        width: 2,
        radius: 3
      },
      small: {
        lines: 8,
        length: 1,
        width: 2,
        radius: 5
      },
      large: {
        lines: 10,
        length: 8,
        width: 4,
        radius: 8
      }
    };
    if (Spinner) {
      return this.each(function() {
        var $this, spinner;
        $this = $(this);
        spinner = $this.data("spinner");
        if (spinner != null) {
          spinner.stop();
          return $this.data("spinner", null);
        } else if (opts !== false) {
          if (typeof opts === "string") {
            if (opts in presets) {
              opts = presets[opts];
            } else {
              opts = {};
            }
            if (color) {
              opts.color = color;
            }
          }
          spinner = new Spinner($.extend({
            color: $this.css("color")
          }, opts));
          spinner.spin(this);
          return $this.data("spinner", spinner);
        }
      });
    } else {
      console.log("Spinner class not available.");
      return null;
    }
  };
})();

});

;require.register("lib/base_view", function(exports, require, module) {
var BaseView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = BaseView = (function(_super) {
  __extends(BaseView, _super);

  function BaseView() {
    _ref = BaseView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BaseView.prototype.template = function() {};

  BaseView.prototype.initialize = function() {};

  BaseView.prototype.getRenderData = function() {
    var _ref1;
    return {
      model: (_ref1 = this.model) != null ? _ref1.toJSON() : void 0
    };
  };

  BaseView.prototype.render = function() {
    this.beforeRender();
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  };

  BaseView.prototype.beforeRender = function() {};

  BaseView.prototype.afterRender = function() {};

  BaseView.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  return BaseView;

})(Backbone.View);

});

;require.register("lib/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.template = function() {};

  View.prototype.initialize = function() {};

  View.prototype.render = function(templateOptions) {
    var render;
    this.beforeRender();
    render = this.template().call(null, templateOptions);
    this.$el.html(render);
    this.afterRender();
    return this;
  };

  View.prototype.beforeRender = function() {};

  View.prototype.afterRender = function() {};

  View.prototype.destroy = function() {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    return Backbone.View.prototype.remove.call(this);
  };

  return View;

})(Backbone.View);

});

;require.register("lib/view_collection", function(exports, require, module) {
var BaseView, ViewCollection, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('lib/base_view');

module.exports = ViewCollection = (function(_super) {
  __extends(ViewCollection, _super);

  function ViewCollection() {
    this.removeItem = __bind(this.removeItem, this);
    this.addItem = __bind(this.addItem, this);
    _ref = ViewCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ViewCollection.prototype.itemview = null;

  ViewCollection.prototype.views = {};

  ViewCollection.prototype.template = function() {
    return '';
  };

  ViewCollection.prototype.itemViewOptions = function() {};

  ViewCollection.prototype.collectionEl = null;

  ViewCollection.prototype.onChange = function() {
    return this.$el.toggleClass('empty', _.size(this.views) === 0);
  };

  ViewCollection.prototype.appendView = function(view) {
    return this.$collectionEl.append(view.el);
  };

  ViewCollection.prototype.initialize = function() {
    var collectionEl;
    this.count = 0;
    this.deleted = 0;
    ViewCollection.__super__.initialize.apply(this, arguments);
    this.views = {};
    this.listenTo(this.collection, "reset", this.onReset);
    this.listenTo(this.collection, "add", this.addItem);
    this.listenTo(this.collection, "remove", this.removeItem);
    if (this.collectionEl == null) {
      return collectionEl = el;
    }
  };

  ViewCollection.prototype.render = function() {
    var id, view, _ref1;
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      view.$el.detach();
    }
    return ViewCollection.__super__.render.apply(this, arguments);
  };

  ViewCollection.prototype.afterRender = function() {
    var id, view, _ref1;
    this.$collectionEl = $(this.collectionEl);
    this.$collectionEl.empty();
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      this.appendView(view.$el);
    }
    this.onReset(this.collection);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.remove = function() {
    this.onReset([]);
    return ViewCollection.__super__.remove.apply(this, arguments);
  };

  ViewCollection.prototype.onReset = function(newcollection) {
    var id, view, _ref1;
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      view.remove();
    }
    return newcollection.forEach(this.addItem);
  };

  ViewCollection.prototype.addItem = function(model) {
    var options, view;
    this.count++;
    model.set("count", this.count);
    options = _.extend({}, {
      model: model
    }, this.itemViewOptions(model));
    view = new this.itemview(options);
    this.views[model.cid] = view.render();
    this.appendView(view);
    return this.onChange(this.views);
  };

  ViewCollection.prototype.removeItem = function(model) {
    this.deleted++;
    this.views[model.cid].remove();
    delete this.views[model.cid];
    return this.onChange(this.views);
  };

  return ViewCollection;

})(BaseView);

});

;require.register("models/delete_all_model", function(exports, require, module) {
var DoctypeDeleteAllModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DoctypeDeleteAllModel = (function(_super) {
  __extends(DoctypeDeleteAllModel, _super);

  function DoctypeDeleteAllModel() {
    _ref = DoctypeDeleteAllModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeDeleteAllModel.prototype.urlRoot = 'doctype_delete_all';

  return DoctypeDeleteAllModel;

})(Backbone.Model);

});

;require.register("models/doctype_model", function(exports, require, module) {
var DoctypeModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DoctypeModel = (function(_super) {
  __extends(DoctypeModel, _super);

  function DoctypeModel() {
    _ref = DoctypeModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeModel.prototype.rootUrl = "doctypes";

  return DoctypeModel;

})(Backbone.Model);

});

;require.register("models/meta_infos_model", function(exports, require, module) {
var DoctypeMetaInfosModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = DoctypeMetaInfosModel = (function(_super) {
  __extends(DoctypeMetaInfosModel, _super);

  function DoctypeMetaInfosModel() {
    _ref = DoctypeMetaInfosModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeMetaInfosModel.prototype.urlRoot = 'doctype_meta_infos';

  return DoctypeMetaInfosModel;

})(Backbone.Model);

});

;require.register("models/result_model", function(exports, require, module) {
var ResultModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = ResultModel = (function(_super) {
  __extends(ResultModel, _super);

  function ResultModel() {
    _ref = ResultModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultModel.prototype.urlRoot = "search";

  return ResultModel;

})(Backbone.Model);

});

;require.register("router", function(exports, require, module) {
var DoctypeCollectionView, DoctypeNavCollectionView, DoctypesView, ResultCollectionView, Router, SearchView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DoctypesView = require('views/doctypes_view');

DoctypeNavCollectionView = require('views/doctype_nav_collection_view');

DoctypeCollectionView = require('views/doctype_collection_view');

SearchView = require('views/search_view');

ResultCollectionView = require('views/result_collection_view');

module.exports = Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    '': 'search',
    'search': 'search',
    'search/all/:doctype': 'search'
  };

  Router.prototype.initialize = function() {
    var doctypeNavCollectionView;
    doctypeNavCollectionView = new DoctypeNavCollectionView();
    return doctypeNavCollectionView.render();
  };

  Router.prototype.search = function(doctype) {
    var options, searchView;
    options = {};
    if (doctype != null) {
      if (!/\|/.test(decodeURIComponent(doctype))) {
        options['doctype'] = [doctype];
      } else {
        options['doctype'] = decodeURIComponent(doctype).split(/\|/);
      }
      options['range'] = 'all';
    }
    searchView = new SearchView(options);
    return searchView.render();
  };

  return Router;

})(Backbone.Router);

});

;require.register("views/doctype_collection_view", function(exports, require, module) {
var DoctypeCollection, DoctypeCollectionView, DoctypeView, ViewCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

DoctypeCollection = require('../collections/doctype_collection');

DoctypeView = require('./doctype_view');

module.exports = DoctypeCollectionView = (function(_super) {
  __extends(DoctypeCollectionView, _super);

  function DoctypeCollectionView() {
    _ref = DoctypeCollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeCollectionView.prototype.itemview = DoctypeView;

  DoctypeCollectionView.prototype.collection = new DoctypeCollection();

  DoctypeCollectionView.prototype.initialize = function() {
    this.collectionEl = '#doctypes-list';
    DoctypeCollectionView.__super__.initialize.apply(this, arguments);
    this.collection.fetch();
    this.views = {};
    return this.listenTo(this.collection, "reset", this.onReset);
  };

  return DoctypeCollectionView;

})(ViewCollection);

});

;require.register("views/doctype_nav_collection_view", function(exports, require, module) {
var DoctypeCollection, DoctypeNavCollectionView, DoctypeNavView, ViewCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

DoctypeCollection = require('../collections/doctype_collection');

DoctypeNavView = require('./doctype_nav_view');

module.exports = DoctypeNavCollectionView = (function(_super) {
  __extends(DoctypeNavCollectionView, _super);

  function DoctypeNavCollectionView() {
    _ref = DoctypeNavCollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeNavCollectionView.prototype.itemview = DoctypeNavView;

  DoctypeNavCollectionView.prototype.initialize = function() {
    var that;
    that = this;
    this.collection = new DoctypeCollection();
    this.collectionEl = '#doctype-nav-collection-view';
    DoctypeNavCollectionView.__super__.initialize.apply(this, arguments);
    this.collection.fetch({
      data: $.param({
        "menu": true
      }),
      success: function(col, data) {
        return that.setMenuBehavior();
      }
    });
    this.views = {};
    return this.listenTo(this.collection, "reset", this.onReset);
  };

  DoctypeNavCollectionView.prototype.setMenuBehavior = function() {
    return $('#doctype-nav-collection-view a').click(function() {
      var hasSubmenu, openLi, parentLi, parentsLi;
      parentLi = $(this).parent('li');
      hasSubmenu = parentLi.children('.submenu').length > 0;
      openLi = $('#doctype-nav-collection-view li.open');
      parentsLi = $(this).parentsUntil('#doctype-nav-collection-view', 'li');
      if (!hasSubmenu) {
        $('#doctype-nav-collection-view li').removeClass('active');
        parentsLi.addClass('active');
        return parentLi.addClass('active');
      }
    });
  };

  return DoctypeNavCollectionView;

})(ViewCollection);

});

;require.register("views/doctype_nav_view", function(exports, require, module) {
var DoctypeNavView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./../lib/view');

module.exports = DoctypeNavView = (function(_super) {
  __extends(DoctypeNavView, _super);

  function DoctypeNavView() {
    _ref = DoctypeNavView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeNavView.prototype.tagName = 'li';

  DoctypeNavView.prototype.className = 'doctype-list-item';

  DoctypeNavView.prototype.render = function() {
    return DoctypeNavView.__super__.render.call(this, {
      name: this.model.get('name'),
      value: this.model.get('value')
    });
  };

  DoctypeNavView.prototype.template = function() {
    return require('./templates/doctype_nav');
  };

  return DoctypeNavView;

})(View);

});

;require.register("views/doctype_view", function(exports, require, module) {
var DoctypeView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./../lib/view');

module.exports = DoctypeView = (function(_super) {
  __extends(DoctypeView, _super);

  function DoctypeView() {
    _ref = DoctypeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypeView.prototype.tagName = 'tr';

  DoctypeView.prototype.className = 'doctype-list-item';

  DoctypeView.prototype.render = function() {
    return DoctypeView.__super__.render.call(this, {
      name: this.model.get("name"),
      metadoctype: this.model.get("metadoctype"),
      sum: this.model.get("sum"),
      app: this.model.get("app")
    });
  };

  DoctypeView.prototype.template = function() {
    return require('./templates/doctype');
  };

  DoctypeView.prototype.events = {
    'click .more-info': 'showDescription'
  };

  DoctypeView.prototype.showDescription = function(e) {
    var descWrapper, jqObj, newTd, newTr;
    jqObj = $(e.currentTarget);
    if (jqObj.hasClass('label-primary')) {
      descWrapper = jqObj.parent().children('.md-desc-wrapper');
      newTd = $(document.createElement('td')).attr('colspan', '3');
      newTr = $(document.createElement('tr')).addClass('bg-gray');
      descWrapper.appendTo(newTd).show();
      newTd.appendTo(newTr);
      jqObj.closest("." + this.className).after(newTr);
      jqObj.removeClass('label-primary').addClass('label-danger').empty();
      return jqObj.append(' Hide info <i class="icon-minus-sign"></i> ');
    } else {
      descWrapper = jqObj.closest("." + this.className).next("tr").find('.md-desc-wrapper').hide();
      jqObj.parent().append(descWrapper);
      jqObj.closest("." + this.className).next("tr").remove();
      jqObj.removeClass('label-danger').addClass('label-primary').empty();
      return jqObj.append(' More info <i class="icon-plus-sign"></i> ');
    }
  };

  return DoctypeView;

})(View);

});

;require.register("views/doctypes_view", function(exports, require, module) {
var BaseView, DoctypesView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

module.exports = DoctypesView = (function(_super) {
  __extends(DoctypesView, _super);

  function DoctypesView() {
    _ref = DoctypesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DoctypesView.prototype.el = '#content';

  DoctypesView.prototype.template = require('./templates/doctypes');

  return DoctypesView;

})(BaseView);

});

;require.register("views/result_collection_view", function(exports, require, module) {
var ResultCollection, ResultCollectionView, ResultView, ViewCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ViewCollection = require('../lib/view_collection');

ResultCollection = require('../collections/result_collection');

ResultView = require('./result_view');

module.exports = ResultCollectionView = (function(_super) {
  __extends(ResultCollectionView, _super);

  function ResultCollectionView() {
    _ref = ResultCollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultCollectionView.prototype.itemview = ResultView;

  ResultCollectionView.prototype.collectionEl = '#basic-accordion';

  ResultCollectionView.prototype.isLoading = false;

  ResultCollectionView.prototype.noMoreItems = false;

  ResultCollectionView.prototype.initialize = function(options) {
    var that;
    this.options = options;
    that = this;
    this.collection = new ResultCollection();
    ResultCollectionView.__super__.initialize.apply(this, arguments);
    if (this.options.doctype != null) {
      return this.collection.fetch({
        data: $.param(this.options),
        success: function(col, data) {
          $('.loading-image').remove();
          if ((that.options.range != null) && (that.options.doctype != null)) {
            if (data.length === that.collection.nbPerPage) {
              that.loopFirstScroll();
              return $('.load-more-result').show();
            } else {
              that.noMoreItems = true;
              return $('.load-more-result').hide();
            }
          }
        },
        error: function() {
          $('.loading-image').remove();
          that.noMoreItems = true;
          return that.displayLoadingError();
        }
      });
    }
  };

  ResultCollectionView.prototype.render = function() {
    var id, loader, view, _ref1;
    if ((this.options != null) && (this.options.doctype != null)) {
      loader = '<div class="loading-image">';
      loader += '<img src="images/ajax-loader.gif" />';
      loader += '</div>';
      $('#all-result').append(loader);
    }
    _ref1 = this.views;
    for (id in _ref1) {
      view = _ref1[id];
      view.$el.detach();
    }
    return ResultCollectionView.__super__.render.apply(this, arguments);
  };

  ResultCollectionView.prototype.search = function(content) {
    var that;
    that = this;
    this.options['query'] = content;
    return this.collection.fetch({
      data: $.param(this.options)
    });
  };

  ResultCollectionView.prototype.loadNextPage = function(isTriggered, callback) {
    var that;
    that = this;
    this.options['deleted'] = this.deleted;
    if (!this.noMoreItems) {
      this.isLoading = true;
      this.collection.page++;
      if (!isTriggered) {
        $('.load-more-result i, .load-more-result span').hide();
        $('.load-more-result').spin('tiny');
      }
      return this.collection.fetch({
        data: $.param(this.options),
        remove: false,
        success: function(col, data) {
          var isDone;
          if (data.length != null) {
            if (!isTriggered) {
              $('.load-more-result .spinner').hide();
              $('.load-more-result i').show();
              $('.load-more-result span').show();
            }
            isDone = data.length < that.collection.nbPerPage;
            that.noMoreItems = isDone;
            if (that.noMoreItems) {
              $('.load-more-result').hide();
            }
            that.isLoading = false;
            if (callback != null) {
              return callback();
            }
          } else {
            return that.noMoreItems = true;
          }
        },
        error: function() {
          that.noMoreItems = true;
          return that.displayLoadingError();
        }
      });
    }
  };

  ResultCollectionView.prototype.loopFirstScroll = function() {
    var firstScroll, that;
    that = this;
    if (!this.isLoading && !this.noMoreItems) {
      firstScroll = $(document).height() === $(window).height();
      if (firstScroll) {
        return this.loadNextPage(true, function() {
          return that.loopFirstScroll();
        });
      }
    }
  };

  ResultCollectionView.prototype.displayLoadingError = function() {
    var errorMsg;
    $('.load-more-result').css({
      'color': '#AF4434'
    });
    $('.load-more-result i').hide();
    errorMsg = 'An error occurs during the loading process';
    $('.load-more-result span').text(errorMsg);
    return $('.load-more-result').show();
  };

  return ResultCollectionView;

})(ViewCollection);

});

;require.register("views/result_view", function(exports, require, module) {
var ResultView, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./../lib/view');

module.exports = ResultView = (function(_super) {
  __extends(ResultView, _super);

  function ResultView() {
    this.render = __bind(this.render, this);
    _ref = ResultView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultView.prototype.tagName = 'div';

  ResultView.prototype.className = 'panel panel-default';

  ResultView.prototype.templateModal = require('./templates/modal_confirm');

  ResultView.prototype.events = {
    'click .accordion-toggle': 'blurIt',
    'mouseenter .label': 'showFieldDescription',
    'mouseleave .label': 'showFieldDescription',
    'click .remove-result': 'confirmRemoveResult',
    'mouseover .remove-result': 'convertButtonToDanger',
    'mouseout .remove-result': 'convertButtonToClassic'
  };

  ResultView.prototype.convertButtonToDanger = function(event) {
    var jqObj;
    jqObj = $(event.currentTarget);
    return jqObj.addClass('btn-danger');
  };

  ResultView.prototype.convertButtonToClassic = function(event) {
    var jqObj;
    jqObj = $(event.currentTarget);
    return jqObj.removeClass('btn-danger');
  };

  ResultView.prototype.render = function() {
    return ResultView.__super__.render.call(this, {
      results: this.manageResultsForView()
    });
  };

  ResultView.prototype.manageResultsForView = function() {
    var attr, count, results;
    attr = this.model.attributes;
    count = this.model.get('count');
    results = {};
    if (attr.no_result != null) {
      $('#all-result .accordion').empty();
      results['no_result'] = true;
      results['no_result_msg'] = attr.no_result;
      return results;
    } else if (count === 0) {
      results['no_result'] = true;
      results['no_result_msg'] = 'No results.';
      return results;
    } else {
      results['no_result'] = false;
      results['count'] = count;
      results['heading'] = {
        'doctype': attr.docType,
        'field': attr.idField != null ? attr.idField : 'id',
        'data': attr.idField != null ? attr[attr.idField] : attr._id
      };
      results['fields'] = this.prepareResultFields(attr);
      return results;
    }
  };

  ResultView.prototype.prepareResultFields = function(attr) {
    var description, field, fieldName, fields, iCounter, isNativField, isSimpleObj, isSimpleType, newLi, obj, objName, settedField, simpleTypes, typeOfField, typeOfObj;
    iCounter = 0;
    fields = [];
    settedField = ['idField', 'count', 'descField'];
    simpleTypes = ['string', 'number', 'boolean'];
    for (fieldName in attr) {
      field = attr[fieldName];
      description = "";
      isNativField = ($.inArray(fieldName, settedField)) === -1;
      if (isNativField) {
        fields[iCounter] = {
          'cdbFieldDescription': "",
          'cdbFieldName': fieldName,
          'cdbFieldData': "",
          'cdbLabelClass': "label-secondary"
        };
        if ((attr.descField != null) && (attr.descField[fieldName] != null)) {
          if (attr.descField[fieldName].description != null) {
            description = attr.descField[fieldName].description;
            fields[iCounter]['cdbFieldDescription'] = description;
          }
        }
        typeOfField = typeof field;
        isSimpleType = ($.inArray(typeOfField, simpleTypes)) !== -1;
        if (isSimpleType) {
          fields[iCounter]['cdbFieldData'] = field;
        } else if ((field != null) && typeOfField === 'object') {
          fields[iCounter]['cdbFieldData'] = '<ul class="sober-list">';
          for (objName in field) {
            obj = field[objName];
            newLi = '';
            typeOfObj = typeof obj;
            isSimpleObj = ($.inArray(typeOfObj, simpleTypes)) !== -1;
            if (isSimpleObj) {
              newLi = '<li>' + objName + ' : ';
              newLi += '<i>' + obj + '</i></li>';
              fields[iCounter]['cdbFieldData'] += newLi;
            } else if ((obj != null) && typeof obj === 'object') {
              newLi = '<li>' + objName + ' : ';
              newLi += '<i>' + JSON.stringify(obj) + '</i></li>';
              fields[iCounter]['cdbFieldData'] += newLi;
            } else {
              newLi = '<li><i>empty</i></li>';
              fields[iCounter]['cdbFieldData'] += newLi;
              fields[iCounter]['cdbLabelClass'] = 'label-danger';
            }
          }
          fields[iCounter]['cdbFieldData'] += '</ul>';
        } else {
          fields[iCounter]['cdbFieldData'] = '<i>empty</i>';
          fields[iCounter]['cdbLabelClass'] = 'label-danger';
        }
      }
      iCounter++;
    }
    return fields;
  };

  ResultView.prototype.template = function() {
    return require('./templates/result');
  };

  ResultView.prototype.blurIt = function(e) {
    return $(e.currentTarget).blur();
  };

  ResultView.prototype.showFieldDescription = function(e) {
    var accordionOffsetLeft, accordionOffsetTop, infoBoxCss, jqObj, left, offsetLeft, offsetTop, title, top, width;
    jqObj = $(e.currentTarget);
    if (jqObj.attr("data-title") !== "") {
      if (e.type === 'mouseenter') {
        offsetLeft = jqObj.offset().left;
        offsetTop = jqObj.offset().top;
        accordionOffsetLeft = $('#basic-accordion.accordion').offset().left;
        accordionOffsetTop = $('#basic-accordion.accordion').offset().top;
        left = offsetLeft - accordionOffsetLeft - 5;
        top = offsetTop - accordionOffsetTop - 7;
        width = jqObj.width();
        $('.info-box .field-title').css({
          'padding-left': width + 18
        });
        title = jqObj.attr("data-title");
        $('.info-box .field-description').empty().html(title);
        infoBoxCss = {
          'z-index': '5',
          'left': left,
          'top': top
        };
        $('.info-box').css(infoBoxCss);
        $('.accordion .label').css({
          'z-index': 'inherit'
        });
        jqObj.css({
          'z-index': '10'
        });
        return $('.info-box').stop().fadeTo(200, 1);
      } else {
        return $('.info-box').stop().fadeTo(200, 0);
      }
    }
  };

  ResultView.prototype.confirmRemoveResult = function(e) {
    var data, message, that;
    that = this;
    e.preventDefault();
    message = 'Are you sure ? This can\'t be undone, ';
    message += 'and will erase definitly the data from the database.';
    data = {
      title: 'Confirmation required',
      body: message,
      confirm: 'delete permanently'
    };
    $("body").prepend(this.templateModal(data));
    $("#confirmation-dialog").modal();
    $("#confirmation-dialog").modal("show");
    $("#confirmation-dialog-confirm").unbind('click');
    return $("#confirmation-dialog-confirm").bind("click", function() {
      return that.removeResult();
    });
  };

  ResultView.prototype.removeResult = function() {
    this.model.set('id', this.model.get('_id'));
    this.model.destroy({
      data: 'id=' + this.model.get('id')
    });
    return $(window).resize();
  };

  return ResultView;

})(View);

});

;require.register("views/results_global_controls_view", function(exports, require, module) {
var DeleteAllModel, ResultsGlobalControlsView, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./../lib/view');

DeleteAllModel = require('./../models/delete_all_model');

module.exports = ResultsGlobalControlsView = (function(_super) {
  __extends(ResultsGlobalControlsView, _super);

  function ResultsGlobalControlsView() {
    this.render = __bind(this.render, this);
    _ref = ResultsGlobalControlsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultsGlobalControlsView.prototype.el = '#results-global-controls';

  ResultsGlobalControlsView.prototype.currentDoctype = '';

  ResultsGlobalControlsView.prototype.templateModal = require('./templates/modal_confirm');

  ResultsGlobalControlsView.prototype.events = {
    'mouseover #delete-all': 'convertButtonToDanger',
    'mouseout #delete-all': 'convertButtonToClassic',
    'click #delete-all': 'confirmDeleteAll'
  };

  ResultsGlobalControlsView.prototype.convertButtonToDanger = function(event) {
    var jqObj;
    jqObj = $(event.currentTarget);
    jqObj.addClass('btn-danger');
    return jqObj.children('span').text('Delete all ');
  };

  ResultsGlobalControlsView.prototype.convertButtonToClassic = function(event) {
    var jqObj;
    jqObj = $(event.currentTarget);
    jqObj.removeClass('btn-danger');
    return jqObj.children('span').empty();
  };

  ResultsGlobalControlsView.prototype.template = function() {
    return require('./templates/results_global_controls');
  };

  ResultsGlobalControlsView.prototype.initialize = function(opt) {
    $(this.el).undelegate('#delete-all', 'click');
    if (opt.doctype != null) {
      this.currentDoctype = opt.doctype[0] || '';
    }
    return this.render(opt);
  };

  ResultsGlobalControlsView.prototype.render = function(opt) {
    var templateData;
    templateData = {};
    templateData['range'] = opt.range ? '(' + opt.range + ')' || '' : void 0;
    templateData['doctype'] = opt.doctype ? opt.doctype[0] : '';
    return ResultsGlobalControlsView.__super__.render.call(this, templateData);
  };

  ResultsGlobalControlsView.prototype.confirmDeleteAll = function(e) {
    var data, message,
      _this = this;
    e.preventDefault();
    message = 'Are you sure ? This can\'t be undone, ';
    message += 'and will erase definitly data from the database.';
    data = {
      title: 'Confirmation required',
      body: message,
      confirm: 'delete permanently'
    };
    $("body").prepend(this.templateModal(data));
    $("#confirmation-dialog").modal();
    $("#confirmation-dialog").modal("show");
    $("#confirmation-dialog-confirm").unbind('click');
    return $("#confirmation-dialog-confirm").bind("click", function() {
      return _this.deleteAll();
    });
  };

  ResultsGlobalControlsView.prototype.deleteAll = function() {
    var deleteAllModel;
    if ((this.currentDoctype != null) && this.currentDoctype !== '') {
      deleteAllModel = new DeleteAllModel();
      return deleteAllModel.fetch({
        data: $.param({
          doctype: this.currentDoctype
        }),
        success: function(col, data) {
          return location.reload();
        }
      });
    }
  };

  return ResultsGlobalControlsView;

})(View);

});

;require.register("views/results_meta_infos_view", function(exports, require, module) {
var ResultsMetaInfosView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./../lib/view');

module.exports = ResultsMetaInfosView = (function(_super) {
  __extends(ResultsMetaInfosView, _super);

  function ResultsMetaInfosView() {
    _ref = ResultsMetaInfosView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ResultsMetaInfosView.prototype.el = '#results-meta-infos';

  ResultsMetaInfosView.prototype.template = function() {
    return require('./templates/results_meta_infos');
  };

  return ResultsMetaInfosView;

})(View);

});

;require.register("views/search_view", function(exports, require, module) {
var BaseView, MetaInfosModel, ResultCollectionView, ResultsGlobalControlsView, ResultsMetaInfosView, SearchView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseView = require('../lib/base_view');

ResultCollectionView = require('../views/result_collection_view');

ResultsGlobalControlsView = require('../views/results_global_controls_view');

MetaInfosModel = require('./../models/meta_infos_model');

ResultsMetaInfosView = require('../views/results_meta_infos_view');

module.exports = SearchView = (function(_super) {
  __extends(SearchView, _super);

  function SearchView() {
    _ref = SearchView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SearchView.prototype.el = '#results-list';

  SearchView.prototype.template = require('./templates/search');

  SearchView.prototype.hasDoctype = false;

  SearchView.prototype.initialize = function(options) {
    var metaInfosModel,
      _this = this;
    this.options = options;
    this.resultsGlobalControlsView = new ResultsGlobalControlsView(this.options);
    if (this.options.doctype && this.options.doctype.length > 0) {
      metaInfosModel = new MetaInfosModel();
      $('#results-meta-infos').empty();
      this.hasDoctype = true;
      metaInfosModel.fetch({
        data: $.param({
          doctype: this.options.doctype[0]
        }),
        success: function(col, data) {
          var resultsMetaInfosView;
          if (data && data.name && (data.application || data.metadoctype)) {
            resultsMetaInfosView = new ResultsMetaInfosView();
            return resultsMetaInfosView.render(data);
          }
        }
      });
      this.resultCollectionView = new ResultCollectionView(this.options);
      if (this.options.range != null) {
        return $(window).bind('scroll', function(e, isTriggered) {
          var docHeight;
          if (!_this.resultCollectionView.isLoading && !_this.resultCollectionView.noMoreItems) {
            docHeight = $(document).height();
            if ($(window).scrollTop() + $(window).height() === docHeight) {
              return _this.loadMore(isTriggered);
            }
          }
        });
      }
    } else {
      return this.hasDoctype = false;
    }
  };

  SearchView.prototype.afterRender = function() {
    var _this = this;
    if (this.hasDoctype) {
      this.resultCollectionView.render();
      return $(window).bind('resize', function() {
        $('#btn-scroll-up').show();
        return _this.resultCollectionView.loopFirstScroll();
      });
    }
  };

  SearchView.prototype.loadMore = function(isTriggered) {
    return this.resultCollectionView.loadNextPage(isTriggered);
  };

  SearchView.prototype.events = {
    'click #launch-search': 'launchSearch'
  };

  return SearchView;

})(BaseView);

});

;require.register("views/templates/doctype", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<td class="full firstLetterUp"><a');
buf.push(attrs({ 'href':('#search/all/' + (name) + '') }, {"href":true}));
buf.push('>' + escape((interp = name) == null ? '' : interp) + '</a></td><td>');
 if (typeof(sum) === 'number'){
{
buf.push('<span>' + escape((interp = sum) == null ? '' : interp) + '</span>');
}
 }
buf.push('</td><td>');
 if (typeof(metadoctype) === 'object' || app.length > 0){
{
buf.push('<span class="label label-primary more-info">More info&nbsp;<i class="icon-plus-sign"></i></span><div class="md-desc-wrapper"><h5><i class="icon-question-sign"></i>&nbsp;&nbsp;About ' + escape((interp = name) == null ? '' : interp) + '</h5>');
 if (app.length > 0) {
{
buf.push('<div class="md-desc-container"><strong>Applications using it :</strong><ul class="sober-list">');
 for (var index in app) {
{
buf.push('<li class="firstLetterUp"><i class="icon-download-alt"></i><span>' + escape((interp = app[index]) == null ? '' : interp) + '</span></li>');
}
 }
buf.push('</ul></div>');
}
}
 if (typeof(metadoctype) === 'object') {
{
buf.push('<div class="md-desc-container"><strong>Fields informations :</strong><ul class="sober-list">');
 var fields = metadoctype.fields;
 for (var obj in fields) {
{
buf.push('<li><i class="icon-tag"></i><span>' + escape((interp = fields[obj].displayName) == null ? '' : interp) + ' -&nbsp;<i>' + escape((interp = fields[obj].description) == null ? '' : interp) + '</i></span></li>');
}
 }
buf.push('</ul></div>');
}
 }
buf.push('</div>');
}
 }
 else {
{
buf.push('<i>No information available</i>');
}
 }
buf.push('</td>');
}
return buf.join("");
};
});

;require.register("views/templates/doctype_nav", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 if (value.length) {
{
buf.push('<a href="#" class="dropdown-toggle"><span class="menu-text">' + escape((interp = name) == null ? '' : interp) + '</span><b class="arrow icon-angle-down"></b></a><ul class="submenu">');
 for (var index in value) {
{
 if (typeof(value[index]) === "string") {
{
buf.push('<li><a');
buf.push(attrs({ 'href':('#search/all/' + (value[index]) + '') }, {"href":true}));
buf.push('><i class="icon-double-angle-right"></i>' + escape((interp = value[index]) == null ? '' : interp) + '</a></li>');
}
 }
 else {
{
buf.push('<li><a href="#" class="dropdown-toggle"><i class="icon-double-angle-right"></i><span class="menu-text">' + escape((interp = value[index].key) == null ? '' : interp) + '</span><b class="arrow icon-angle-down"></b></a><ul class="submenu">');
 subValues = value[index].value
 for (var subIndex in subValues) {
{
buf.push('<li><a');
buf.push(attrs({ 'href':('#search/all/' + (subValues[subIndex]) + '') }, {"href":true}));
buf.push('>' + escape((interp = subValues[subIndex]) == null ? '' : interp) + '</a></li>');
}
 }
buf.push('</ul></li>');
}
}
}
 }
buf.push('</ul>');
}
 }
 else {
{
buf.push('<a');
buf.push(attrs({ 'href':('#search/all/' + (name) + '') }, {"href":true}));
buf.push('>' + escape((interp = name) == null ? '' : interp) + '</a>');
}
}
}
return buf.join("");
};
});

;require.register("views/templates/doctypes", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="current-title"> <h1>Doctypes</h1></div><div class="row"><div class="col-xs-12"><div class="table-responsive"><div id="doctypes-container"><table class="table table-striped table-bordered table-hover"><thead><th>Name</th><th>Number of documents</th><th>About that doctype</th></thead><tbody id="doctypes-list"></tbody></table></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("views/templates/modal_confirm", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="confirmation-dialog" class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" data-dismiss="modal" aria-hidden="true" class="close">x</button><h4 class="modal-title">' + escape((interp = title) == null ? '' : interp) + '</h4></div><div class="modal-body"><p>' + escape((interp = body) == null ? '' : interp) + '</p></div><div class="modal-footer"><span data-dismiss="modal" class="btn btn-link">cancel</span><span id="confirmation-dialog-confirm" data-dismiss="modal" class="btn btn-cozy">' + escape((interp = confirm) == null ? '' : interp) + '</span></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("views/templates/result", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 if (results['no_result']) {
{
buf.push('<em>' + escape((interp = results['no_result_msg']) == null ? '' : interp) + '</em>');
}
 }
 else {
{
buf.push('<div class="panel-heading"><h4 class="panel-title"><a');
buf.push(attrs({ 'data-toggle':("collapse"), 'data-parent':("#basic-accordion"), 'href':("#collapse" + (results.count) + ""), "class": ('accordion-toggle') }, {"data-toggle":true,"data-parent":true,"href":true}));
buf.push('><i class="icon-plus-sign"></i><strong>&nbsp;' + escape((interp = results.heading.doctype) == null ? '' : interp) + '</strong>&nbsp;' + escape((interp = results.heading.field) == null ? '' : interp) + ' :\n&nbsp;' + escape((interp = results.heading.data) == null ? '' : interp) + '</a><div class="visible-md visible-lg hidden-sm hidden-xs btn-group result-buttons"><button class="btn btn-xs remove-result"><i class="icon-trash bigger-120"></i></button></div></h4></div><div');
buf.push(attrs({ 'style':("height: 0px;"), 'id':("collapse" + (results.count) + ""), "class": ('panel-collapse') + ' ' + ('collapse') }, {"style":true,"id":true}));
buf.push('><div class="panel-body"><div id="result-list" class="profile-user-info profile-user-info-striped">');
 for (var iCount = 0; iCount < results['fields'].length; iCount++) {
{
buf.push('<div class="profile-info-row"><div class="profile-info-name">' + escape((interp = results['fields'][iCount].cdbFieldName) == null ? '' : interp) + '</div><div class="profile-info-value">');
var __val__ = results['fields'][iCount].cdbFieldData
buf.push(null == __val__ ? "" : __val__);
buf.push('</div></div>');
}
 }
buf.push('</div></div></div>');
}
 }
}
return buf.join("");
};
});

;require.register("views/templates/results_global_controls", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
 if (doctype !== '') {
{
buf.push('<h4>&nbsp;&nbsp;Currently exploring :&nbsp;<em>' + escape((interp = doctype) == null ? '' : interp) + ' ' + escape((interp = range) == null ? '' : interp) + '</em></h4><div class="visible-md visible-lg hidden-sm hidden-xs btn-group result-buttons"><button id="delete-all" class="btn btn-xs"><span></span><i class="icon-trash bigger-120"></i></button></div>');
}
}
}
return buf.join("");
};
});

;require.register("views/templates/results_meta_infos", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="widget-box"><div class="widget-header widget-header-small header-color-green"><h4 class="lighter"><i class="icon-question-sign"></i>&nbsp;About ' + escape((interp = name) == null ? '' : interp) + '</h4><div class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a><a href="#" data-action="close"><i class="icon-remove"></i></a></div></div><div class="widget-body"><div class="widget-body-inner"><div class="widget-main padding-6"><div class="md-desc-wrapper">');
 if (applications && applications.length > 0) {
{
buf.push('<div class="md-desc-container"><strong>Applications using it :</strong><ul class="sober-list">');
 for (var index in applications) {
{
buf.push('<li class="firstLetterUp"><i class="icon-download-alt"></i><span>&nbsp;' + escape((interp = applications[index]) == null ? '' : interp) + '</span></li>');
}
 }
buf.push('</ul></div>');
}
}
 if (typeof(metadoctype) === 'object') {
{
buf.push('<div class="md-desc-container"><strong>Fields informations :</strong><ul class="sober-list">');
 var fields = metadoctype.fields;
 for (var obj in fields) {
{
buf.push('<li><i class="icon-tag"></i><span>&nbsp;' + escape((interp = fields[obj].displayName) == null ? '' : interp) + ' -&nbsp;<i>' + escape((interp = fields[obj].description) == null ? '' : interp) + '</i></span></li>');
}
 }
buf.push('</ul></div>');
}
 }
buf.push('</div></div><div class="clear"></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("views/templates/search", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="all-result"><div id="basic-accordion" class="accordion-style1 panel-group"></div><div class="load-more-result"><span>load more results&nbsp</span><br/><i class="icon-circle-arrow-down"></i></div></div>');
}
return buf.join("");
};
});

;
//@ sourceMappingURL=app.js.map