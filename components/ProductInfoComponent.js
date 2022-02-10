import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        products: state.products,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: productId => postFavorite(productId)
};


function RenderProduct(props) {

    const {product} = props;

    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={{uri: baseUrl + product.image}}>
                <Text style={{margin: 10}}>
                    {product.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#d4c4fb'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

class ProductInfo extends Component {

    markFavorite(productId) {
        this.props.postFavorite(productId);
    }

    static navigationOptions = {
        title: 'Product Information'
    }

    render() {
        const productId = this.props.navigation.getParam('productId');
        const product = this.props.products.products.filter(product => product.id === productId)[0];
        return (
            <ScrollView>
                <RenderProduct product={product}
                    favorite={this.props.favorites.includes(productId)}
                    markFavorite={() => this.markFavorite(productId)}
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);