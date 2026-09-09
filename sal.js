# Git e GitHub: Guia de Comandos Passo a Passo
## Backend da Pizzaria com Node.js | Técnico em Informática | Senac Araraquara

## PARTE 1: Configuração (uma única vez por máquina)

Estes comandos apresentam você ao Git. Ficam salvos na máquina; não precisa repetir a cada projeto.

**1.1 Dizer quem você é**
```bash
git config --global user.name "Seu Nome"
```
Todo commit carrega um autor. É este nome que aparece na história do projeto.

```bash
git config --global user.email "seuemail@exemplo.com"
```
Use **o mesmo e-mail da sua conta GitHub**. É assim que o GitHub liga seus commits ao seu perfil (e pinta os quadradinhos verdes de contribuição).

**1.2 Conferir a configuração**
```bash
git config --global --list
```
Mostra o que está salvo. Se o nome ou e-mail estiver errado, rode o comando 1.1 de novo com o valor certo (ele sobrescreve).



## PARTE 2: Criando um repositório do zero (uma vez por projeto)

Feito na aula 1, na pasta `pizzaria-api`.

**2.1 Inicializar o Git na pasta**
```bash
git init
```
Cria a pasta oculta `.git`, que é o repositório local: é ali que a história de commits vai morar. A partir de agora o Git observa esta pasta.
✅ Resultado: `Initialized empty Git repository in ...`

**2.2 Nomear a linha principal como main**
```bash
git branch -M main
```
Todo repositório tem pelo menos uma linha do tempo (branch). O padrão antigo se chamava `master`; o GitHub usa `main`. Este comando renomeia para casar com o GitHub e evitar erro no primeiro push.

**2.3 Criar o filtro do que NÃO entra**
Crie o arquivo `.gitignore` na raiz do projeto com este conteúdo:
```
node_modules
.env
```
O Git vai fingir que esses itens não existem.
- `node_modules`: são milhares de arquivos que o `npm install` recria em segundos. Não faz sentido versionar.
- `.env`: contém **segredos** (senha do banco, JWT_SECRET). Segredo nunca vai para o GitHub.

⚠️ O `.gitignore` só protege o que ainda não foi commitado. Se você commitar o `.env` primeiro e criar o `.gitignore` depois, o segredo já está na história. Ordem certa: `.gitignore` primeiro, sempre.

**2.4 Conectar ao GitHub**
No site do GitHub: **New repository** → nome `pizzaria-api` → **Create repository** (sem marcar README nem gitignore, o projeto já existe na sua máquina). Copie a URL que o GitHub mostra e rode:
```bash
git remote add origin https://github.com/SEU_USUARIO/pizzaria-api.git
```
`remote` é um endereço remoto; `origin` é o apelido padrão para "o meu GitHub". Você está dizendo: "quando eu falar origin, é para lá que vai".

Conferir:
```bash
git remote -v
```
✅ Mostra a URL duas vezes (fetch e push).
⚠️ Colou a URL errada? `git remote set-url origin <url-certa>` corrige.

---

## PARTE 3: A rotina de toda aula (o ciclo que você vai repetir 8 vezes)

Esta é a sequência do fim de cada aula. Decore a ordem, mas entenda cada passo.

**3.1 SEMPRE comece olhando**
```bash
git status
```
O `status` é o seu painel. Ele responde três perguntas: o que mudou? o que já está preparado? em que branch estou?
- Arquivos em **vermelho**: mudaram, mas não estão preparados (não entram no próximo commit).
- Arquivos em **verde**: preparados, entram no próximo commit.

Regra de ouro: **na dúvida, `git status`**. Ele nunca altera nada; só mostra. Pode rodar 50 vezes por aula.

**3.2 Preparar as mudanças**
```bash
git add .
```
O ponto significa "tudo o que mudou nesta pasta". Move os arquivos da bancada para a área de preparação (vermelho → verde).

Para preparar só um arquivo específico:
```bash
git add src/index.js
```

**3.3 Conferir o que foi preparado**
```bash
git status
```
De novo, sim. Agora os arquivos devem estar verdes. Confira a lista: o `.env` **não pode** aparecer aqui. Se aparecer, pare e revise o `.gitignore` antes de continuar.

**3.4 Fotografar (commit)**
```bash
git commit -m "aula 3: produtos e clientes lendo do MySQL"
```
Grava a foto do estado atual no repositório local, com autor, data e a mensagem.

A mensagem importa, porque ela será **lida** depois (por você, pelo professor, por um recrutador olhando seu portfólio). Padrão do curso: `aula N: o que foi feito`.
- Boa: `aula 5: validação com Joi nos POST e PUT`
- Ruim: `arrumei`, `aula`, `asdf`, `finalmente foi`

**3.5 Enviar para o GitHub**
```bash
git push -u origin main
```
Envia os commits locais para o `origin` (GitHub), na branch `main`. O `-u` só é necessário **na primeira vez**: ele memoriza o destino. Da segunda em diante, basta:
```bash
git push
```
✅ Abra o repositório no navegador e confira: os arquivos e a mensagem do commit estão lá. **A entrega da aula só vale depois do push.**

