# Plan de Implementación - AoE2 Strategies App

## 📋 Resumen Ejecutivo

**Objetivo:** App móvil React Native con estrategias de Age of Empires 2, planes de construcción y timer visual.

**Stack:** React Native + Expo + TypeScript + React Navigation + AsyncStorage

**Duración estimada:** 4-5 horas de desarrollo

**Filosofía:** Cada fase es testeable, no se implementan muchos archivos, máximo control del usuario.

---

## 🎯 Fases de Implementación

### FASE 0: Setup & Estructura Base
**Duración:** 30 minutos  
**Objetivo:** Proyecto funcional con estructura lista

#### Paso 0.1: Verificar dependencias
```bash
node --version    # Debe ser >= 16
npm --version
git --version
```

**Si falta Node.js:**
```bash
sudo apt update
sudo apt install nodejs npm
```

#### Paso 0.1b: Scaffold del proyecto Expo (TypeScript)
El plan original asume un `package.json` ya existente para los pasos
siguientes; en la práctica hace falta generarlo primero:
```bash
# En un directorio temporal (create-expo-app no sobreescribe archivos
# existentes como CLAUDE.md/LICENSE), luego copiar lo generado al repo:
npx create-expo-app@latest . --template blank-typescript
```
Genera `package.json`, `App.tsx`, `app.json`, `index.ts`, `tsconfig.json`,
`assets/` y `.gitignore`. Copiar estos archivos al repo raíz (sin pisar
`CLAUDE.md`, `LICENSE`, `docs/`) y correr `npm install` ahí.

#### Paso 0.2: Crear estructura de carpetas
```bash
# Dentro del repo raíz
mkdir -p src/{screens,components,data,utils,styles}
mkdir -p src/screens/{Home,Strategies,Calculator}
```

**Estructura esperada:**
```
aoe2-app/
├── src/
│   ├── screens/
│   │   ├── Home/
│   │   │   └── HomeScreen.tsx
│   │   ├── Strategies/
│   │   │   └── StrategiesScreen.tsx
│   │   └── Calculator/
│   │       └── CalculatorScreen.tsx
│   ├── components/
│   ├── data/
│   ├── utils/
│   └── styles/
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

#### Paso 0.3: Instalar dependencias de navegación
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-tab-icons  # Opcional para iconos
```

#### Paso 0.4: Crear punto de entrada simple (App.tsx)
**Archivo:** `App.tsx`
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>AoE2 Strategies</Text>
      <Text style={{ marginTop: 10 }}>App iniciada correctamente</Text>
    </View>
  );
}
```

#### Paso 0.5: Crear CLAUDE.md
Documentar en `CLAUDE.md` (raíz del repo) el stack, las fases del plan y la
arquitectura, para que futuras sesiones de Claude Code tengan contexto
inmediato del proyecto sin tener que releer todo el plan.

#### Paso 0.6: Asociar licencia de software
Agregar un archivo `LICENSE` en la raíz del repo con la licencia MIT
(permisiva, uso comercial y modificación permitidos manteniendo el aviso de
copyright), y referenciarla en el `package.json` (`"license": "MIT"`) una vez
exista.

#### Paso 0.7: Configurar .gitignore
Usar el `.gitignore` generado por `create-expo-app` (node_modules/, .expo/,
dist/, archivos nativos generados /ios /android, .env*.local, etc.) para que
no se trackeen artefactos de build ni dependencias.

#### ✅ Criterios de éxito Fase 0:
- [x] `npm start` ejecuta sin errores (Metro Bundler levanta en localhost:8081)
- [ ] App abre en emulador o en celular (Expo QR) — pendiente de verificar en dispositivo/emulador real
- [x] Se ve el texto "AoE2 Strategies" en pantalla (App.tsx actualizado)
- [ ] Hot reload funciona (cambiar texto y guardar recarga automático) — pendiente de verificar en dispositivo/emulador real
- [x] `CLAUDE.md` creado con guía del proyecto
- [x] `LICENSE` (MIT) creado en la raíz del repo
- [x] `.gitignore` configurado (node_modules, .expo, builds nativos, etc.)

---

### FASE 1: Navegación Básica
**Duración:** 1 hora  
**Objetivo:** Navegar entre 3 pantallas vacías

#### Paso 1.1: Crear archivos de pantallas (vacíos)
**Archivo:** `src/screens/Home/HomeScreen.tsx`
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home</Text>
    </View>
  );
}
```

