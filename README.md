# marcvs.art

Visual artist · AI filmmaker · art director  
Prompting cartographies in the technocracy.

## Esta revisão — setembro de 2026

A página inicial abre com a estante de filmes: lombadas horizontais com título, data e palavras-chave. Ao clicar, tocar ou pressionar Enter/espaço, um frame grande se abre abaixo da lombada. Antes do frame, aparece uma descrição curta do filme ou projeto, quando cadastrada. O frame inteiro é um link para o vídeo ou canal, em uma nova aba. Uma lombada fica aberta por vez. Frames verticais e horizontais são exibidos em uma janela 16:9, com recorte ajustável por filme. O arquivo original é preservado; o enquadramento muda apenas na exibição.

As pinturas ficam em uma página própria, **Portraits of the Basilisk [paintings & cryptoart]**, acessível pela home. Nela, as bolas e o visualizador foram preservados. As demais páginas, o domínio em CNAME, a imagem social existente e o analytics foram preservados. A home e a bio passaram a incluir AI filmmaking; o canal aparece como ZOMBIEBASILISK.

**Projeto em destaque:** ZOMBIEBASILISK (since 2025), horror, sci-fi, foundfootage. O frame vertical tem crop 16:9 em `50% 32%`, mantendo a criatura e parte do rio. O link abre o Instagram do projeto.

**Primeiro filme cadastrado:** *The First Astronaut* (2026), com as palavras-chave horror, sci-fi e space exploration. Frame original fornecido por Marcus, link para o vídeo no Instagram e recorte horizontal concentrado nos olhos.

## Fundo: presença pixelada

A grade em perspectiva foi substituída por fragmentos da pintura `paintings/retrato-basilisco.jpeg`, ampliados e parcialmente fora da tela. Os pixels se desprendem e reaparecem em ciclos lentos, com cinzas escuros e raros pontos em azul fantasma. A imagem original permanece intacta.

A região da bio recebe menos interferência. Abrir uma lombada reduz a intensidade do fundo; fechar a última restaura a intensidade suavemente. A animação respeita a preferência por movimento reduzido e pausa quando a aba está oculta. O comportamento está em `basilisk-field.mjs`, sem dependências adicionais.

## Cadastrar ou atualizar um filme pelo GitHub

1. Na pasta `films`, suba o frame escolhido, preferencialmente em JPG ou WebP. Use nomes simples e mantenha a extensão correta.
2. Abra `films/captions.txt` e acrescente uma linha, sem `#`, seguindo o formato abaixo.
3. Salve as alterações no mesmo repositório/branch que publica o site. Se possível, envie imagem e catálogo juntos.

Formato de cada linha:

```text
arquivo-do-frame.jpg | Título do filme | Data | palavra-chave, palavra-chave | URL completa do vídeo | 50% 50% | Descrição curta | Watch film
```

Os cinco primeiros campos mantêm o formato anterior. Os campos 6 (crop), 7 (descrição) e 8 (texto do link) são opcionais. Para descrever sem mudar o crop, use `URL | | Descrição`. O texto do link padrão é `Watch film`; para projetos, pode ser `Explore ZOMBIEBASILISK`.

O formato acima é uma explicação; substitua todos os campos pelos dados reais. Não use o caractere `|` dentro de um campo.

- **Arquivo:** nome exato, incluindo maiúsculas e extensão; o frame deve estar diretamente em `films/`.
- **Título:** nome exibido na lombada. Acentos são aceitos.
- **Data:** texto livre, como ano, mês/ano ou data completa; use o nível de precisão que você confirmou. Campo vazio aparece como travessão.
- **Palavras-chave:** separadas por vírgulas. Campo vazio é aceito.
- **URL:** endereço completo do vídeo, começando por `https://` ou `http://`. Pode ser Instagram, TikTok, YouTube, Vimeo ou outro destino. Sem URL válida, o frame pode ser visto, mas não recebe um link.

### Ajustar o crop de uma imagem vertical

Os cinco campos continuam funcionando. Se quiser escolher o enquadramento, acrescente um sexto campo opcional com duas porcentagens: posição horizontal e posição vertical.

Primeiro filme já cadastrado:

```text
the-first-astronaut.png | The First Astronaut | 2026 | horror, sci-fi, space exploration | https://www.instagram.com/p/DZH15ivxmJu/ | 50% 27% | A short film bringing horror and science fiction to space exploration.
```

`50% 27%` centraliza na horizontal e privilegia a parte superior do rosto, destacando os olhos no recorte 16:9. Sem esse campo, o site usa `50% 50%`. Na segunda porcentagem, números menores mostram mais do topo; maiores mostram mais da base. O mesmo enquadramento é usado no computador e no celular. A imagem original não é cortada nem deformada.