**3.6 Ver a história**
```bash
git log --oneline
```
Lista os commits, um por linha: código curto + mensagem. No fim do curso, essa lista conta a história do projeto:
```
a1b2c3d aula 8: testes, readme e pagina de consumo
e4f5g6h aula 7: pedidos com transacao e join
i7j8k9l aula 6: login com bcrypt e jwt
...
```
Para sair da listagem longa: tecla `q`.

### Resumo do ciclo
```bash
git status                      # 1. olhar
git add .                       # 2. preparar
git status                      # 3. conferir (o .env não está aí?)
git commit -m "aula N: ..."     # 4. fotografar
git push                        # 5. enviar
```

---

## PARTE 4: Clonando repositórios

**4.1 Clonar (baixar um repositório pela primeira vez)**
```bash
git clone https://github.com/profsandropl/pizzaria-api-professor.git
```
Baixa o repositório inteiro (arquivos + toda a história) para uma pasta nova. Clonar é só na primeira vez; depois a pasta já é sua cópia local.

⚠️ Clone o repositório **fora** da pasta do seu projeto. Repositório dentro de repositório causa confusão.

Depois de clonar um projeto Node, sempre:
```bash
cd nome do repositório
npm install
```
O `node_modules` não vem no clone (está no `.gitignore`, lembra?). O `npm install` lê o `package.json` e reconstrói.



## PARTE 5: Trabalhando em duas máquinas (laboratório e casa)

Se você só usa a máquina do laboratório, pule esta parte. Se alterna com a de casa, ela é obrigatória, senão o Git vai rejeitar seu push e a mensagem de erro vai parecer grego.

O problema: você fez push no laboratório. Em casa, sua cópia local está **atrasada** em relação ao GitHub. Se editar e tentar push direto, o Git recusa (`rejected: fetch first`), porque você estaria sobrescrevendo história que sua máquina não conhece.

A solução é uma rotina de abertura e fechamento:

**Ao COMEÇAR a trabalhar (em qualquer máquina):**
```bash
git pull
```
Puxa do GitHub o que a sua cópia local ainda não tem. É o caminho de volta do `push`. Se não houver nada novo: `Already up to date.`

Primeira vez na máquina de casa? Não é `pull`, é `clone` (Parte 4.1) do **seu** repositório, seguido de `npm install` e de criar o seu `.env` local, porque o `.env` nunca viaja pelo GitHub.

**Ao TERMINAR de trabalhar:**
```bash
git status
git add .
git commit -m "..."
git push
```

Mantra: **chegou, pull; saiu, push.** Seguindo isso, as duas máquinas nunca brigam.

⚠️ Se mesmo assim o push for rejeitado: rode `git pull`, deixe o Git juntar as histórias (ele abre um editor pedindo confirmação da mensagem; salve e feche), e faça `git push` de novo.

---

## PARTE 6: Socorro rápido (quando algo dá errado)

**"Fiz besteira em um arquivo e quero voltar como estava no último commit"**
```bash
git checkout -- src/index.js
```
Descarta as mudanças NÃO commitadas daquele arquivo. Cuidado: não tem desfazer do desfazer.

**"Adicionei um arquivo no add sem querer"**
```bash
git restore --staged src/index.js
```
Tira o arquivo da área de preparação (verde → vermelho). O conteúdo do arquivo não muda; ele só sai do próximo commit.

**"Errei a mensagem do último commit" (antes do push)**
```bash
git commit --amend -m "mensagem certa"
```
Reescreve o último commit. Só use antes do push.

**"Commitei o .env sem querer" (antes do push)**
```bash
git rm --cached .env
git commit -m "remove .env do versionamento"
```
Tira o `.env` do Git sem apagar o arquivo da sua pasta. Confira que ele está no `.gitignore`. Se o push já tiver sido feito, avise o professor: além de remover, é preciso **trocar** a senha do banco e o `JWT_SECRET`, porque o segredo ficou exposto na história.

**"Quero ver o que mudou antes de commitar"**
```bash
git diff
```
Mostra, linha a linha, a diferença entre a pasta de trabalho e o último commit. Verde: linha nova. Vermelho: linha removida. Sair: `q`.

**"Não sei em que estado estou"**
```bash
git status
```
Sempre ele. Leia a mensagem com calma: o próprio Git costuma sugerir o próximo comando.

---

## PARTE 7: O que existe além (e fica para o próximo módulo)

Para você saber que existe, não para usar agora:

- **branch**: linhas do tempo paralelas. Cada desenvolvedor trabalha na sua e depois junta. Nós usamos só a `main` porque cada um tem seu projeto.
- **merge**: juntar duas branches. É onde nascem os famosos conflitos.
- **pull request**: no GitHub, o pedido formal de "pode juntar meu código?", com revisão de colegas. É assim que equipes de verdade trabalham.
- **fork**: copiar o repositório de outra pessoa para a sua conta e contribuir com projetos open source.

Quando você entrar em um estágio ou projeto em equipe, esses quatro serão o seu dia a dia. A base que você construiu aqui (add, commit, push, pull, o mapa das quatro áreas) é exatamente o que eles assumem que você já sabe.