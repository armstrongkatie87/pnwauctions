import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { PRODUCTS } from '../shared/products';
// import { FAVORITES } from '../shared/favorites';

function RenderProduct(props) {

    const {product} = props;

    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={require('./images/sqPaint.png')}
            >
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

// function RenderFavorites({favorites}) {

//     const renderFavoriteItem = ({item}) => {
//         return (
//             <View style={{margin: 10}}>
//                 <Text style={{fontSize: 14}}>{item.name}</Text>
//                 <Text style={{fontSize: 12}}>{item.image}</Text>
//             </View>
//         );
//     };

//     return (
//         <Card title='Favorites'>
//             <FlatList
//                 data={favorites}
//                 renderItem={renderFavoriteItem}
//                 keyExtractor={item => item.id.toString()}
//             />
//         </Card>
//     );
// }

class ProductInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS,
            // favorites: FAVORITES,
            favorite: false
        };
    }

    markFavorite() {
        this.setState({favorite: true});
    }

    static navigationOptions = {
        title: 'Product Information'
    }

    render() {
        const productId = this.props.navigation.getParam('productId');
        const product = this.state.products.filter(product => product.id === productId)[0];
        // const favorites = this.state.favorites.filter(favorite => favorite.productId === productId);
        return (
            <ScrollView>
                <RenderProduct product={product}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                {/* <RenderFavorites favorites={favorites} /> */}
            </ScrollView>
        );
    }
}

export default ProductInfo;