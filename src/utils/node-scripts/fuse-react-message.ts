/**
 * Fuse React Development Message
 * TypeScript version with Polytron-style pattern
 * Enhanced with colors and EV branding
 */

// ANSI Color codes
const colors = {
	reset: '\x1b[0m',
	red: '\x1b[31m',
	blue: '\x1b[34m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
	bright: '\x1b[1m',
	dim: '\x1b[2m'
} as const;

const displayWelcomeMessage = (): void => {
	console.log(`
${colors.red}${colors.bright}██████╗  ██████╗ ██╗  ██╗   ██╗████████╗██████╗  ██████╗ ███╗   ██╗${colors.reset}
${colors.red}██╔══██╗██╔═══██╗██║  ╚██╗ ██╔╝╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║${colors.reset}
${colors.red}██████╔╝██║   ██║██║   ╚████╔╝    ██║   ██████╔╝██║   ██║██╔██╗ ██║${colors.reset}
${colors.red}██╔═══╝ ██║   ██║██║    ╚██╔╝     ██║   ██╔══██╗██║   ██║██║╚██╗██║${colors.reset}
${colors.red}██║     ╚██████╔╝███████╗██║      ██║   ██║  ██║╚██████╔╝██║ ╚████║${colors.reset}
${colors.red}╚═╝      ╚═════╝ ╚══════╝╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝${colors.reset}
                                                                    
                        ${colors.blue}${colors.bright}███████╗██╗   ██╗${colors.reset}
                        ${colors.blue}██╔════╝██║   ██║${colors.reset}
                        ${colors.blue}█████╗  ██║   ██║${colors.reset}
                        ${colors.blue}██╔══╝  ╚██╗ ██╔╝${colors.reset}
                        ${colors.blue}███████╗ ╚████╔╝ ${colors.reset}
                        ${colors.blue}╚══════╝  ╚═══╝  ${colors.reset}
                   ${colors.dim}${colors.blue}Electrical Vehicle Platform${colors.reset}

╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  🚀 ${colors.green}FUSE REACT DEVELOPMENT MODE${colors.reset}                                   ║
║                                                                   ║
║  📊 You are running a development build of Fuse React             ║
║                                                                   ║
║  🌐 Learn more about Fuse React:                                  ║
║     ${colors.cyan}https://fusetheme.com/admin-templates/react/${colors.reset}                  ║
║                                                                   ║
║  💻 Get GitHub invitation for future updates:                     ║
║     ${colors.cyan}http://support.withinpixels.com/github${colors.reset}                        ║
║                                                                   ║
║  💰 Pricing information and FAQs:                                 ║
║     ${colors.cyan}https://fusetheme.com/pricing/${colors.reset}                                ║
║                                                                   ║
║  ⚡ Enhanced with ${colors.yellow}TypeScript${colors.reset} & ${colors.yellow}Modern Development Tools${colors.reset}           ║
║                                                                   ║
║  🎉 Thanks for choosing ${colors.red}${colors.bright}Polytron${colors.reset} ${colors.blue}EV${colors.reset} Fuse React!                   ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

${colors.green}🔥 Development server starting...${colors.reset}
${colors.cyan}📦 Hot Module Replacement enabled${colors.reset}
${colors.yellow}🎯 TypeScript compilation active${colors.reset}
${colors.bright}✨ Ready for development!${colors.reset}
`);
};

// Execute the welcome message
displayWelcomeMessage();

export default displayWelcomeMessage;
