# Instruções de Deploy - Bagomeu Next.js

O projeto foi migrado com sucesso para Next.js e está pronto para ser enviado para o GitHub e Vercel.

## 1. Subir para o GitHub

Como você já criou a pasta `bagomeu-next` no seu repositório, siga estes passos no terminal:

```bash
cd "c:\Users\Luciano\OneDrive - Imediato Soluções em Seguros\Imediato\bagomeu\bagomeu-next"

# Inicializar git se ainda não estiver (o create-next-app geralmente faz isso)
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Migração inicial para Next.js"

# Conectar ao seu repositório remoto (substitua URL_DO_SEU_REPO pela URL real)
# Exemplo: git remote add origin https://github.com/LucianoOtero/bagomeu-next.git
git remote add origin https://github.com/LucianoOtero/bagomeu-next.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

## 2. Deploy na Vercel

1.  Acesse [vercel.com](https://vercel.com) e faça login.
2.  Clique em **"Add New..."** -> **"Project"**.
3.  Importe o repositório `bagomeu-next` do seu GitHub.
4.  Nas configurações do projeto ("Configure Project"):
    *   **Framework Preset**: Next.js (deve ser detectado automaticamente).
    *   **Root Directory**: Certifique-se de que está apontando para a raiz do projeto Next.js (`bagomeu-next` se for um monorepo, ou `./` se você subiu apenas o conteúdo da pasta).
5.  Clique em **Deploy**.

## 3. Configuração do Google Maps

Para que o mapa funcione em produção (no domínio da Vercel), você precisará configurar a chave da API corretamente.

1.  No painel da Vercel, vá em **Settings** -> **Environment Variables**.
2.  Adicione uma nova variável (se você decidir usar variáveis de ambiente no futuro, por enquanto a chave está hardcoded no código para facilitar, mas certifique-se de restringir a chave no Google Cloud Console para aceitar apenas o domínio do seu site na Vercel).

**Importante**: A chave de API atual está no código. Para segurança, vá ao [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials) e restrinja a chave `AIzaSy...` para aceitar requisições apenas de:
*   `localhost:3000` (para testes locais)
*   `seu-projeto.vercel.app` (domínio final)
