import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, CommonText, scales } from '../../utils';

export const OfflineBanner = ({ message = CommonText.offlineBannerMessage }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
    paddingVertical: scales(8),
    paddingHorizontal: scales(16),
  },
  icon: {
    fontSize: scales(14),
    marginRight: scales(8),
  },
  text: {
    flex: 1,
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    color: '#92400E',
  },
});

export default OfflineBanner;
