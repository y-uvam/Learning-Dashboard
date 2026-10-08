import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../assets';
import { Colors, CommonText, scales } from '../../utils';

export const OfflineBanner = ({ message = CommonText.offlineBannerMessage }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.dotContainer}>
        <View style={styles.dotOuter} />
        <View style={styles.dotInner} />
      </View>
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
    paddingVertical: scales(9),
    paddingHorizontal: scales(16),
  },
  dotContainer: {
    width: scales(16),
    height: scales(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scales(8),
  },
  dotOuter: {
    position: 'absolute',
    width: scales(14),
    height: scales(14),
    borderRadius: scales(7),
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
  },
  dotInner: {
    width: scales(8),
    height: scales(8),
    borderRadius: scales(4),
    backgroundColor: '#D97706',
  },
  text: {
    flex: 1,
    fontSize: scales(12),
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    color: '#92400E',
  },
});

export default OfflineBanner;
