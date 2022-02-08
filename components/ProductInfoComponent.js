import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { PRODUCTS } from '../shared/products';

function RenderProduct({product}) {

    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={require('./images/sqPaint.png')}
            >
                <Text style={{margin: 10}}>
                    {product.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class ProductInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS
        };
    }

    static navigationOptions = {
        title: 'Product Information'
    }

    render() {
        const productId = this.props.navigation.getParam('productId');
        const product = this.state.products.filter(product => product.id === productId)[0];
        return <RenderProduct product={product} />;
    }
}

export default ProductInfo;