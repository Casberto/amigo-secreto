# 🎁 Amigo Secreto

Site estático (3 arquivos, sem dependências) para sortear amigo secreto e mandar um link para cada pessoa.

## Arquivos

- `index.html` — tela que o participante abre (botão grande "Sortear").
- `organizar.html` — tela do organizador: participantes, exceções, sorteio e links.
- `shared.js` — código compartilhado (embaralhar o resultado no link, neve de fundo).

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `amigo-secreto`) e envie estes arquivos.
2. No repositório: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
3. Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/amigo-secreto/`.

## Como usar

1. Abra `https://SEU-USUARIO.github.io/amigo-secreto/organizar.html`.
2. Preencha o evento, os participantes (um por linha) e as exceções (ex.: casais com "E vice-versa").
3. Clique em **Sortear e gerar links**.
4. Para cada pessoa, use **Copiar mensagem** ou **WhatsApp** e envie. Quem já recebeu fica marcado com ✅.

## Como funciona o sigilo

- O resultado de cada pessoa vai embaralhado dentro do próprio link, depois do `#`. Olhando o link não dá para ler nenhum nome.
- A parte depois do `#` nunca é enviada ao servidor — o GitHub não vê nada.
- Cada link só contém o resultado daquela pessoa. O organizador não vê quem tirou quem.
- É um embaralhamento para evitar spoiler, não criptografia forte: alguém com conhecimento técnico e acesso ao link de outra pessoa conseguiria decodificar.
- Os dados do organizador ficam só no navegador onde ele montou o sorteio. Sortear de novo gera links novos, mas os antigos continuam mostrando o sorteio antigo.
