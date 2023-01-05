import Adapt from 'core/js/adapt';
import device from 'core/js/device';
import React from 'react';
import ReactDOM from 'react-dom';
import { templates } from 'core/js/reactHelpers';

class NavigationTitleView extends Backbone.View {
  className() {
    return 'navigation-title';
  }

  attributes() {
    return {
      'data-order': (Adapt.course.get('_globals')?._extensions?._navigationTitle?._navOrder || 0)
    };
  }

  initialize() {
    this.listenTo(Adapt, 'device:changed', this.changed);
    this.setTitle();
    this.render();
  }

  render() {
    this.changed();
  }

  changed() {
    this.setIsDeviceSmall();
    this.hideForMobile();

    ReactDOM.render(<templates.navigationTitle {...this.model.toJSON()} />, this.el);
  }

  setTitle() {
    if (!this.model.get('_useCourseTitle')) return;

    // Use course title from course.json
    this.model.set('title', Adapt.course.get('title'));
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  hideForMobile() {
    const _isDeviceSmall = this.model.get('_isDeviceSmall');
    const _hideForMobile = this.model.get('_hideForMobile');

    if (_isDeviceSmall && _hideForMobile) {
      this.$el.addClass('u-display-none');
    } else {
      this.$el.removeClass('u-display-none');
    }
  }
}

export default NavigationTitleView;
