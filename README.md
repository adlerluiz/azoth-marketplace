# Azoth Community Marketplace & Registry

Repositório central de **Drivers de IA**, **Assistentes de Código** e **Plugins** para a aplicação [Azoth / AI Hub](https://github.com/adlerluiz/ai-hub).

---

## 📁 Estrutura do Repositório

```text
azoth-marketplace/
├── registry.json                    # Índice consolidado consumido pelo aplicativo
├── drivers/                         # Drivers de IA
│   ├── cursor/
│   │   ├── manifest.json
│   │   ├── logo.png
│   │   └── README.md
│   ├── windsurf/
│   │   ├── manifest.json
│   │   ├── logo.png
│   │   └── README.md
│   └── ...
├── plugins/                         # Plugins e Extensões
│   ├── auto-git-sync/
│   │   ├── manifest.json
│   │   └── README.md
│   └── ...
└── scripts/
    └── build-registry.js            # Script para gerar registry.json a partir dos manifests
```

---

## 🚀 Como Adicionar um Novo Driver

1. Crie uma pasta dentro de `drivers/<nome-do-driver>/`.
2. Adicione o arquivo `manifest.json` com os metadados do driver:
   ```json
   {
     "$schema": "https://raw.githubusercontent.com/adlerluiz/azoth/main/schemas/driver.schema.json",
     "schemaVersion": "1.0.0",
     "version": "1.0.0",
     "id": "meu-assistente",
     "name": "Meu Assistente AI",
     "category": "IDE / Editor",
     "vendor": "Minha Empresa",
     "author": "Seu Nome",
     "description": "Integração do Meu Assistente com regras de código e MCP.",
     "rulesFormat": "markdown",
     "workspaceRulesLocation": ".meu-assistente/rules.md",
     "workspaceSkillsLocation": ".meu-assistente/skills/<name>/SKILL.md",
     "workspaceMcpConfigPath": "mcp.json",
     "docsUrl": "https://meu-assistente.dev/docs"
   }
   ```
3. Adicione `logo.png` (formato quadrado, ex: 48x48px) e `README.md`.
4. Execute `node scripts/build-registry.js` para atualizar o `registry.json`.
5. Abra um **Pull Request**!

---

## 🛠️ Como Gerar o Catálogo Localmente

```bash
node scripts/build-registry.js
```

O script atualizará automaticamente o arquivo `registry.json` consolidando todos os drivers e plugins das pastas.
