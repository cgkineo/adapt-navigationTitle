import React from 'react';

export default function NavigationTitle(props) {
  const {
    title,
    _useCourseTitle
  } = props;

  return (

    <div
      className='navigation-title__inner'
      dangerouslySetInnerHTML={{ __html: title }}
      aria-level={!_useCourseTitle ? 1 : null}
    />

  );
}