A ordem das linhas é a ordem da estante. Para reorganizar, mova as linhas. Para retirar uma obra da seleção, remova a linha ou adicione `#` no início; não é necessário excluir a imagem.

O catálogo local usa a mesma lógica de pasta + texto das pinturas. Ele acompanha a publicação do próprio site e não depende de uma chamada à API do GitHub para exibir os filmes. Alterar apenas o arquivo de imagem, mantendo o nome, troca o frame. Imagens não cadastradas no texto não aparecem na seleção.

## Navegação e textos de apresentação

A home apresenta o link `[read full bio]` ao fim do resumo. Depois da estante, os acessos seguem image, text, sound: Portraits of the Basilisk, Writing (Substack em português) e Sound. O fechamento destaca Art direction & collaborations, para marcuscouto.com.

A página Portraits reúne a apresentação da série, a galeria de bolas e cinco acessos às coleções de cryptoart. `cryptoart.html` encaminha para essa seção, preservando os links antigos. As coleções têm descrições e URLs diretamente em `portraits-of-the-basilisk.html`. Sound também ganhou uma apresentação breve; a discografia foi preservada.

## Atualizar as pinturas

A galeria agora fica em `portraits-of-the-basilisk.html`. A home apresenta o link de acesso, sem carregar as bolas nem o visualizador de pinturas.

Continue usando `paintings/` e `paintings/captions.txt`:

```text
nome-do-arquivo.jpg | legenda da obra
```

As cinco legendas e imagens originais foram preservadas. A descoberta automática pela pasta do GitHub continua; os registros no arquivo de legendas também servem como alternativa quando a API estiver indisponível.

## Aplicar os arquivos ao repositório existente

Use o conteúdo da pasta `marcvsart-main` deste ZIP na raiz do repositório atual. Não crie uma pasta extra dentro do site. Preserve os arquivos novos ou alterações que você tenha feito depois do ZIP original.

Arquivos alterados ou adicionados nesta revisão:

- `index.html`: bio com link de leitura, estante, três acessos principais e colaboração profissional.
- `portraits-of-the-basilisk.html`: pinturas com as bolas, apresentação da série e coleções de cryptoart.
- `cryptoart.html`: encaminhamento dos acessos antigos para a seção de coleções.
- `som.html`: apresentação da prática musical e navegação atualizada.
- `paintings/orbs.js`: comportamento das bolas e do visualizador.
- `home.css`: base visual compartilhada entre a home e a página de pinturas.
- `bio.html`: bio completa aprovada, com foco em IA, storytelling e reflexões culturais e sociais; texto estável, sem efeito de hover.
- `shelf.css`: aparência e adaptação da estante a telas menores.
- `basilisk-field.mjs`: fundo pixelado animado a partir de uma pintura autoral.
- `films/shelf.mjs`: leitura do catálogo e montagem das lombadas.
- `films/captions.txt`: cadastro em ordem com crop, descrição e texto do link opcionais.
- `films/zombiebasilisk.png`: frame original do projeto, com crop definido no catálogo.
- `films/the-first-astronaut.png`: frame original do primeiro filme.
- `README.md`: estas instruções.

Nenhuma alteração foi enviada ao GitHub ou ao domínio público nesta revisão. O projeto continua estático, sem instalação de dependências ou etapa de build. Para uma conferência local, sirva a pasta por HTTP; a leitura do catálogo não funciona abrindo o HTML diretamente por `file://`.

## Estrutura preservada

- `bio.html`: apresentação do artista.
- `cryptoart.html`: encaminha para as coleções na página Portraits.
- `som.html`: discografia.
- `imagem.html`, `visuals.html`, `texto.html`: páginas legadas preservadas.
- `paintings/`: obras e legendas.
- `CNAME`: marcvs.art.
- `og.png`: imagem social original.

[Site](https://marcvs.art) · [Substack](https://marcvscouto.substack.com) · [Portfólio profissional](https://marcuscouto.com)

## Atualização de posicionamento e créditos

O título da home e de compartilhamento é **Marcvs (Marcus Couto) — AI Filmmaker & Art Director**. A bio inclui links para ZOMBIEBASILISK, Portraits, o portfólio profissional e a seção Osasco Dynamics de Sound. O contato da home e da bio leva ao Instagram de Marcvs.

No catálogo de filmes, os campos 9 e 10 são opcionais:

```text
arquivo | título | data | tags | URL | crop | descrição | texto do link | tipo | créditos
```

O tipo aparece abaixo do título da lombada, como `[ongoing project]` ou `[short film]`. Os créditos aparecem ao abrir, depois da sinopse e antes do thumb. Preencha somente as funções confirmadas para cada obra. Campos vazios não aparecem; linhas antigas de 5 a 8 campos continuam funcionando. Se quiser usar créditos sem tipo, mantenha o campo 9 vazio. As descrições publicadas pelo artista foram preservadas nesta atualização.
