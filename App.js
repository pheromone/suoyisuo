import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Two from './src/Two';
import One from './src/One';

type Props = {};
export default class TwoDetails extends Component<Props> {
    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        // 只要切换tab,push,pop,这里一定走
                        console.log(prevState)
                        console.log(currentState)

                    }
                }
            />
        );
    }

    componentDidMount() {
        console.disableYellowBox = true
    }
}


const Tab = TabNavigator({
        One: {
            screen: One,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'One',
            }),
        },
        Two: {
            screen: Two,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Two',
            }),
        },

    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#979797',
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },

    });

const Navigator = StackNavigator({
    Tab: {
        screen: Tab,
    },
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});