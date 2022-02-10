import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        }

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }

        return (
            <ScrollView>
                <Mission />
                <Card
                    title="Community Partners">
                    <FlatList
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

function Mission() {
    return (
        <Card
            title="Our Mission">
            <Text style={{ margin: 10 }}>
                "We want our customers to be able to have a user-friendly mobile experience while bidding on their favorite auction items. At Pacific Northwest Auctions we aim to provide our users with access to the best auctions, estate sales and liquidations in the Pacific Northwest."
            </Text>
        </Card>
    );
}

export default connect(mapStateToProps)(About); 