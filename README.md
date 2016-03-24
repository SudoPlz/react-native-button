# sp-react-native-iconbutton

A React Native button that can also have an `icon` within it through the `iconProps` property.

It works both WITH an icon AND without so it can cover all your button needs.

<img src="https://app.box.com/representation/file_version_60871688245/image_2048/1.png?shared_name=6u2psds0k555fxstpkpaogvaceetqj0a" >




<p align="center">
<img src="https://raw.githubusercontent.com/wiki/APSL/react-native-button/button.png" alt="Button component screenshot" width="400">
<img src="https://raw.githubusercontent.com/wiki/APSL/react-native-button/and.png" alt="Android Button component screenshot" width="400">
</p>

Renders a ``TouchableOpacity`` under iOS and a ``TouchableNativeFeedback`` under Android.

## Install

``apsl-react-native-button`` needs React Native 0.16 or higher.

Install the package:

```bash
$ npm i sp-react-native-iconbutton --save
```

Import the ``Button`` component:

```javascript
import Button from 'sp-react-native-iconbutton'
```

## Usage

Provide ``TouchableWithoutFeedback``' props to the component (including ``style``),
``textStyle``'s ``StyleSheet`` to customize the inner text and a children node
to render. You can also provide the ``isLoading`` prop that will dim the button
and disable it to prevent accidental taps.

```javascript
<Button
    style={{backgroundColor: '#3D5B96', height:60, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)'}}
    textStyle={{color: 'white', textAlign: 'center'}}
    iconProps={{name: "facebook",size:25, color: "white"}}
    iconStyle={{paddingHorizontal:20}}
>
    Login with Facebook
</Button>
```    


## API

| Prop | Type | Description |
|------|------|-------------|
| ``onPress`` | ``func`` | Function to execute when the ``onPress`` event is triggered. |
| ``onPressIn`` | ``func`` | Function to execute when the ``onPressIn`` event is triggered. |
| ``onPressOut`` | ``func`` | Function to execute when the ``onPressOut`` event is triggered. |
| ``onLongPress`` | ``func`` | Function to execute when the ``onLongPress`` event is triggered. |
| ``iconStyle`` | ``ViewStylePropTypes`` | The StyleSheet to apply to the inner button text. |
| ``iconProps`` | ``Object`` | The properties to pass to `react-native-vector-icons` |
| ``textStyle`` | ``TextStylePropTypes`` | The StyleSheet to apply to the inner button text. |
| ``disabledStyle`` | ``TextStylePropTypes`` | The StyleSheet to apply when disabled. |
| ``children`` | ``string`` | The ``string`` to render as the text button. |
| ``isLoading`` | ``bool`` | Renders an inactive state dimmed button with a spinner if ``true``. |
| ``isDisabled`` | ``bool`` | Renders an inactive state dimmed button if ``true``. |
| ``activityIndicatorColor`` | ``string`` | Sets the button of the ``ActivityIndicatorIOS`` or ``ProgressBarAndroid`` in the loading state. |
| ``background`` | ``TouchableNativeFeedback.propTypes.background`` | **Android only**. The background prop of ``TouchableNativeFeedback``. |







## License

MIT.
