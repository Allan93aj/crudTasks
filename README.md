Este é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 1. Verifique se o Next.js está instalado

Se você ainda não instalou o Next.js, instale-o localmente no projeto:

```
npm install next react react-dom
```

## 2. Usando npx
Se o Next.js está instalado localmente, mas você não quer instalá-lo globalmente, você pode usar o npx para executar o comando:
```
npx next dev
```

Isso executará o comando next sem a necessidade de instalá-lo globalmente.

## 3. Adicione o Next.js nos scripts do package.json
Verifique se o arquivo package.json contém o script de execução do Next.js. Dentro do seu package.json, deve haver uma seção de scripts semelhante a esta:
```
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}

```
Agora, você pode rodar o projeto com o seguinte comando:
```
npm run dev
```
## 4. Instalar o Next.js globalmente (opcional)
Se preferir ter o comando next disponível globalmente no seu ambiente, você pode instalar o Next.js globalmente:
```
npm install -g next
```
## Resumo:
Verifique se o Next.js está instalado localmente com npm install next.
Use npx next dev para rodar o servidor de desenvolvimento local.
Configure scripts no package.json para facilitar a execução com npm run dev.

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado..


## Deploy on Vercel

Veja o resultado do projeto com Deploy feito na Vercel [CrudTask na Vercel](https://crud-tasks-hazel.vercel.app/)

# crudTasks
