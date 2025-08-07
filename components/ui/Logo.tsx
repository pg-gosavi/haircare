import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { Scissors } from 'lucide-react-native';

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 80 }: LogoProps) {
  const iconSize = size * 0.5;
  
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Scissors size={iconSize} color={COLORS.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});