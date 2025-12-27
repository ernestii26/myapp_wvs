import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, OpaqueColorValue } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/containers/hooks/useColorScheme'

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}>
					<Tabs.Screen
						name="(home)"
						options={{
							title: 'Home',
							tabBarIcon: ({ color }: {color: string | OpaqueColorValue}) => <IconSymbol size={28} name="house.fill" color={color} />,
						}}
					/>
					<Tabs.Screen
						name="profileself"
						options={{
							title: 'Profile',
							tabBarIcon: ({ color }: {color: string | OpaqueColorValue}) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
						}}
					/>
					<Tabs.Screen
						name="post/[postid]"
						options={{
							href: null,
							title: 'Post',
							tabBarIcon: ({ color }: {color: string | OpaqueColorValue}) => <IconSymbol size={28} name="house.fill" color={color} />,
						}}
					/>
		</Tabs>
	);
}