**Archivo:** `src/screens/Strategies/StrategiesScreen.tsx`
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function StrategiesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Strategies</Text>
    </View>
  );
}
```

**Archivo:** `src/screens/Calculator/CalculatorScreen.tsx`
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export default function CalculatorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calculator</Text>
    </View>
  );
}
```

#### Paso 1.2: Configurar React Navigation (Bottom Tabs)
**Reemplazar:** `App.tsx`
```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home/HomeScreen';
import StrategiesScreen from './src/screens/Strategies/StrategiesScreen';
import CalculatorScreen from './src/screens/Calculator/CalculatorScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen
          name="Strategies"
          component={StrategiesScreen}
          options={{ title: 'Estrategias' }}
        />
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{ title: 'Calculadora' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

#### ✅ Criterios de éxito Fase 1:
- [x] App muestra 3 tabs en la parte inferior
- [x] Cada tab tiene su nombre (Inicio, Estrategias, Calculadora)
- [x] Al tocar cada tab, cambia de pantalla
- [ ] Hot reload sigue funcionando
- [x] No hay errores en la consola

---

### FASE 2: Data & Mock - Estrategias Básicas
**Duración:** 30 minutos  
**Objetivo:** Mostrar lista de estrategias con datos mock

#### Paso 2.1: Crear archivo de datos mock
**Archivo:** `src/data/strategies.json`
```json
[
  {
    "id": "1",
    "civ": "Britons",
    "strategy": "Feudal Scout Rush",
    "timing": "14:30",
    "steps": [
      "Villagers 4 sheep",
      "Advance a los 16-17",
      "Crear barracks",
      "Scout rush con 3-4 scouts"
    ]
  },
  {
    "id": "2",
    "civ": "Franks",
    "strategy": "Castle Push",
    "timing": "22:00",
    "steps": [
      "Villagers 4 deer + forage",
      "Avanzar rápido",
      "Castillo temprano",
      "Paladines"
    ]
  },
  {
    "id": "3",
    "civ": "Aztecs",
    "strategy": "Archer Mass",
    "timing": "18:00",
    "steps": [
      "Flush arqueado normal",
      "Muchos arqueadores",
      "Upgrades armor"
    ]
  }
]
```

#### Paso 2.2: Crear componente BuildOrderCard (reutilizable)
**Archivo:** `src/components/BuildOrderCard.tsx`
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BuildOrderCardProps {
  civ: string;
  strategy: string;
  timing: string;
}

export default function BuildOrderCard({ civ, strategy, timing }: BuildOrderCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.civName}>{civ}</Text>
      <Text style={styles.strategy}>{strategy}</Text>
      <Text style={styles.timing}>⏱️ {timing}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a574',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  civName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  strategy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timing: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
```

#### Paso 2.3: Actualizar StrategiesScreen para mostrar lista
**Reemplazar:** `src/screens/Strategies/StrategiesScreen.tsx`
```tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import strategies from '../../data/strategies.json';
import BuildOrderCard from '../../components/BuildOrderCard';

export default function StrategiesScreen() {
  return (
    <ScrollView style={styles.container}>
      {strategies.map((strat) => (
        <BuildOrderCard
          key={strat.id}
          civ={strat.civ}
          strategy={strat.strategy}
          timing={strat.timing}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
});
```

