import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/Ellie3.jpeg') }} 
                />
            );
        }

        return (
            <ScrollView>
                <Mission />
                <Card
                    title="Community Partners">
                    <FlatList
                        data={this.state.partners}
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

export default About;