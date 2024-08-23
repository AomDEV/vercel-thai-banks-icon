const fs = require('fs');
const path = require('path');

const getModuleIconFolder = () => path.join(__dirname, 'node_modules', 'css-finances', 'svg');
const getVercelIconFolder = () => path.join(__dirname, '.vercel', 'output', 'static', 'icons')
const getStaticIconFolder = () => path.join(__dirname, 'public', 'icons');
async function main() {
    /* For Development */
    if (!fs.existsSync(getStaticIconFolder())) fs.mkdirSync(getStaticIconFolder());
    /* For Vercel */
    if (!fs.existsSync(getVercelIconFolder())) fs.mkdirSync(getVercelIconFolder());
    const files = fs.readdirSync(getModuleIconFolder());
    for (const file of files) {
        /* For Development */
        fs.copyFileSync(
            path.join(getModuleIconFolder(), file),
            path.join(getStaticIconFolder(), path.basename(file))
        );
        /* For Vercel */
        fs.copyFileSync(
            path.join(getModuleIconFolder(), file),
            path.join(getVercelIconFolder(), path.basename(file))
        );
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
})