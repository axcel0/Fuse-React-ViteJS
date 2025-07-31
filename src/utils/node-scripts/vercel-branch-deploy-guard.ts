#!/usr/bin/env node

/**
 * Vercel Branch Deploy Guard
 * TypeScript version with enhanced logging and error handling
 *
 * This script is a deployment guard for Vercel, allowing deployment only from specified branches.
 * Add this script to vercel/settings/Ignored Build Step in the Vercel dashboard.
 * Select "Run my node script" and add the script as below:
 * "npx tsx src/utils/node-scripts/vercel-branch-deploy-guard.ts main,dev,skeleton"
 */

// ANSI Color codes for better terminal output
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	bright: '\x1b[1m',
	dim: '\x1b[2m'
} as const;

/**
 * Logs messages with color and emoji for better visibility
 */
const logger = {
	error: (message: string) => console.error(`${colors.red}${colors.bright}🛑 ${message}${colors.reset}`),
	success: (message: string) => console.log(`${colors.green}${colors.bright}✅ ${message}${colors.reset}`),
	info: (message: string) => console.log(`${colors.blue}${colors.bright}ℹ️  ${message}${colors.reset}`),
	warning: (message: string) => console.log(`${colors.yellow}${colors.bright}⚠️  ${message}${colors.reset}`),
	debug: (message: string) => console.log(`${colors.dim}${colors.cyan}🔍 ${message}${colors.reset}`)
};

/**
 * Main function to check branch deployment permissions
 */
function checkBranchDeployment(): void {
	logger.info('Vercel Branch Deploy Guard - TypeScript Edition');

	// Retrieve allowed branches as a comma-separated argument (e.g., "main,dev,skeleton")
	const allowedBranchesArg: string | undefined = process.argv[2];

	if (!allowedBranchesArg) {
		logger.error('No branches provided for deployment check.');
		logger.info('Usage: npx tsx vercel-branch-deploy-guard.ts "main,dev,skeleton"');
		process.exit(1); // Exit with error if no branches are specified
	}

	// Split the allowed branches into an array for validation
	const allowedBranches: string[] = allowedBranchesArg
		.split(',')
		.map((branch) => branch.trim())
		.filter((branch) => branch.length > 0);

	logger.debug(`Allowed branches: [${allowedBranches.join(', ')}]`);

	// Get the current branch from the Vercel environment variable
	const currentBranch: string | undefined = process.env.VERCEL_GIT_COMMIT_REF;

	if (!currentBranch) {
		logger.warning('VERCEL_GIT_COMMIT_REF is not defined.');
		logger.info('This might be a local build or manual deployment.');
		process.exit(0); // Exit with success if branch info is unavailable (allow deployment)
	}

	logger.debug(`Current branch from Vercel: '${currentBranch}'`);

	// Check if the current branch is in the allowed branches list
	if (allowedBranches.includes(currentBranch)) {
		logger.success(`Branch '${currentBranch}' is authorized for deployment.`);
		logger.info('🚀 Deployment will proceed...');
		process.exit(1); // Exit with code 1 to CONTINUE deployment (Vercel logic)
	} else {
		logger.error(`Branch '${currentBranch}' is NOT authorized for deployment.`);
		logger.info(`Allowed branches: [${allowedBranches.join(', ')}]`);
		logger.warning('🛑 Deployment will be skipped.');
		process.exit(0); // Exit with code 0 to SKIP deployment (Vercel logic)
	}
}

// Execute the main function when run directly
checkBranchDeployment();

export default checkBranchDeployment;
