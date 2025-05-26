import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { View } from 'react-native';

interface ReusableStatusBarProps {
  style?: StatusBarStyle;
  backgroundColor?: string;
  translucent?: boolean;
}

const ReusableStatusBar: React.FC<ReusableStatusBarProps> = ({
  style = 'dark',
  backgroundColor = 'transparent',
  translucent = false,
}) => {
  return (
    <>
      {/* Background view for status bar area */}
      {backgroundColor !== 'transparent' && (
        <View
          style={{
            backgroundColor,
            height: 44,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
      <StatusBar style={style} translucent={translucent} />
    </>
  );
};

export default ReusableStatusBar;
