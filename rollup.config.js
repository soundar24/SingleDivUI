import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';

const baseConfig = {
	input: 'src/index.js',
	plugins: [
		replace({
			"__VERSION__": pkg.version
		}),
		filesize()
	]
};

const umdConfig = Object.assign({}, baseConfig, {
	output: {
		name: 'SingleDivUI',
		file: pkg.main,
	  	format: 'umd'
	},
	plugins: [
		...baseConfig.plugins,
		babel({
			presets: ['@babel/preset-env']
		}),
		uglify()
	]
});

const esConfig = Object.assign({}, baseConfig, {
	output: {
	  file: pkg.module,
	  format: 'es'
	}
});

export default [
	// browser-friendly UMD build
	umdConfig,
	// ES module (for bundlers)
	esConfig
];
