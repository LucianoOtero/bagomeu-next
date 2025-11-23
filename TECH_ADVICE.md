# Conselhos Técnicos: Workflow e Stack Tecnológica

Este documento consolida as recomendações sobre fluxos de trabalho de deploy e escolha de tecnologia para projetos web modernos.

## 1. Workflow de Deploy Profissional (Vercel)

Para ter controle total entre ambientes de desenvolvimento e produção, recomenda-se abandonar o uso direto do branch `main` para desenvolvimento diário.

### O Conceito
*   **Production (Produção):** O site oficial. Atualizado apenas quando o código é aprovado e estável.
*   **Preview (Desenvolvimento/Staging):** Ambientes temporários idênticos à produção para testes.

### O Fluxo Recomendado (Git Flow Simplificado)

1.  **Branch de Desenvolvimento (`develop`):**
    *   Crie um branch separado: `git checkout -b develop`
    *   Todo o trabalho diário, testes e correções acontecem aqui.
    *   Ao fazer `git push origin develop`, a Vercel cria automaticamente um **Link de Preview** (ex: `projeto-git-develop.vercel.app`).
    *   Use esse link para validar alterações visualmente e compartilhar com stakeholders.

2.  **Promoção para Produção (`main`):**
    *   Apenas quando o branch `develop` estiver testado e aprovado.
    *   Faça o merge:
        ```bash
        git checkout main
        git merge develop
        git push origin main
        ```
    *   Isso dispara o deploy oficial para o domínio final.

### Variáveis de Ambiente
Configure variáveis diferentes no painel da Vercel para cada ambiente:
*   **Development:** Banco de dados de teste, chaves de API de sandbox.
*   **Production:** Banco de dados real, chaves de API de produção.

---

## 2. Next.js vs. React + Vite: Qual escolher?

A escolha depende do que você define como "performance" para o seu projeto específico.

### Next.js (Server-Side Rendering - SSR)
**O Campeão da Performance de Carregamento e SEO.**

*   **Como funciona:** O servidor monta o HTML antes de enviar para o usuário.
*   **Pontos Fortes:**
    *   **Carregamento Inicial (FCP):** O usuário vê o conteúdo quase instantaneamente.
    *   **SEO:** O Google indexa o conteúdo com facilidade máxima.
    *   **Otimizações Nativas:** Imagens, fontes e scripts são otimizados automaticamente.
*   **Melhor para:** Sites públicos, E-commerce, Blogs, Portais de Notícias, Landing Pages.
*   **Veredito:** Essencial para o **Bagomeu** e qualquer projeto que precise ser encontrado no Google.

### React + Vite (Client-Side Rendering - CSR)
**O Campeão da Performance de Desenvolvimento e Interatividade.**

*   **Como funciona:** O navegador baixa um "esqueleto" vazio e o JavaScript desenha a tela.
*   **Pontos Fortes:**
    *   **Navegação:** Sensação de aplicativo nativo (instantânea) após o primeiro carregamento.
    *   **Desenvolvimento:** O ambiente local (HMR) é extremamente rápido.
    *   **Custo/Simplicidade:** Pode ser hospedado em qualquer servidor de arquivos estáticos (custo zero ou muito baixo).
*   **Melhor para:** Dashboards administrativos, Sistemas SaaS (atrás de login), Apps complexos (SPAs) onde SEO não é prioridade.
