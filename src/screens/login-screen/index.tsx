import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Login from '@organisms/login/login.organism';
import Layout from '@molecules/layout/layout.molecule';

export default function LoginScreen() {
	const layout = {
		menu: false,
		search: false,
		back: true,
		logo: 'https://gostor.com/icons/header/logo-invert.svg',
		cart: false,
		pincode: false
	};
	return <Login />;
}
