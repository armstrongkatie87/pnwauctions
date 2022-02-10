import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card
                        title='Contact Information'
                        wrapperStyle={{ margin: 20 }}>
                            <Text>Navy Yard City</Text>
                            <Text>Bremerton, WA 98312</Text>
                            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>

                            <Text>Phone: 1-234-567-8910</Text>
                            <Text>Email: info@pnwauctions.com</Text>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;