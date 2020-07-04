import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Caption, Divider, Subheading} from 'react-native-paper';
import {GetQuotesList} from '../../Api/QuotesApi';

export default function QuotesList() {
    const [quotes, setQuotes] = useState([]);

    onQuotesReceived = quotesReceived => {
        setQuotes(quotesReceived);
    };

    useEffect(() => {
        GetQuotesList(onQuotesReceived);
    }, []);

    return (
        <View>
            <FlatList
                data={quotes}
                renderItem={({item}) => (
                    <View style={styles.listItem}>
                        {' '}
                        <Subheading style={styles.Sentence}>
                            {' '}
                            {item.Sentence}
                        </Subheading>
                        <Caption style={styles.Author}> {item.Author}</Caption>{' '}
                        <Divider />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        marginVertical: 10,
    },
    Sentence: {
        marginHorizontal: 5,
    },
    Author: {
        textAlign: 'right',
        marginRight: 20,
    },
});
