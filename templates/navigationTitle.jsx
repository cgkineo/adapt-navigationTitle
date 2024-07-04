import React from 'react';
import Adapt from 'core/js/adapt';
import device from 'core/js/device';

export default function NavigationTitle(props) {
  const {
    _hideForMobile,
    _useCourseTitle
  } = props;

  const hideForMobile = ( _hideForMobile && !device.isScreenSizeMin('medium') )
    ? false
    : true;

  const title = ( _useCourseTitle )
    ? Adapt.course.get('title')
    : Adapt.course.get('_navigationTitle').title;

  return (
    <>
    {hideForMobile &&
    <div
      className='navigation-title__inner'
      dangerouslySetInnerHTML={{ __html: title }}
      aria-level={!_useCourseTitle ? 1 : null}
      aria-hidden={_useCourseTitle ? true : null}
      role='heading'
    />
    }
    </>

  );
}