#### ✅ Criterios de éxito Fase 2:
- [x] Tab "Estrategias" muestra 3 tarjetas (Britons, Franks, Aztecs)
- [x] Cada tarjeta tiene: civ name, strategy, timing
- [x] Las tarjetas son scrolleables
- [x] Las tarjetas se ven bien formateadas
- [x] No hay errores de JSON parsing

Verificado vía `tsc --noEmit`, `npm test` (`BuildOrderCard.test.tsx` y
`StrategiesScreen.test.tsx` con `jest.mock()`) y `npm run lint`; comiteado
en `7e63e51`. No confirmado explícitamente en pantalla de un dispositivo
físico (a diferencia de la Fase 1, que sí se vio en Expo Go).

---

### FASE 3: Timer Visual
**Duración:** 1 hora  
**Objetivo:** Crear componente Timer reutilizable y funcional

#### Paso 3.1: Crear componente Timer
**Archivo:** `src/components/Timer.tsx`
```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TimerProps {
  initialTime: string; // "14:30" format
  onComplete?: () => void;
}

export default function Timer({ initialTime, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const [mins, secs] = prev.split(':').map(Number);
        let totalSecs = mins * 60 + secs - 1;

        if (totalSecs < 0) {
          setIsRunning(false);
          onComplete?.();
          return '0:00';
        }

        const newMins = Math.floor(totalSecs / 60);
        const newSecs = totalSecs % 60;
        return `${newMins}:${newSecs.toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeDisplay}>{timeLeft}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning && styles.buttonStop]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 16,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#d4a574',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#d4a574',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonStop: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
```

#### Paso 3.2: Integrar Timer en CalculatorScreen
**Reemplazar:** `src/screens/Calculator/CalculatorScreen.tsx`
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from '../../components/Timer';

export default function CalculatorScreen() {
  const handleTimerComplete = () => {
    console.log('Timer completado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build Order Timer</Text>
      <Timer initialTime="14:30" onComplete={handleTimerComplete} />
      <Text style={styles.description}>
        Prueba los botones Iniciar, Pausar y Reset
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 12,
  },
});
```

#### ✅ Criterios de éxito Fase 3:
- [x] Timer muestra tiempo inicial "14:30" (tomado de `strategies[0].timing`,
      no hardcodeado — ver nota abajo)
- [x] Botón "Iniciar" comienza la cuenta regresiva
- [x] Tiempo disminuye cada segundo (puedes ver "14:29", "14:28", etc.)
- [x] Botón "Pausar" detiene el timer
- [x] Botón "Reset" vuelve a "14:30"
- [x] Cuando llega a 0, se detiene automáticamente (bug de off-by-one-tick
      del template original corregido — ver nota abajo)
- [x] No hay lag ni consumo excesivo de CPU

Verificado con TDD (`Timer.test.tsx`, `time.test.ts`, `CalculatorScreen.test.tsx`
con `jest.useFakeTimers()`), `tsc --noEmit`, `npm run lint`, `prettier --check`.
No confirmado explícitamente en pantalla de un dispositivo físico.

**Cambios respecto al template original de este documento:** (1) el estado
interno ahora es un número de segundos (`src/utils/time.ts` convierte
`"mm:ss"` ↔ segundos una sola vez, no en cada tick), lo que elimina el bug
conocido donde el timer tardaba un tick extra en detenerse al llegar a 0;
(2) `CalculatorScreen` ya no hardcodea `initialTime="14:30"`, sino que usa
`strategies[0].timing` — deja el Timer conectado a datos reales en vez de
un valor de ejemplo suelto.

---

### FASE 4: Almacenamiento Local (AsyncStorage)
**Duración:** 30 minutos  
**Objetivo:** Guardar/cargar favoritos persistentemente

#### Paso 4.1: Instalar AsyncStorage
```bash
npm install @react-native-async-storage/async-storage
```

