# adapt-navigationTitle

**Navigation Title** is an *extension* for displaying a title in the course navigation bar.

## Settings overview

**Navigation Title** attributes include a text field for the title, an option to hide for mobile view, and an option to use the course title instead of custom text.

<img src='https://user-images.githubusercontent.com/898168/210417005-3c2f0e9d-b1f0-4a7b-815c-33c3a6921965.jpg' width="500" alt="Screenshot">

## Attributes

The following attributes are set within *course.json*.

### **\_navigationTitle** (object):
The object that defines the content to render. It contains the following settings:

### **\_isEnabled** (boolean):
Turns on and off the **Navigation Title** extension.

### **\_hideForMobile** (boolean):
Optional, hide the title for mobile view. Useful to declutter the navigation bar where limited space is available.

### **\_useCourseTitle** (boolean):
Optional, use the course title as the navigation title. Will override anything in the `title` property of the `_navigationTitle` object.

### **title** (string):
The title text to display.

----------------------------
**Version number:**  1.0.0<br>
**Framework versions:**  5.24.4+<br>
**Author / maintainer:** CGKineo<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera<br>
