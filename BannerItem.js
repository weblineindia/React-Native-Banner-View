import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
// import Gestures from 'react-native-touch-gestures';
import styles from './Styles';

type IProps = {
  navigation: any,
  routeName: String,
  id: Number,
  featureName: String,
  height: Number,
};

class BannerItem extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {viewStyle, imageStyle, url} = this.props;
    return (
      <View
        onTouchStart={(e) => {
          this.props.isAutoScroll(false);
        }}
        style={[styles.containerStyle, viewStyle]}>
        <ImageBackground
          source={{uri: url}}
          style={[styles.imageStyle, imageStyle]}>

          <View style={styles.textView}>
            {this.props[this.props.titleKey] != undefined &&
            this.props[this.props.titleKey] != '' ? (
              <Text numberOfLines={1} style={styles.titleStyle}>
                {this.props[this.props.titleKey]}
              </Text>
            ) : this.props.title != undefined && this.props.title != '' ? (
              <Text numberOfLines={1} style={styles.titleStyle}>
                {this.props.title}
              </Text>
            ) : null}
            {this.props[this.props.subTitleKey] != undefined &&
            this.props[this.props.subTitleKey] != '' ? (
              <Text numberOfLines={1} style={styles.subTitleStyle}>
                {this.props[this.props.subTitleKey]}
              </Text>
            ) : this.props.subTitle != undefined &&
              this.props.subTitle != '' ? (
              <Text numberOfLines={1} style={styles.titleStyle}>
                {this.props.subTitle}
              </Text>
            ) : null}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default BannerItem;
