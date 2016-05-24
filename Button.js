'use strict';

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PropTypes,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';



class SPButton extends React.Component {



  isAndroid(){
    return (Platform.OS === 'android');
  }

  _renderInnerTextAndroid (styles) {
    if (this.props.isLoading) {
      return (
        <ProgressBarAndroid
          style={[{
            height: 20,
          }, styles.spinner]}
          styleAttr='Inverse'
          color={this.props.activityIndicatorColor || 'black'}
        />
      );
    }   
    return this._renderTextIfNeeded(styles);
  }

  _renderTextIfNeeded(styles){
    if(!!this.props.children){
      return (
      <Text style={[styles.textButton, this.props.textStyle]}>
        {this.props.children}
      </Text>
    );  
    }else{
      return (
      <View></View>
    );  
    }
  }



  _renderIconIfNeeded(styles){
    if(!!this.props.customIcon){
      return <View style={[styles.btnIcon, this.props.iconContainerStyle]}>{this.props.customIcon()}</View>;
    }else if(!!this.props.iconProps){
      return <View style={[styles.btnIcon, this.props.iconContainerStyle]}><Icon style={this.props.iconStyle} {...this.props.iconProps}></Icon></View>;
    }else{
      return <View></View>;
    }
  }

  _renderInnerTextiOS (styles) {
    if (this.props.isLoading) {
      return (
        <ActivityIndicatorIOS
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
        />
      );
    }

    return this._renderTextIfNeeded(styles);
  }

  _renderInnerText (styles) {
    if (this.isAndroid()) {
      return this._renderInnerTextAndroid(styles)
    }
    return this._renderInnerTextiOS(styles)
  }

  getStyles(props){

    let iconSize = null;
    if(props.iconProps && props.iconProps.size){
      iconSize = props.iconProps.size;
    }
    
    return StyleSheet.create({
      touchableContainerView:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'black'
      },
      rowContainer:{
        flex: 1,
        flexDirection: 'column'
      },
      rowItem:{
        flex: 1,
        width: !!this.props.children?null:iconSize*2,
        height: !!this.props.children?null:iconSize*2,
        justifyContent: 'center'
      },

      btnIcon:{
        // backgroundColor: 'red',
        position: 'absolute',
        paddingHorizontal: 10
      },
      button: {
        height: 44,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        // marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
      },

      textButton: {
        fontSize: 18,
        alignSelf: 'center'
        // backgroundColor: 'yellow'
      },
      spinner: {
        alignSelf: 'center',
      },
      opacity: {
        opacity: 0.5,
      },
    });
  }

  render() {
    let styles = this.getStyles(this.props);
    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
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
      if (this.isAndroid()) {
        touchableProps = Object.assign(touchableProps, {
          background: this.props.background || TouchableNativeFeedback.SelectableBackground()
        });
      
        return (
          <TouchableNativeFeedback {...touchableProps} >
            <View style={[styles.button, this.props.style]}>
              <View style={styles.touchableContainerView} >
                <View style={styles.rowContainer}>
                  <View style={styles.rowItem}>
                    {this._renderIconIfNeeded(styles)}
                  </View>
                  <View style={styles.rowItem}>
                    {this._renderInnerTextAndroid(styles)}
                  </View>
                </View>
              </View>
            </View> 
          </TouchableNativeFeedback>
        )
      } else {
        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, this.props.style]}>
            <View style={styles.touchableContainerView} >
                <View style={styles.rowContainer}>
                  <View style={styles.rowItem}>
                    {this._renderIconIfNeeded(styles)}
                  </View>
                  <View style={styles.rowItem}>
                    {this._renderInnerTextiOS(styles)}
                  </View>
                </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
}

SPButton.propTypes = {
  customIcon: React.PropTypes.func,
  iconProps: React.PropTypes.object,
  iconStyle: View.propTypes.style,
  iconContainerStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
  disabledStyle: View.propTypes.style,
  children: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  activityIndicatorColor: React.PropTypes.string,
  onPress: React.PropTypes.func,
  onLongPress: React.PropTypes.func,
  onPressIn: React.PropTypes.func,
  onPressOut: React.PropTypes.func,
  background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : React.PropTypes.any,
}   
export default SPButton;
