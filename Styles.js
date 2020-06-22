// @flow
import { StyleSheet, Dimensions } from 'react-native';

let COMMON_SPACE = 10;

export default StyleSheet.create({
    containerStyle: {
        marginTop: COMMON_SPACE,
        paddingHorizontal: COMMON_SPACE,
    },
    imageStyle: {
        height: (Dimensions.get('window').height) * 0.246,
        width: (Dimensions.get('window').width) - (COMMON_SPACE * 2),
        backgroundColor: '#000',
        borderRadius: COMMON_SPACE,
        overflow: "hidden",
    },
    titleStyle: {
        fontSize: 20,
        marginTop: 5,
        color: '#ffffff',
        fontWeight: "800",
    },
    subTitleStyle: {
        fontSize: 16,
        marginTop: 2,
        color: '#ffffff',
        fontWeight: "500"
    },
    indicatorMainView: {
        alignItems: "center",
        paddingVertical: COMMON_SPACE
    },
    indicatorListView: {
        justifyContent: 'center',
    },
    indicatorView: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'black',
        marginHorizontal: 3,
    },
    textView: {
        bottom: 15,
        left: 15,
        position: "absolute"
    }
});