#### Paso 4.2: Crear utilidad de almacenamiento
**Archivo:** `src/utils/storage.ts`
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@aoe2_favorites';

export async function getFavorites(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
}

export async function addFavorite(civId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(civId)) {
      favorites.push(civId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
}

export async function removeFavorite(civId: string): Promise<void> {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((id) => id !== civId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
}

export async function isFavorite(civId: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(civId);
}
```

#### Paso 4.3: Actualizar BuildOrderCard con botón favorito
**Reemplazar:** `src/components/BuildOrderCard.tsx`
```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { addFavorite, removeFavorite, isFavorite } from '../utils/storage';

interface BuildOrderCardProps {
  id: string;
  civ: string;
  strategy: string;
  timing: string;
}

export default function BuildOrderCard({
  id,
  civ,
  strategy,
  timing,
}: BuildOrderCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const isFav = await isFavorite(id);
    setFavorite(isFav);
  };

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
    setFavorite(!favorite);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.civName}>{civ}</Text>
        <Text style={styles.strategy}>{strategy}</Text>
        <Text style={styles.timing}>⏱️ {timing}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.starButton}>
        <Text style={styles.starText}>{favorite ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a574',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  civName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  strategy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timing: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  starButton: {
    padding: 8,
  },
  starText: {
    fontSize: 24,
  },
});
```

#### Paso 4.4: Actualizar StrategiesScreen
**Reemplazar:** `src/screens/Strategies/StrategiesScreen.tsx`
```tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import strategies from '../../data/strategies.json';
import BuildOrderCard from '../../components/BuildOrderCard';

