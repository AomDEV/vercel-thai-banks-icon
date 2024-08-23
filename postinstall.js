const fs = require('fs');
const path = require('path');

const getModuleIconFolder = () => path.join(__dirname, 'node_modules', 'css-finances', 'svg');
const getStaticIconFolder = () => path.join(__dirname, 'public', 'icons');
async function main() {
    /* For Development */
    if (!fs.existsSync(getStaticIconFolder())) fs.mkdirSync(getStaticIconFolder());
    const files = fs.readdirSync(getModuleIconFolder());
    for (const file of files) {
        /* For Development */
        fs.copyFileSync(
            path.join(getModuleIconFolder(), file),
            path.join(getStaticIconFolder(), path.basename(file))
        );
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
})