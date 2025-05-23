import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, Card, Text, Title } from 'react-native-paper';
import { useRouter, Stack } from 'expo-router';
import { MotiView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { api } from '../services/api';

export default function LoginScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!correo || !password) {
      return alert('Todos los campos son obligatorios');
    }

    if (!isValidEmail(correo)) {
      return alert('Correo electrónico inválido');
    }

    setLoading(true);
    try {
      await api.login(correo, password);
      router.replace('/inicio');
    } catch (error) {
      alert('Usuario o contraseña incorrecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1080&q=80' }}
        style={styles.background}
        blurRadius={3}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
          <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>Bienvenido</Title>
                <Text style={styles.subtitle}>Accede a tus notas</Text>

                <TextInput
                  label="Correo electrónico"
                  value={correo}
                  onChangeText={setCorreo}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                  label="Contraseña"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  left={<TextInput.Icon icon="lock" />}
                />

                <Button
                  mode="contained"
                  onPress={handleLogin}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  Iniciar sesión
                </Button>

                <TouchableOpacity onPress={() => router.replace('/register')}>
                  <Text style={styles.link}>¿No tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Regístrate</Text></Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </MotiView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#ffffffee',
    elevation: 10,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 8,
    backgroundColor: '#6200ee',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6200ee',
  },
});
