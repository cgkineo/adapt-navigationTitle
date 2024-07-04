import Adapt from 'core/js/adapt';
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
    this.listenTo(Adapt, 'device:changed', this.render);
    this.render();
  }

  render() {
    ReactDOM.render(<templates.navigationTitle {...NavigationTitleView.courseConfig} />, this.el);
  }
}

export default NavigationTitleView;
