/* eslint-disable */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Linking,
} from 'react-native'
const { width } = Dimensions.get('window')

export default class Two extends Component {
    // 构造
    constructor(props) {
        super(props)
        // 初始状态
        this.state = {
            governmentData: [
                {
                    name: '社会保障局',
                    childs: [
                        {
                            index:0,
                            name: '资料教室',
                            tel: '5233',
                            message: '查询资料,注销档案',
                        },
                        {
                            index:1,
                            name: '后勤部',
                            tel: '1645682',
                            message: '不对外服务',
                        },
                    ],
                },
                {
                    name: '卫生局',
                    childs: [
                        {
                            index:0,
                            name: '妇产科',
                            tel: '112转678',
                            message: '接待孕妇,待产孕妇,军嫂预先',
                        },
                        {
                            index:1,
                            name: '儿科',
                            tel: '112转008',
                            message: '小于12周岁儿童就医',
                        },
                        {
                            index:2,
                            name: '失恋科',
                            tel: '112转出去',
                            message: '回家玩蛋去!!!',
                        },
                    ],
                },
                {
                    name: '神盾局',
                    childs: [
                        {
                            index:0,
                            name: '城管大队',
                            tel: '110',
                            title: '打打打',
                            message: '镇压起义',
                        },
                    ],
                },
            ],
            isRefresh: true,
            index: -1, //默认展开负一行
            indexIndex: -1,
        }
    }

    componentDidMount() {
        this.setState({
            isRefresh: false,
        })
    }

    /**
     * 下拉刷新
     * */
    onRefresh = () => {
        this.setState({
            isRefresh: false,
        })
    }


    /**
     * 点击一级
     * */
    itemOnclick = item => {
        this.setState({
            index: item.index,
            indexIndex: -1
        })
    }

    /**
     * 点击二级
     * */
    itemitemOnclick = e => {
        this.setState({
            indexIndex: e.index,
        })
    }

    /**
     * 打电话
     * */
    tellPhone = item => {
        Linking.openURL(`tel:${item.tel}`)
    }

    /**
     * FlatList render
     * */
    renderRow = item => (
        <View ref={item.index}>
            <View>
                <TouchableOpacity onPress={() => this.itemOnclick(item)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            height: 30,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                marginLeft: 5,
                                width: 4,
                                height: 10,
                                paddingTop: 7,
                                paddingBottom: 7,
                                backgroundColor:'red'
                            }}
                        />
                        <Text style={{ color: '#333333', marginLeft: 5, fontSize: 16 }}>
                            {item.item.name}
                        </Text>
                        {/* 右边箭头 */}
                        <Image
                            source={
                                item.index == this.state.index
                                    ? require('./image/btnDown.png')
                                    : require('./image/right.png')
                            }
                            style={{ position: 'absolute', right: 15, width: 15, height: 15 }}
                        />
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: 'rgb(228,228,228)',
                        width: width,
                        height: 1,
                    }}
                />
            </View>
            {item.index == this.state.index
                ? item.item.childs.map((item, index) => (
                    <View style={{ backgroundColor: 'white' }} key={index}>
                        <View style={{ marginLeft: 7, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={
                                        index == this.state.indexIndex
                                            ? require('./image/btnDownB.png')
                                            : require('./image/btnRightB.png')
                                    }
                                    style={{ width: 10, height: 10 }}
                                />
                                <Text
                                    onPress={() => this.itemitemOnclick(item)}
                                    style={{ marginLeft: 7 }}
                                >
                                    {item.name}
                                </Text>
                            </View>
                            <View
                                style={{
                                    backgroundColor: 'rgb(228,228,228)',
                                    width: width,
                                    height: 1,
                                    marginTop: 10,
                                }}
                            />
                        </View>
                        {item.index == this.state.indexIndex
                            ? (
                            <View>
                                <View
                                    style={{
                                        height: 40,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row' }}
                                        onPress={() => this.tellPhone(item)}
                                    >
                                        <Image
                                            source={require('./image/phone.png')}
                                            style={{ marginLeft: 10, width: 15, height: 15 }}
                                        />
                                        <Text style={{ marginLeft: 10 }}>电话 {item.tel}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'rgb(228,228,228)',
                                        width: width,
                                        height: 1,
                                    }}
                                />

                                <View
                                    style={{
                                        height: 40,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Image
                                        source={require('./image/tlak.png')}
                                        style={{ marginLeft: 10, width: 15, height: 15 }}
                                    />
                                    <Text style={{ marginLeft: 10 }}>留言 {item.message}</Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: 'rgb(228,228,228)',
                                        width: width,
                                        height: 1,
                                    }}
                                />
                            </View>
                        ) : null}
                    </View>
                ))
                : null}
        </View>
    )

    render() {
        return (
            <FlatList
                data={this.state.governmentData}
                renderItem={this.renderRow}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isRefresh}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 22,
        height: 22,
    },
})

