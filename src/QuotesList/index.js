import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from "@react-native-firebase/firestore";

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
                    <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text> "{item.Sentence}"</Text>
                        <Text>Author: {item.Author}</Text>
                    </View>
                )}               
            />
        </View>
    );
}