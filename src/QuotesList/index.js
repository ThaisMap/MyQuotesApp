import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Title, Caption, Divider, Subheading } from 'react-native-paper';

export default function QuotesList(){
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
        .collection('Quotes')
        .onSnapshot((snap) => {
            const retrievedQuotes = [ ];
            
            snap.forEach(doc => { 
                retrievedQuotes.push({
                    ...doc._data, 
                    key: doc.id,
                });
            });
        setQuotes(retrievedQuotes);
        }); 
        return () => subscriber();
    }, []);

    return (
        <View>
            <FlatList 
                data={quotes}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Subheading style={styles.Sentence}> {item.Sentence}</Subheading>
                        <Caption style={styles.Author}> {item.Author}</Caption>
                        <Divider />
                    </View>
                )}               
            />
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: { 
    marginVertical: 10
    },
    Sentence:{
        marginHorizontal: 5
    },
    Author:{
        textAlign: 'right',
        marginRight: 20        
    }
});