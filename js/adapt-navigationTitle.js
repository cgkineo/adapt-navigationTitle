import Adapt from 'core/js/adapt';
import NavigationTitleView from './NavigationTitleView';

class NavigationTitle extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, {
      'menuView:postRender pageView:postRender': this.onPostRender
    });
  }

  static get courseConfig() {
    return Adapt.course.get('_navigationTitle');
  }

  onPostRender(view) {
    if (this.titleView) this.titleView.remove();

    const config = view.model.get('_navigationTitle');
    if (
      (!NavigationTitle.courseConfig || !NavigationTitle.courseConfig._isEnabled) ||
      (config && (!config._isEnabled || config._isHiddenOnMenu))
    ) return;

    const model = new Backbone.Model(config);
    this.titleView = new NavigationTitleView({ model });

    // If 'navigation logo' is present in the navigation, insert title after it.
    // Otherwise, insert after 'back' button.
    const $navLogo = $('.navigation-logo');
    const $backBtn = $('.js-nav-back-btn');
    const $insertAfter = $navLogo.length > 0 ? $navLogo : $backBtn;

    this.titleView.$el.insertAfter($insertAfter);
  }
};

export default new NavigationTitle();
