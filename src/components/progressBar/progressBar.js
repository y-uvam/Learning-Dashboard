import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, scales } from '../../utils';

export const ProgressBar = ({
  progress = 0,
  height = scales(8),
  trackColor = Colors.borderLight,
  progressColor = Colors.primary,
  style,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <View style={[styles.track, { height, backgroundColor: trackColor }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${normalizedProgress}%`,
            height,
            backgroundColor: normalizedProgress === 100 ? Colors.success : progressColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: scales(999),
    overflow: 'hidden',
  },
  fill: {
    borderRadius: scales(999),
  },
});

export default ProgressBar;
