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
    this.render();
  }

  render() {
    this.changed();
  }

  changed() {
    this.setIsDeviceSmall();
    this.setTitle();
    this.hideForMobile();

    ReactDOM.render(<templates.navigationTitle {...this.model.toJSON()} />, this.el);
  }

  setIsDeviceSmall() {
    this.model.set('_isDeviceSmall', device.screenSize === 'small');
  }

  setTitle() {
    // Course config
    const courseConfig = Adapt.course.get('_navigationTitle');

    if (!courseConfig?._useCourseTitle) {
      this.model.set('title', courseConfig.title);
    } else {
      // Use course title from course.json
      this.model.set('title', Adapt.course.get('title'));

      // The course title is already announced on course load as site <title>.
      // Hide from screenreaders to avoid repetition.
      this.$el.attr('aria-hidden', 'true');
    }
  }

  hideForMobile() {
    const _isDeviceSmall = this.model.get('_isDeviceSmall');

    const courseConfig = Adapt.course.get('_navigationTitle');
    const _hideForMobile = courseConfig._hideForMobile;

    if (_isDeviceSmall && _hideForMobile) {
      this.$el.addClass('u-display-none');
    } else {
      this.$el.removeClass('u-display-none');
    }
  }
}

export default NavigationTitleView;
