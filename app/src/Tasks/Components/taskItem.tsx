import { View, Text } from 'react-native';

import styles from './style';
import type { Tasks } from './types';


export default function TaskItem({ task }: { task: Tasks }) {
    
  return (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{task.title}</Text>
    </View>
  );
}