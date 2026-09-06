const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DRIVERS_DIR = path.join(ROOT_DIR, 'drivers');
const PLUGINS_DIR = path.join(ROOT_DIR, 'plugins');
const OUTPUT_FILE = path.join(ROOT_DIR, 'registry.json');

const REPO_RAW_BASE = 'https://raw.githubusercontent.com/adlerluiz/azoth-marketplace/main';

function buildRegistry() {
  console.log('🔄 Construindo catálogo do Azoth Marketplace...');

  const registry = {
    $schema: 'https://raw.githubusercontent.com/adlerluiz/azoth/main/schemas/marketplace.schema.json',
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    name: 'Azoth Community Marketplace & Registry',
    description: 'Repositório central de drivers de IA, assistentes de código e plugins para o ecossistema Azoth / AI Hub.',
    drivers: [],
    plugins: []
  };

  // 1. Processar Drivers
  if (fs.existsSync(DRIVERS_DIR)) {
    const driverFolders = fs.readdirSync(DRIVERS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const folder of driverFolders) {
      const manifestPath = path.join(DRIVERS_DIR, folder, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        try {
          const raw = fs.readFileSync(manifestPath, 'utf-8');
          const manifest = JSON.parse(raw);

          const hasLogo = fs.existsSync(path.join(DRIVERS_DIR, folder, 'logo.png'));
          const hasReadme = fs.existsSync(path.join(DRIVERS_DIR, folder, 'README.md'));

          registry.drivers.push({
            id: manifest.id || folder,
            name: manifest.name || folder,
            version: manifest.version || '1.0.0',
            author: manifest.author || manifest.vendor || 'Community',
            vendor: manifest.vendor,
            category: manifest.category || 'Custom',
            description: manifest.description || '',
            iconUrl: hasLogo ? `${REPO_RAW_BASE}/drivers/${folder}/logo.png` : undefined,
            manifestUrl: `${REPO_RAW_BASE}/drivers/${folder}/manifest.json`,
            docsUrl: manifest.docsUrl,
            readmeUrl: hasReadme ? `${REPO_RAW_BASE}/drivers/${folder}/README.md` : undefined,
            tags: manifest.tags || []
          });
          console.log(`  ✓ Driver adicionado: ${manifest.name || folder}`);
        } catch (e) {
          console.warn(`  ⚠️ Erro ao processar driver em ${folder}:`, e.message);
        }
      }
    }
  }

  // 2. Processar Plugins
  if (fs.existsSync(PLUGINS_DIR)) {
    const pluginFolders = fs.readdirSync(PLUGINS_DIR, { withFileTypes: true })
      .filter(p => p.isDirectory())
      .map(p => p.name);

    for (const folder of pluginFolders) {
      const manifestPath = path.join(PLUGINS_DIR, folder, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        try {
          const raw = fs.readFileSync(manifestPath, 'utf-8');
          const manifest = JSON.parse(raw);

          const hasLogo = fs.existsSync(path.join(PLUGINS_DIR, folder, 'logo.png'));
          const hasReadme = fs.existsSync(path.join(PLUGINS_DIR, folder, 'README.md'));

          registry.plugins.push({
            id: manifest.id || folder,
            name: manifest.name || folder,
            version: manifest.version || '1.0.0',
            author: manifest.author || 'Community',
            category: manifest.category || 'Automation',
            description: manifest.description || '',
            iconUrl: hasLogo ? `${REPO_RAW_BASE}/plugins/${folder}/logo.png` : undefined,
            manifestUrl: `${REPO_RAW_BASE}/plugins/${folder}/manifest.json`,
            readmeUrl: hasReadme ? `${REPO_RAW_BASE}/plugins/${folder}/README.md` : undefined,
            tags: manifest.tags || []
          });
          console.log(`  ✓ Plugin adicionado: ${manifest.name || folder}`);
        } catch (e) {
          console.warn(`  ⚠️ Erro ao processar plugin em ${folder}:`, e.message);
        }
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2), 'utf-8');
  console.log(`\n🎉 registry.json gerado com sucesso! (${registry.drivers.length} drivers, ${registry.plugins.length} plugins)`);
}

buildRegistry();
