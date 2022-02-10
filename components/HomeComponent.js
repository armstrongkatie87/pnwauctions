import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        products: state.products
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return ( 
            <Card 
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
                <Button
                    title="Auction"
                    buttonStyle={{
                        marginBottom:20,
                        marginHorizontal: 100,
                        backgroundColor:'#7bdcb5',
                        width:120
                    }}
                />
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.products.products.filter(product => product.featured)[0]}
                    isLoading={this.props.products.isLoading}
                    errMess={this.props.products.errMess}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);