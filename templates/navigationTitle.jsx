import React from 'react';

export default function NavigationTitle(props) {
  const {
    title
  } = props;

  return (

    <div className='navigation-title__inner'>
      {title}
    </div>

  );
}
