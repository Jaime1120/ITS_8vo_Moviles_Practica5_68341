import React, { useState } from 'react';
import { StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { TextInput, Button, Card, Text, Title } from 'react-native-paper';
import { useRouter, Stack } from 'expo-router';
import { MotiView } from 'moti';
import { api } from '../services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!correo || !password || !confirmar) {
      return alert('Todos los campos son obligatorios');
    }

    if (password !== confirmar) {
      return alert('Las contraseñas no coinciden');
    }
    
    if (!isValidEmail(correo)) {
      return alert('Correo electrónico inválido');
    }

    if (password.length < 8) {
      return alert('La contraseña debe tener al menos 8 caracteres');
    }

    setLoading(true);
    try {
      await api.register(correo, password);
      router.replace('/');
    } catch (error) {
      alert('Error al registrar');
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
        blurRadius={4}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
          <MotiView
            from={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.title}>Crear Cuenta</Title>
                <Text style={styles.subtitle}>Regístrate para continuar</Text>

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
                <TextInput
                  label="Confirmar contraseña"
                  value={confirmar}
                  onChangeText={setConfirmar}
                  secureTextEntry
                  style={styles.input}
                  left={<TextInput.Icon icon="lock-check" />}
                />

                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}
                  labelStyle={{ fontWeight: 'bold' }}
                >
                  Registrarse
                </Button>

                <TouchableOpacity onPress={() => router.replace('/')}>
                  <Text style={styles.link}>¿Ya tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Inicia sesión</Text></Text>
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
    fontSize: 26,
    fontWeight: '900',
    color: '#1e88e5',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 8,
    backgroundColor: '#1e88e5',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#1e88e5',
  },
});
