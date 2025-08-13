import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { useTheme } from '../contexts/ThemeContext';

export const Demo: React.FC = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Digital Learning Platform - Component Demo
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          This demonstrates all the UI components working together
        </Text>

        {/* Button Variants */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Button Variants</Text>
          <View style={styles.buttonRow}>
            <Button title="Primary" onPress={() => {}} variant="primary" />
            <Button title="Secondary" onPress={() => {}} variant="secondary" />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Outline" onPress={() => {}} variant="outline" />
            <Button title="Ghost" onPress={() => {}} variant="ghost" />
          </View>
          <View style={styles.buttonRow}>
            <Button title="Small" onPress={() => {}} size="small" />
            <Button title="Medium" onPress={() => {}} size="medium" />
            <Button title="Large" onPress={() => {}} size="large" />
          </View>
          <Button 
            title="Loading Button" 
            onPress={() => {}} 
            loading={true} 
            fullWidth 
            style={styles.fullWidthButton}
          />
        </Card>

        {/* Input Variants */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Input Components</Text>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            leftIcon={<Text style={styles.inputIcon}>👤</Text>}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            leftIcon={<Text style={styles.inputIcon}>📧</Text>}
            error="Please enter a valid email"
          />
          <Input
            label="Message"
            placeholder="Enter your message"
            value={formData.message}
            onChangeText={(text) => handleInputChange('message', text)}
            leftIcon={<Text style={styles.inputIcon}>💬</Text>}
            multiline
            numberOfLines={3}
          />
        </Card>

        {/* Card Variants */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Card Variants</Text>
          <View style={styles.cardRow}>
            <Card variant="elevated" style={styles.smallCard}>
              <Text style={[styles.cardText, { color: colors.text }]}>Elevated Card</Text>
            </Card>
            <Card variant="outlined" style={styles.smallCard}>
              <Text style={[styles.cardText, { color: colors.text }]}>Outlined Card</Text>
            </Card>
            <Card variant="filled" style={styles.smallCard}>
              <Text style={[styles.cardText, { color: colors.text }]}>Filled Card</Text>
            </Card>
          </View>
        </Card>

        {/* Form Submission */}
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Form Submission</Text>
          <Button
            title="Submit Form"
            onPress={handleSubmit}
            variant="primary"
            fullWidth
            style={styles.submitButton}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  fullWidthButton: {
    marginTop: 8,
  },
  inputIcon: {
    fontSize: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 8,
  },
}); 