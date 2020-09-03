import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Dimensions, ScrollView } from 'react-native';

const DATA = [
  {
    title: 'Be constantly aware of your surroundings. Unplug and do not listen to music or talk on the phone. Only have your phone prepared to dial an emergency contact.',
  },
  {
    title: 'Check beneath your car before approaching it. People will hide underneath to render a victim helpless by slashing their Achilles tendon.',
  },
  {
    title: 'Ask an assistant or security guard to guide you to your car.',
  },
  {
    title: 'Never open your front door without confirming the identity of who is there.'
  },
  {
    title: 'While driving, never pull over if someone driving alongside you points out something wrong with your car. Instead, drive to the nearest well-lit gas station and check yourself.'
  },
  {
    title: 'Don’t be afraid of publicly shaming someone who is harassing you. If you suddenly find yourself in a dangerous neighborhood or situation, be erratic.'
  },
  {
    title: 'If you feel you are being followed, enter a business and report it to an employee.'
  }
];

const publicTransportationDATA = [
  {
    title: 'Use a bus stop you know is usually busy and is well lit.'
  },
  {
    title: 'Sit close to the driver. If someone starts up a conversation, be pleasant and confident, but do not give away personal information.'
  }
]

const travelDATA = [
  {
    title: 'Pack a rubber doorstop. Wedge it underneath your locked door to prevent intruders from entering.'
  },
  {
    title: 'Take group tours and hire a local guide. Blending in with a group makes you less likely to be a target.'
  },
  {
    title:'Know your destination. The World Bank has a gender data portal that provides statistics that can signal to women whether it’s a safe location over all.'
  },
  {
    title: 'Try to blend in. Dress according to local customs and religious and cultural beliefs.'
  }
]

const selfDefenseDATA = [
  {
    title: 'Steady yourself if danger threatens. Panic can disable you, so again it’s useful to learn how to keep control in a difficult situation. '
  },
  {
    title: 'Use your car keys. Don’t use your fingernails, because you’re more at risk to injure your hands.'
  },
  {
    title: 'Keep your eyes on their thumbs. The fist and grip is weakest where the thumb meets the fingers.'

  }
]
const lateData = [
  {
    title: 'Hit the Attacker Where It Counts. The eyes, knees, throat and groin are very vulnerable, good places to gouge and kick. But listen to your instincts and try to determine if a counter attack by you is the best approach.'
  },
  {
    title: 'Run, Run, Run. If the predator has a gun but you are not under his control, take off. Experts say the predator will only hit you, a running target, four out of every 100 shots.'
  },
  {
    title: 'Do not let your attacker take you to an abandoned area. If they do, the likelihood that you will be seriously injured increases tenfold.'
  }
]

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const tips = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View>
    <ScrollView style = {styles.container}
    contentContainerStyle={{ paddingBottom: 300 }}

    >
      <View style = {styles.bg}>
        <Text style = {styles.header}> Tips </Text>
      </View>
      <SafeAreaView style = {{top: 200}}>
      <Text style = {styles.topic}> When alone: </Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </SafeAreaView>
      <SafeAreaView style = {{top: 200}}>
      <Text style = {styles.topic}> Using public transportation: </Text>
        <FlatList
          data={publicTransportationDATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </SafeAreaView>
      <SafeAreaView style = {{top: 200}}>
      <Text style = {styles.topic}> While travelling: </Text>
        <FlatList
          data={travelDATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </SafeAreaView>
      <View style = {{top: 200}}>
      <Text style = {styles.topic}> Self defense: </Text>
        <FlatList
          data={selfDefenseDATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      <View style = {{top: 200}}>
      <Text style = {styles.topic}> When it's too late: </Text>
        <FlatList
          data={lateData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  bg: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 5,
    position: 'absolute',
  },

  header: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
    color: 'white',
  },

  topic: {
    fontSize: 20,
    left: 30,
    color: 'rgba(0, 0, 0, 0.7)'
  },

  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    height: 250,
    width: 250,
    borderRadius: 25
  },

  title: {
    fontSize: 18,
    color: 'rgba(158, 101, 144, 1)'
  },
});

export default tips;
