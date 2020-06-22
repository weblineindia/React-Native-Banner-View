// import { NativeModules } from 'react-native';

// const { PageControl } = NativeModules;

// export default PageControl;


import React, { Component } from 'react';
import { View, FlatList, StatusBar, Dimensions } from 'react-native';
import styles from './Styles';
import BannerItem from './BannerItem';

type IProps = {
    activeIndicatorColor: String,
    passiveIndicatorColor: String
};

export default class BannerView extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            pageIndex: 0,
        };
    }

    componentDidMount() {
        let new_data = this.state.data;

        // To accept maximum 10 items in the list
        if (this.state.data.length >= 10) {
            new_data = this.state.data.slice(0, 10);
        } else {
            new_data = this.state.data;
        }
        this.setState({ data: new_data })

        // To set time interval for jump to next page
        setInterval(function () {
            const { pageIndex } = this.state
            let nextIndex = 0

            if (pageIndex < new_data.length - 1) {
                nextIndex = pageIndex + 1
            }
            // console.log('---index---', nextIndex);
            this.scrollToIndex(nextIndex, nextIndex === 0 ? false : true)
            this.setState({ pageIndex: nextIndex })
        }.bind(this), 3000)
    }

    /**
     * Method for verifying list refrence exists or not
     * Apply animation when move to next page or index with timeout
     * 
     * @param {*} index 
     * @param {*} animated
     */

    scrollToIndex = (index, animated) => {
        this.flatList && this.flatList.scrollToIndex({ index, animated })
    }

    /**
     * Method for find current index
     * Apply animation when move to next page or index with gesture
     */

    onScrollEnd(e) {
        const contentOffset = e.nativeEvent.contentOffset;
        const viewSize = e.nativeEvent.layoutMeasurement;
        const pageNum = Math.floor(contentOffset.x / viewSize.width);   // Current Page Index

        this.setState({ pageIndex: pageNum });
        this.flatList_Ref.scrollToIndex({ animated: true, index: pageNum });
    }

    /**
     * Method for render indicator list 
     * Show active and passive indicator with active index of the list
     * 
     * @param {*} index 
     */

    renderIndicatorList = (index) => (
        <View style={styles.indicatorListView}>
            <View style={[styles.indicatorView,
            {
                backgroundColor:
                    (this.state.pageIndex == index)
                        ? (this.props.activeIndicatorColor != undefined && this.props.activeIndicatorColor != "")
                            ? this.props.activeIndicatorColor
                            : 'black'
                        : (this.props.passiveIndicatorColor != undefined && this.props.passiveIndicatorColor != "")
                            ? this.props.passiveIndicatorColor
                            : 'grey'
            }
            ]} />
        </View>
    );

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" backgroundColor="black" />
                <FlatList
                    ref={ref => this.flatList = ref}
                    horizontal
                    bounces={false}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={this.state.data}
                    titleKey={this.props.titleKey}
                    subTitleKey={this.props.subTitleKey}
                    extraData={this.state}
                    renderItem={({ item }) => <BannerItem
                        {...item}
                        {...this.props}
                        viewStyle={this.props.viewStyle}
                        imageStyle={this.props.imageStyle}
                    />}
                    keyExtractor={(item) => item.id.toString()}
                    onMomentumScrollEnd={(e) => this.onScrollEnd(e)}
                />

                {/* second flatlist for indicator */}

                <View style={[styles.indicatorMainView, {}]}>
                    <FlatList
                        ref={(ref) => this.flatList_Ref = ref}
                        horizontal
                        bounces={false}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({ item, index }) => this.renderIndicatorList(index)}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </>
        );
    }
}
