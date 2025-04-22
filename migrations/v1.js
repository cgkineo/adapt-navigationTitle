import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Navigation Title - v1.0.0 to v1.0.1', async () => {
  let course, courseNavTitle, courseNavTitleGlobals;
  whereFromPlugin('Navigation Title - from v1.0.0', { name: 'adapt-navigationTitle', version: '<1.0.1' });
  mutateContent('Navigation Title - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._navigationTitle')) _.set(course, '_globals._extensions._navigationTitle', {});
    courseNavTitleGlobals = course._globals._extensions._navigationTitle;
    return true;
  });
  mutateContent('Navigation Title - add globals _navOrder', async (content) => {
    _.set(courseNavTitleGlobals, '_navOrder', 0);
    return true;
  });
  mutateContent('Navigation Title - add course _navigationTitle._hideForMobile', async (content) => {
    course = getCourse();
    if (!_.has(course, '_navigationTitle')) _.set(course, '_navigationTitle', {});
    courseNavTitle = course._navigationTitle;
    courseNavTitle._hideForMobile = false;
    return true;
  });
  mutateContent('Navigation Title - add course _navigationTitle._useCourseTitle', async (content) => {
    courseNavTitle._useCourseTitle = false;
    return true;
  });
  checkContent('Navigation Title - check globals _navOrder attribute', async content => {
    if (courseNavTitleGlobals === undefined) throw new Error('Navigation Title - globals _navigationTitle invalid');
    return true;
  });
  checkContent('Navigation Title - check globals _navOrder attribute', async content => {
    if (courseNavTitleGlobals._navOrder !== 0) throw new Error('Navigation Title - globals _navOrder invalid');
    return true;
  });
  checkContent('Navigation Title - check course _navigationTitle object', async content => {
    if (courseNavTitle === undefined) throw new Error('Navigation Title - course _navigationTitle invalid');
    return true;
  });
  checkContent('Navigation Title - check course _navigationTitle._hideForMobile', async content => {
    if (courseNavTitle._hideForMobile !== false) throw new Error('Navigation Title - course _navigationTitle._hideForMobile invalid');
    return true;
  });
  checkContent('Navigation Title - check course _navigationTitle._useCourseTitle', async content => {
    if (courseNavTitle._useCourseTitle !== false) throw new Error('Navigation Title - course _navigationTitle._useCourseTitle invalid');
    return true;
  });
  updatePlugin('Navigation Title - update to v1.0.1', { name: 'adapt-navigationTitle', version: '1.0.1', framework: '>=5.0.0' });

  testSuccessWhere('navigation title with empty course', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('navigation title with empty course config', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationTitle: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.1' }]
  });
});

describe('Navigation Title - v1.0.1 to v1.0.3', async () => {
  let courseNavTitle, course, contentObjects;
  whereFromPlugin('Navigation Title - from v1.0.1', { name: 'adapt-navigationTitle', version: '<1.0.3' });
  mutateContent('Navigation Title - add course _navigationTitle._isHiddenOnMenu', async (content) => {
    course = getCourse();
    courseNavTitle = course._navigationTitle;
    courseNavTitle._isHiddenOnMenu = false;
    return true;
  });
  mutateContent('Navigation Title - add _navigationTitle._isEnabled to contentObjects', async (content) => {
    contentObjects = content.filter(({ _type }) => _type === 'page');
    contentObjects.forEach(contentObject =>
      _.set(contentObject, '_navigationTitle._isEnabled', true)
    );
    return true;
  });
  checkContent('Navigation Title - check course _navigationTitle._isHiddenOnMenu', async content => {
    if (courseNavTitle._isHiddenOnMenu !== false) throw new Error('Navigation Title - course _navigationTitle._isHiddenOnMenu invalid');
    return true;
  });
  checkContent('Navigation Title - check for _navigationTitle._isEnabled on contentObjects', async content => {
    const isValid = contentObjects.every(({ _navigationTitle }) => _navigationTitle._isEnabled !== undefined);
    if (!isValid) throw new Error('Navigation Title - _navigationTitle._isEnabled on contentObjects invalid');
    return true;
  });
  updatePlugin('Navigation Title - update to v1.0.3', { name: 'adapt-navigationTitle', version: '1.0.3', framework: '>=5.0.0' });

  testSuccessWhere('navigation title with empty course', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('navigation title with empty course config', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _navigationTitle: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-navigationTitle', version: '1.0.3' }]
  });
});
