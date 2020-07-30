/**
Author Name  :  WeblineIndia  |  https://www.weblineindia.com/

For more such software development components and code libraries, visit us at
https://www.weblineindia.com/software-development-resources.html 

Our Github URL : https://github.com/weblineindia
**/
import React, { Component } from 'react';
import { View, FlatList, StatusBar, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './Styles';
import BannerItem from './BannerItem';
import * as images from './images/map';

type IProps = {
  activeIndicatorColor: String,
  passiveIndicatorColor: String,
  isAutoPlay: Boolean,
};

let isAutoScroll = true;
let pageIndexNum = 0;
var animaInterval = null;
let timeInterval;

export default class BannerView extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      pageIndex: pageIndexNum,
      isAutoScroll: isAutoScroll,
    };
    if (this.props.timeDuration === undefined) {
      timeInterval = 5000;
    } else if (this.props.timeDuration <= 2000) {
      timeInterval = 3000;
    } else {
      timeInterval = this.props.timeDuration;
    }
  }

  componentWillMount() {
    if (this.props.isAutoPlay === false) {
      this.setState({ isAutoScroll: false });
      isAutoScroll = false;
    } else {
      this.setState({ isAutoScroll: true });
      isAutoScroll = true;
    }
    let new_data = this.state.data;

    // To accept maximum 10 items in the list
    if (this.state.data.length >= 10) {
      new_data = this.state.data.slice(0, 10);
    } else {
      new_data = this.state.data;
    }
    this.setState({ data: new_data });

    this.setIntervalToScroll();
  }

  setIntervalToScroll() {


    // To set time interval for jump to next page

    animaInterval = setInterval(
      function () {
        if (isAutoScroll === true) {
          const { pageIndex } = this.state;
          let nextIndex = 0;

          if (pageIndex < this.state.data.length - 1) {
            nextIndex = pageIndex + 1;
          }

          // if (this.props.onChangeIndex) {
          //   Alert.alert(JSON.stringify(nextIndex))
          //   this.props.onChangeIndex(nextIndex);
          // }

          this.setState({ pageIndex: nextIndex }, () => {
            this.scrollToIndex(nextIndex, nextIndex === 0 ? false : true);
          });
        } else {
          clearInterval(animaInterval);
          // if (this.props.onChangeIndex) {
          //   Alert.alert(JSON.stringify(this.state.pageIndex))
          //   this.props.onChangeIndex(this.state.pageIndex);
          // }
        }
      }.bind(this),
      timeInterval,
    );
  }

  /**
   * Method for verifying list refrence exists or not
   * Apply animation when move to next page or index with timeout
   *
   * @param {*} index
   * @param {*} animated
   */

  scrollToIndex = (index, animated) => {
    this.flatList && this.flatList.scrollToIndex({ index, animated });
    this.flatList_Ref && this.flatList_Ref.scrollToIndex({ index, animated });
    if (this.props.onChangeIndex) {
      // Alert.alert(JSON.stringify(index))
      this.props.onChangeIndex(index);
    }
  };

  /**
   * Method for find current index
   * Apply animation when move to next page or index with gesture
   */

  onScrollEnd(e) {
    const contentOffset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width); // Current Page Index
    this.setState({ pageIndex: pageNum });
    this.flatList_Ref.scrollToIndex({ animated: true, index: pageNum });
    if (this.props.onChangeIndex) {
      // Alert.alert(JSON.stringify(pageNum))
      this.props.onChangeIndex(pageNum);
    }
  }

  /**
   * Method for render indicator list
   * Show active and passive indicator with active index of the list
   *
   * @param {*} index
   */

  renderIndicatorList = (index) => (
    <View style={styles.indicatorListView}>
      <View
        style={[
          styles.indicatorView,
          {
            backgroundColor:
              this.state.pageIndex == index
                ? this.props.activeIndicatorColor != undefined &&
                  this.props.activeIndicatorColor != ''
                  ? this.props.activeIndicatorColor
                  : 'black'
                : this.props.passiveIndicatorColor != undefined &&
                  this.props.passiveIndicatorColor != ''
                  ? this.props.passiveIndicatorColor
                  : 'grey',
          },
        ]}
      />
    </View>
  );

  closeAutoScroll(val) {
    isAutoScroll = val;
    this.setState({ isAutoScroll: val });
    // Clear AutoScroll Here
    if (val == false) {
      // clearInterval(animaInterval);
    } else {
      this.setIntervalToScroll();
    }
  }

  render() {
    console.log('Banenr data in library =====>', this.props.data);
    return (
      <>
        {
          this.state.data.length === 0 ?
            <View style={[this.props.imageStyle, { backgroundColor: '#dcdde0', alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}]}>
              <Text style={{fontSize: 18 }}>No banner added.</Text>
            </View> :
            (
              <View>
                <StatusBar barStyle="dark-content" backgroundColor="black" />

                <FlatList
                  ref={(ref) => (this.flatList = ref)}
                  horizontal
                  bounces={false}
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  data={this.state.data}
                  // titleKey={this.props.titleKey}
                  // subTitleKey={this.props.subTitleKey}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <BannerItem
                      {...item}
                      {...this.props}
                      viewStyle={this.props.viewStyle}
                      imageStyle={this.props.imageStyle}
                      isAutoScroll={(val) => this.closeAutoScroll(val)}
                      scrollVal={isAutoScroll}
                    />
                  )}
                  // keyExtractor={(item) => item.id.toString()}
                  keyExtractor={(index) => index.toString()}
                  onMomentumScrollEnd={(e) => this.onScrollEnd(e)}
                />

                {/* Show button for play Autoswipe */}

                {this.state.isAutoScroll === true ? null : (
                  <View style={[styles.playView, this.props.viewStyle]}>
                    <TouchableOpacity
                      onPress={() => this.closeAutoScroll(true)}
                    >
                      <Image
                        source={images.banner.play}
                        resizeMode="contain"
                        style={{
                          height: 40, width: 40, tintColor: 'white',
                          borderRadius: 40 / 2,
                          shadowColor: '#cbcdd1',
                          shadowOffset: { width: 1, height: 2 },
                          shadowOpacity: 0.8,
                          shadowRadius: 50,
                        }} />
                    </TouchableOpacity>
                  </View>
                )}

                {/* second flatlist for indicator */}

                <View style={[styles.indicatorMainView, {}]}>
                  <FlatList
                    ref={(ref) => (this.flatList_Ref = ref)}
                    horizontal
                    bounces={false}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={({ item, index }) => this.renderIndicatorList(index)}
                    // keyExtractor={(item) => item.id.toString()}
                    keyExtractor={(index) => index.toString()}
                  />
                </View>
              </View>
            )
        }

      </>
    );
  }
}
