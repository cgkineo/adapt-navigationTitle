import Adapt from 'core/js/adapt';
import NavigationTitleView from './NavigationTitleView';

class NavigationTitle extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'adapt:initialize', this.onDataReady);
  }

  onDataReady() {
    const config = Adapt.course.get('_navigationTitle');
    if (!config || !config._isEnabled) return;

    this.titleView = new NavigationTitleView({
      model: new Backbone.Model(config)
    });

    // If 'navigation logo' is present in the navigation, insert title after it.
    // Otherwise, insert after 'back' button.
    const $navLogo = $('.navigation-logo');
    const $backBtn = $('.js-nav-back-btn');
    const $insertAfter = $navLogo.length > 0 ? $navLogo : $backBtn;

    this.titleView.$el.insertAfter($insertAfter);
  }
};

export default new NavigationTitle();
