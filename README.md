# marcvs.art

Site de artista de Marcvs (Marcus Couto): filmes do Zombiebasilisk, Retratos do Basilisco, cryptoart, som e textos. É standalone: quem entra no marcvs.art fica no marcvs.art. O trabalho de direção criativa está em [marcuscouto.com](https://marcuscouto.com), linkado no rodapé.

Site estático no GitHub Pages (`CNAME` = `marcvs.art`), sem build.

## Estrutura

```
/                 index.html            home em inglês (padrão): bio, Films, Portraits of the Basilisk, Sound, Texts
/paintings/       paintings/index.html  Portraits of the Basilisk: pinturas, visualizador e coleções de cryptoart
/sound/           sound/index.html      discografia
/pt/              pt/index.html         versões em português (/pt/, /pt/pinturas/, /pt/som/)
/404.html                               página de erro

bio.html, portraits-of-the-basilisk.html, cryptoart.html, imagem.html, visuals.html, som.html, texto.html
                                        endereços do marcvs.art antigo, que levam às páginas novas (preservando a âncora)
```

- **Botão EN | PT:** leva à página equivalente na outra língua. Os pares ficam em `PAIRS`, no `assets/js/marcvs.js`.
- **Cabeçalho, rodapé e glitch:** ficam em `assets/js/marcvs.js`.

## Identidade

- **Base visual:** a mesma do marcuscouto.com, com os tokens em `assets/css/tokens.css` e a base em `assets/css/base.css`.
- **Layout próprio e glitch pesado:** ficam em `assets/css/marcvs.css`.
  - `.hg`: títulos e marca, com seis fatias deslocadas em azul e branco e tremor. Dispara sozinho a cada 2,5–8,5s e no hover.
  - `.tear`: frames dos filmes, com faixas da imagem arrancadas para os lados. Dispara a cada 3–10s e no hover.
  - `#loss`: perda de sinal na página inteira a cada 9–17s, junto com o rasgo do frame principal.
- **Reduzir movimento:** com a opção ativada no sistema, todos os efeitos ficam desligados.
- **Favicon:** o sigilo da engrenagem, que é o sigilo da arte no marcuscouto.com.

## Dados

Os dados e as imagens são os mesmos do marcuscouto.com, copiados de `marcvsart/marcuscouto-portfolio` a cada atualização:

- `data/filmes.txt`: filmes (frames em `assets/img/filmes/`);
- `data/pinturas.txt`: pinturas (WebP e AVIF em `assets/img/pinturas/`);
- `data/som.json`: discografia;
- `data/numeros.json`: números do Zombiebasilisk.

Para mudar um filme, uma pintura ou um lançamento, mude no marcuscouto.com e copie o arquivo para cá, ou peça ao Claude, que atualiza os dois sites juntos. Os formatos estão documentados no README do marcuscouto-portfolio.

## Histórico

O marcvs.art original, com as pinturas em resolução completa, está na branch [`backup/antes-da-virada`](https://github.com/marcvsart/marcvsart/tree/backup/antes-da-virada).

Analytics: GoatCounter (`marcvs.goatcounter.com`).
