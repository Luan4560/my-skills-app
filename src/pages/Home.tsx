import React, {useState, useEffect} from 'react';
import {
  Text, 
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData  {
  id: string;
  name: string;
}

export const Home = () => {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGretting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12) {
      setGretting('Good Morning!')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good Afternoon')
    } else {
      setGretting('Good Night')
    }
    
  }, []);

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills([...mySkills, data]);
  };

  const handleRemoveSkill= (id: string) => {
    const filterSkill = mySkills.filter(skill => skill.id !== id)
    setMySkills(filterSkill)
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Welcome, Luan</Text>
     
      <Text style={styles.greetings}>
        {greeting}
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      
      <Button onPress={handleAddNewSkill} title="Add"/>
      
      <Text style={[styles.title, {marginVertical: 50}]}>
        My Skills
      </Text>

      <FlatList 
        data={mySkills}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard  
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff'
  }
})