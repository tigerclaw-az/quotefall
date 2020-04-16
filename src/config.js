export const logger = Object.freeze({
	isEnabled: true,
	logLevel: process.env.VUE_APP_LOG_LEVEL || 'debug',
	stringifyArguments: false,
	showLogLevel: true,
	showMethodName: true,
	separator: '|',
	showConsoleColors: true,
});

export const toast = Object.freeze({
	duration: 8000,
	iconPack: 'fontawesome',
});
