import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { PRODUCTS } from '../shared/products';

function RenderItem({item}) {
    if (item) {
        return ( 
            <Card 
                image={require('./images/sqPaint.png')}
                featuredTitle={item.name}
            >
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

    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS,
        };
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem 
                    item={this.state.products.filter(product => product.featured)[0]}
                />
            </ScrollView>
        );
    }
}

export default Home;