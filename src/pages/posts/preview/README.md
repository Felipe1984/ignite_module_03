# getStaticPaths

Em rotas que podem receber parâmetros que usam o **getStaticProps**, devemos informar de qual das três formas possíveis será essa geração estática.

* Gerar todas as páginas estáticas durante a build;
* Gerar as páginas no primeiro acesso;
* Gerar apenas algumas páginas na build e outras no primeiro acesso.

Páginas que não recebem parâmetros são geradas normalmente pelo next.

Um exemplor de **getStaticPaths**:
```
export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [
         {
            params: { slug: 'jamstack-geleia-de-javascript-api-e-markup' }
         }
      ],
      fallback: "blocking"
   }
}
```
## falback
A propriedade fallback pode receber três valores:
* true: 
   Isso diz ao next que, se ainda a página não foi gerada automaticamente, ela deve ser carregada pelo lado do cliente. Isso gera um problema, pois a página será aberta em branco e então será feita a requisição para gerar a página, não sendo recomendado para estratégias de SEO.
* false:
   Se o post não foi gerado de forma estática ainda ele retorna um erro 404.
* blocking:
   Funcionamento parecido com fallback true, porém se o conteúdo ainda não foi gerado pelo next em vez de carregar pelo lado do cliente, ele irá tentar carregar isso do lado do servidor, e só quando o conteúdo estiver pronto ele irá exibir o conteúdo da página.
