/**
 * Create aliases for the paths
 */
const aliases = (prefix: string = 'src'): Record<string, string> => ({
  '@auth': `${prefix}/@auth`,
  '@i18n': `${prefix}/@i18n`,
  '@fuse': `${prefix}/@fuse`,
  '@history': `${prefix}/@history`,
  "@mock-utils": `${prefix}/@mock-utils`,
  '@schema': `${prefix}/@schema`,
  '@': `${prefix}`
});

export default aliases;
