module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					'@atoms': './src/components/atoms',
					'@molecules': './src/components/molecules',
					'@organisms': './src/components/organisms',
					'@assets': './src/assets',
					'@screens': './src/screens',
					'@api': './src/api',
					'@context': './src/context',
					'@hooks': './src/hooks',
					'@primitives': './src/primitives',
					'@services': './src/services',
					'@routes': './src/routes',
					'@types': './src/types',
					'@slices': './src/slices',
					'@helpers': './src/helpers',
				},
			},
		],
	],
    env: {
		production: {
			plugins: ['react-native-paper/babel'],
		},
    },
};
