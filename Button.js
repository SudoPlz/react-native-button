'use strict';

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PropTypes,
  ActivityIndicator,
  ProgressBarAndroid,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

const DEFAULT_BUTTON_HEIGHT = 44;

const styles = StyleSheet.create({
  
  
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },



  button: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 8,

    // marginBottom: 10,
    justifyContent: 'center',
    alignItems:'center',
  },


  //icon
  iconContainer:{
    top: 0,
    // flex:1,
    // backgroundColor:'yellow',
    position: 'absolute',
    justifyContent:'center',
    paddingHorizontal: 10
  },
  

  //text
  textContainer:{
    // backgroundColor:'pink',
    // flex:1,
    justifyContent: 'center',
  },

  text: {
    flexWrap: 'nowrap',
    fontSize: 18,
    // backgroundColor: 'red'
  },
});

class SPButton extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    if(this.props.style!=null){
      let curStyle = StyleSheet.flatten([this.props.style])
    if(curStyle.height!=null){
      this.buttonHeight = curStyle.height;
    }
    }else{
      this.buttonHeight = DEFAULT_BUTTON_HEIGHT;
    }
  }

  


  _renderTextIfNeeded(){
    if(!!this.props.children){
      return (
      <Text style={[styles.text, this.props.textStyle]}>
        {this.props.children}
      </Text>
    );  
    }else{
      return (
      <View></View>
    );  
    }
  }



  _renderIconIfNeeded(){
    if(!!this.props.customIcon){
      console.log("Button height: "+this.buttonHeight);
      return <View style={[styles.iconContainer, {height: this.buttonHeight}, this.props.iconContainerStyle]}>{this.props.customIcon()}</View>;
    }else if(!!this.props.iconProps){
      return <View style={[styles.iconContainer, {height: this.buttonHeight}, this.props.iconContainerStyle]}><Icon style={this.props.iconStyle} {...this.props.iconProps}></Icon></View>;
    }else{
      return <View></View>;
    }
  }

  _renderInnerText () {
    if (this.props.isLoading) {
      return (
        <View style={styles.textContainer}>
          <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
          {...this.props.activityIndicatorProps}
        />        
        </View>
        
      );
    }

    return (
      <View style={styles.textContainer}>
        {this._renderTextIfNeeded()}
      </View>
      )
  }
 



  render() {
    // let styles = this.getStyles(this.props);
    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        <View style={[styles.button, {height: this.buttonHeight}, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
          {this._renderInnerText(styles)}
        </View>
      );
    } else {
      // Extract Touchable props
      var touchableProps = {
        onPress: this.props.onPress,
        onPressIn: this.props.onPressIn,
        onPressOut: this.props.onPressOut,
        onLongPress: this.props.onLongPress
      };
      if (Platform.OS === 'android') {
        touchableProps = Object.assign(touchableProps, {
          background: this.props.background || TouchableNativeFeedback.SelectableBackground()
        });
      
        return (
          <TouchableNativeFeedback {...touchableProps} >
            <View style={[styles.button, {height: this.buttonHeight}, this.props.style]}>
              {this._renderInnerText()}
              {this._renderIconIfNeeded()}
            </View> 
          </TouchableNativeFeedback>
        )
      } else {
        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, {height: this.buttonHeight}, this.props.style]}>
              {this._renderInnerText()}
              {this._renderIconIfNeeded()}
          </TouchableOpacity>
        );
      }
    }
  }
}


SPButton.propTypes = {
  buttonHeight: React.PropTypes.number,
  buttonWidth: React.PropTypes.number,

  //icon props
  customIcon: React.PropTypes.func,
  iconProps: React.PropTypes.object,
  iconStyle: View.propTypes.style,
  iconContainerStyle: View.propTypes.style,
  //text styles
  textStyle: Text.propTypes.style,
  //view styles
  disabledStyle: View.propTypes.style,

  //spinner props
  activityIndicatorColor: React.PropTypes.string,
  activityIndicatorProps: React.PropTypes.object,

  children: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  
  //callbacks
  onPress: React.PropTypes.func,
  onLongPress: React.PropTypes.func,
  onPressIn: React.PropTypes.func,
  onPressOut: React.PropTypes.func,
  background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : React.PropTypes.any,
}   
export default SPButton;
