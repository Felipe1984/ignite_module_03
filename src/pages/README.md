# _app

Esse arquivo tras o componente que fica por volta de toda a aplicação, se algum componente deve estar presente em toda aplicação deve ser colocado aqui.

Toda vez que o usuário troca de tela esse componente é recarregado.

# _document

Funciona de forma semelhante ao _app, mas é carregado apenas uma vez em nossa aplicação.  
De forma grosseira podemos compara ele com o index.html da pasta public em aplicações react puro, segue um exemplo do arquivo em questão:

**_document.tsx**
```
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class IgNewsDocument extends Document {
   render() {
      return (
         <Html lang="pt-BR">
            <Head>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
               <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
```

## Carregamento de fonte externa:

Como esse carregamento deve ocorrer apenas uma vez deve ser feito no componente **_document**