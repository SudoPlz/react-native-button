'use strict';

var React = require('react-native');
var {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  PropTypes,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  TouchableNativeFeedback,
  Platform
} = React;
var Icon = require('react-native-vector-icons/FontAwesome');
var Button = React.createClass({
  propTypes: Object.assign({},
    {

      iconProps: PropTypes.object,
      iconStyle: View.propTypes.style,
      textStyle: Text.propTypes.style,
      disabledStyle: Text.propTypes.style,
      children: PropTypes.string,
      isLoading: PropTypes.bool,
      isDisabled: PropTypes.bool,
      activityIndicatorColor: PropTypes.string,
      onPress: PropTypes.func,
      onLongPress: PropTypes.func,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func,
      background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
    },
  ),

  statics: {
    isAndroid: (Platform.OS === 'android'),
  },

  _renderInnerTextAndroid: function (styles) {
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

  },

  _renderTextIfNeeded: function(styles){
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
  },




  _renderIconIfNeeded: function(styles){
    if(!!this.props.iconProps){
      return <Icon style={[styles.btnIcon, this.props.iconStyle]} {...this.props.iconProps}></Icon>;
    }else{
      return <View></View>;
    }
  },

  _renderInnerTextiOS: function (styles) {
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
  },

  _renderInnerText: function (styles) {
    if (Button.isAndroid) {
      return this._renderInnerTextAndroid(styles)
    }
    return this._renderInnerTextiOS(styles)
  },

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
        width: !!this.props.children?null:iconSize,
        height: !!this.props.children?null:iconSize,
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
        marginBottom: 10,
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
  },

  render: function () {
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
      if (Button.isAndroid) {
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


});


module.exports = Button;
