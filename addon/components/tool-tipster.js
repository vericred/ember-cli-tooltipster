import Ember from 'ember';

export default Ember.Component.extend({

    classNameBindings: ['tooltip'],

    checkForDestroyed: function (callback) {
      if (this.get('isDestroying') || this.get('isDestroyed')) {
        return;
      }
      callback.call(this);
    },

    attributeBindings: ['title'],

    updateTitle: Ember.observer('title', function() {
      Ember.run.schedule('afterRender', this, function() {
        this.checkForDestroyed(function () {
          this.$().tooltipster('content', this.get('title'));
        });
      });
    }),

    updateContent: Ember.observer('content', function(){
      Ember.run.schedule('afterRender', this, function() {
        this.checkForDestroyed(function () {
          this.$().tooltipster('content', this.get('content'));
        });
      });
    }),

    /**
     * Set how tooltips should be activated and closed.
     * Default: 'hover'
     * Options: [hover, click]
     * @type {String}
     */
    triggerEvent: 'hover',

    tooltipsterOptions: ['animation', 'arrow', 'arrowColor', 'content', 'contentAsHTML', 'contentCloning', 'debug', 'delay', 'interactive',
        'minWidth', 'maxWidth', 'offsetX', 'offsetY', 'position', 'positionTracker', 'speed', 'timer', 'theme',
        'updateAnimation'
    ],

    _initializeTooltipster: Ember.on('didInsertElement', function() {
        var _this = this;
        var options = {};

        _this.get('tooltipsterOptions').forEach(function(item) {
            if (!Ember.isEmpty(_this.get(item))) {
                options[item] = _this.get(item);
            }
        });

        options.trigger = _this.get('triggerEvent');
        options.functionInit = Ember.$.proxy(this.functionInit, this);
        options.functionBefore = Ember.$.proxy(this.functionBefore, this);
        options.functionReady = Ember.$.proxy(this.functionReady, this);
        options.functionAfter = Ember.$.proxy(this.functionAfter, this);
        options.positionTrackerCallback = Ember.$.proxy(this.positionTrackerCallback, this);

        this.$().tooltipster(options);

    }),

    _destroyTooltipster: Ember.on('willDestroyElement', function() {
        this.$().tooltipster('destroy');
    }),
    /**
    * Send action ´open´ when open info
    *
    * @method functionBefore
    **/
    functionReady: function(origin, tooltip) {
        this.sendAction('open', tooltip);
    },

    /**
    * Send action close when close info
    *
    * @method functionBefore
    **/
    functionAfter: function(/*origin*/) {
        this.sendAction('close');
    }
});
