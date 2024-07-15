import React from 'react';
import device from 'core/js/device';

export default function NavigationTitle(props) {
  const {
    _hideForMobile,
    _useCourseTitle,
    title
  } = props;

  const isVisible = !(_hideForMobile && !device.isScreenSizeMin('medium'));

  return (
    <>
      {isVisible &&
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
