# Ignews

## Introdução.

O Ignews é uma aplicação de notícias sobre react onde é permitida leitura parcial dos posts de forma gratuita ou leitura de todo o post mediante uma assinatura.

O usário deve fazer login usando sua conta no github independente de ser ou não assinante do ignews.

A assinatura é mensal e pode ser paga por meio de cartão de crédito master card ou boleto 

## Objetivo do projeto.

Objetivo aqui é aprender sobre o next com uma aplicação que utiliza quase que todos os seus recursos.

## Detalhes técnicos.

### Typescript

Foi adicionado o pacote typescript juntamente com os pacotes @types/react e @types/node como de desenvolvimento.

### SSR detalhes importantes.

Apenas os componentes que são páginas podem fazer uma chamada à api usando **server side rendering**, caso um componente precise de informações dessa requisição terá de ser repassada pela página.

devemos exportar uma função de nome **getServerSideProps** sempre assíncrona, mesmo que não use o await nela e aplicamos o tipo **GetServerSideProps** importado do **next**

### SSG

Essse método de geração de arquivos estáticos, usando **getStaticProps**, irá fazer as chamadas a api necessárias e construir o html a ser devolvido para o cliente, porém além de enviar a resposta ao cliente na primeira requisição são gerados arquivos estáticos, que serão devolvidos de imediato nas próximas requisições.  
Este método retorna, igualmente ao getServerSideProps, um objeto que além de conter **props**, dentre outras propriedades contém a **revalidate** que pode ser usada com o típo número informando os segundos que a página pode esperar para ser atualizada automaticamente.  
Embora exista esse recurso é importante destacar que ele não deve ser usado para páginas que terão dados personalizados, já que os arquivos serão criados estaticamente.

### Client-side

É importante notar que existe ainda a possibilidade de chamadas à api de dentro do componente, usando useEffect por exemplo. Às vezes pode ser mais interessante usar esse tipo de renderização para que o layout não tenha que esperar o processamento de uma chamada à api **SSG** que é muito custosa para o servidor.

### Chamadas à api do stripe

Usei o pacote do **stripe** para fazer as chamadas à api ``` yarn add stripe ```
Para mais detalhes consulte a documentação [clicando aqui](https://stripe.com/docs/api)

###