export default function StrategiesScreen() {
  return (
    <ScrollView style={styles.container}>
      {strategies.map((strat) => (
        <BuildOrderCard
          key={strat.id}
          id={strat.id}
          civ={strat.civ}
          strategy={strat.strategy}
          timing={strat.timing}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
});
```

#### ✅ Criterios de éxito Fase 4:
- [ ] Cada estrategia muestra un botón de estrella (☆)
- [ ] Al tocar la estrella, cambia a ⭐ (llena)
- [ ] Al tocar nuevamente, vuelve a ☆ (vacía)
- [ ] Si cierras la app y la abres nuevamente, los favoritos persisten
- [ ] No hay errores al guardar/cargar

---

### FASE 5: Pulido & UI/UX
**Duración:** 1 hora  
**Objetivo:** Mejorar la apariencia y experiencia

#### Paso 5.1: Crear archivo de estilos globales
**Archivo:** `src/styles/colors.ts`
```typescript
export const colors = {
  primary: '#d4a574',      // Gold AoE2
  secondary: '#8b7355',    // Brown
  accent: '#ff6b6b',       // Red
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
};
```

#### Paso 5.2: Actualizar HomeScreen con intro
**Reemplazar:** `src/screens/Home/HomeScreen.tsx`
```tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚔️ AoE2 Strategies</Text>
        <Text style={styles.subtitle}>Build Orders & Timings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Cómo usar</Text>
        <Text style={styles.text}>
          1. Ve a "Estrategias" para ver los build orders{'\n'}
          2. Marca favoritos con ⭐{'\n'}
          3. Usa el Timer en "Calculadora" para seguir el timing{'\n'}
          4. ¡Domina el juego!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Civs Disponibles</Text>
        <Text style={styles.text}>Britons, Franks, Aztecs y más...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.surface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.surface,
    opacity: 0.9,
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
```

#### Paso 5.3: Añadir opciones de pantalla mejoradas
**Reemplazar:** `App.tsx` (solo la parte de Tab.Screen options)
```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home/HomeScreen';
import StrategiesScreen from './src/screens/Strategies/StrategiesScreen';
import CalculatorScreen from './src/screens/Calculator/CalculatorScreen';
import { colors } from './src/styles/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.primary,
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            tabBarLabel: 'Inicio',
          }}
        />
        <Tab.Screen
          name="Strategies"
          component={StrategiesScreen}
          options={{
            title: 'Estrategias',
            tabBarLabel: 'Estrategias',
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            title: 'Timer',
            tabBarLabel: 'Timer',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

#### ✅ Criterios de éxito Fase 5:
- [ ] HomeScreen se ve profesional con colores AoE2
- [ ] Headers de pantallas tienen color gold
- [ ] Tabs están coloreados correctamente
- [ ] Todo el UI es consistente
- [ ] La app se ve visualmente atractiva
- [ ] Sin errores visuales

---

## 🧪 Testing por Fase

### Checklist de Testing

**Después de CADA FASE, verifica:**

```
General:
- [ ] npm start sin errores
- [ ] Hot reload funciona
- [ ] App responde a toques
- [ ] No hay warnings en consola

Fase 0:
- [x] Estructura de carpetas correcta
- [x] App abre sin errores (Metro Bundler arranca; falta probar en dispositivo/emulador)

Fase 1:
- [x] Navegación entre tabs funciona
- [x] Tab names aparecen correctamente

Fase 2:
- [x] 3 tarjetas visibles
- [x] Scroll funciona
- [x] Datos se cargan correctamente

Fase 3:
- [x] Timer inicia y cuenta hacia atrás
- [x] Pausar/Reset funcionan
- [x] Sin lag en animaciones

Fase 4:
- [ ] Favoritos se guardan
- [ ] Favoritos persisten al recargar
- [ ] Sin errores en AsyncStorage

Fase 5:
- [ ] UI se ve bien
- [ ] Colores consistentes
- [ ] Headers visibles
```

---

## 📦 Checklist Final de Archivos a Crear

```
Fase 0:
- [x] src/screens/Home/HomeScreen.tsx
- [x] src/screens/Strategies/StrategiesScreen.tsx
- [x] src/screens/Calculator/CalculatorScreen.tsx
- [x] CLAUDE.md
- [x] LICENSE (MIT)

Fase 1:
- [x] App.tsx (actualizado con navegación)

Fase 2:
- [x] src/data/strategies.json
- [x] src/components/BuildOrderCard.tsx
- [x] src/screens/Strategies/StrategiesScreen.tsx (actualizado)

Fase 3:
- [x] src/components/Timer.tsx
- [x] src/screens/Calculator/CalculatorScreen.tsx (actualizado)
- [x] src/utils/time.ts (no estaba en el plan original; agregado para
      centralizar la conversión entre `mm:ss` y segundos, y evitar el bug
      de off-by-one-tick)

Fase 4:
- [ ] src/utils/storage.ts
- [ ] src/components/BuildOrderCard.tsx (actualizado)
- [ ] src/screens/Strategies/StrategiesScreen.tsx (actualizado)

Fase 5:
- [ ] src/styles/colors.ts
- [ ] src/screens/Home/HomeScreen.tsx (actualizado)
- [ ] App.tsx (actualizado con estilos)
```

---

## 🚀 Próximos Pasos (Fuera de Scope)

Una vez completadas estas 5 fases, puedes agregar:

- Detalles expandibles de estrategias (pantalla de detail)
- Búsqueda/filtrado por civilización
- Categorías de estrategias (Early Game, Mid Game, Late Game)
- Integración con API de AoE2 para estadísticas
- Soporte para agregar estrategias custom
- Notificaciones/alarmas para el timer
- Temas oscuro/claro
- Multiidioma (ES/EN)

---

## 📞 Comandos Útiles

```bash
# Iniciar desarrollo
npm start

# Crear APK para Android (después de completar fases)
eas build --platform android

# Crear IPA para iOS (después de completar fases)
eas build --platform ios

# Limpiar caché
npm start -- --clear

# Instalar paquetes adicionales
npm install [nombre-paquete]
```

---

**Versión:** 1.0  
**Última actualización:** 2024  
**Estado:** Listo para implementación con Claude Code
