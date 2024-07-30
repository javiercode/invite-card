import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Title, DataTable, Banner } from 'react-native-paper';
// import Carousel from 'react-native-snap-carousel';
import { MenuPathEnum } from '../utils/enums/Login.enum';

interface ITareaListProps {
    tipo: string,
    title:string,
}
type Props = NativeStackScreenProps<any, MenuPathEnum.CLIENTE_HOME>;
export default function Dashboard({ route, navigation }: Props) {
    const carouselData = [
      { image: require('../assets/images/cloud.jpg') },
      { image: require('../assets/images/banner.jpg') },
      { image: require('../assets/images/logoSimple.png') },
    ];
  
    return (
      <View style={styles.container}>
        <Banner
          style={styles.banner}
          visible={true}
          actions={[
            {
              label: 'Cerrar',
              onPress: () => console.log('Banner cerrado'),
            },
          ]}
        >
          Este es un banner de ejemplo.
        </Banner>
        <View style={styles.carouselContainer}>
          {/* <Carousel
            data={carouselData}
            renderItem={({ item }) => (
              <Card>
                <Card.Cover source={item.image} />
              </Card>
            )}
            sliderWidth={300}
            itemWidth={300}
          /> */}
        </View>
  
        <Card style={styles.card}>
          <Card.Content>
            <Title>Detalles</Title>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Propiedad 1</DataTable.Cell>
                <DataTable.Cell>Valor 1</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Propiedad 2</DataTable.Cell>
                <DataTable.Cell>Valor 2</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Propiedad 3</DataTable.Cell>
                <DataTable.Cell>Valor 3</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
  
        
  
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    carouselContainer: {
      height: 200,
    },
    card: {
      margin: 10,
      padding: 10,
      backgroundColor: '#2a38a2',
    },
    banner: {
      backgroundColor: '#2a38a2',
    },
    tabView: {
      marginTop: 10,
    },
  });  