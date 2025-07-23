import path from 'path';
import alias from './aliases';
import { aliasWebpack } from 'react-app-alias';
import type { Configuration } from 'webpack';

const SRC = './src';

/**
 * @description Create aliases for the paths
 */
const aliases = alias(SRC);

/**
 * @description Resolve the aliases to absolute paths
 */
const resolvedAliases = Object.fromEntries(
	Object.entries(aliases).map(([key, value]) => [key, path.resolve(process.cwd(), value)])
);

/**
 * @description Options for the aliasWebpack plugin
 */
const options = {
	alias: resolvedAliases
};

/**
 * @description Override the webpack config
 */
const override = (config: Configuration): Configuration => {
	if (!config.ignoreWarnings) {
		config.ignoreWarnings = [];
	}
	config.ignoreWarnings.push({ message: /Failed to parse source map/ });

	return aliasWebpack(options)(config);
};

export default override;
