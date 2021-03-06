import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,
    Alert, PanResponder, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

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

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + product.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            return true;
        }
    });

    const shareProduct = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (product) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={product.name}
                    image={{uri: baseUrl + product.image}}
                >
                    <Text style={{margin: 10}}>{product.description}</Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#ba68c8'
                            raised
                            reverse
                            onPress={() => props.favorite
                                ? console.log('Already set as a favorite') 
                                : props.markFavorite()
                            }
                        />
                        <Icon
                                name={'share'}
                                type='font-awesome'
                                color='#00bcd4'
                                raised
                                reverse
                                onPress={() => shareProduct(product.name, product.description, baseUrl + product.image)} 
                            />
                    </View>
                </Card>
            </Animatable.View>
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

const styles = StyleSheet.create({
    cardRow: {
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
      margin: 20,
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);