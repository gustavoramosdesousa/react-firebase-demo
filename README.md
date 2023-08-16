## Firebase + ReactJS + Next.js + TypeScript  
<div align="center">
  <img  width="60%" 
    src="https://github.com/gustavoramosdesousa/react-firebase-demo/blob/main/public/tela_inicial_demo.png" alt="Cyber" />
  <p>Esta aplicação possui apenas a tela inicial ✌</p>
</div>


### Sobre o projeto
Trata-se de uma aplicação de demonstração que se propõe a integrar os serviços do Firebase (versão superior a 9) com ReactJS. O diferencial do projeto é que ele é totalmente tipado, fazendo forte uso do TypeScript. 

##### Funcionalidades
- Salvar documentos no firebase (utilizando [addDoc](https://firebase.google.com/docs/reference/js/firestore_?hl=pt-br#adddoc));
- Recuperar documentos via chamada síncrona (utilizando [getDocs](https://firebase.google.com/docs/reference/js/firestore_?hl=pt-br#getdocs));
- Recuperar documento de forma automática (utilizando [onSnapShot](https://firebase.google.com/docs/reference/js/firestore_?hl=pt-br#onsnapshot)).

##### Tecnologias Utilizadas
 ![TypeScript](https://img.shields.io/badge/-TypeScript-blue?style=flat&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/-Next.js-0A1A2F?style=flat&logo=next.js) ![Firebase](https://img.shields.io/badge/-Firebase-orange?style=flat&logo=firebase)

##### Status do Projeto
![](https://img.shields.io/badge/STATUS-CONCLUÍDO-blue)

## Instalação

Após clonar o projeto, rode os comandos:

```bash
npm install

npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e veja o resultado!

Você deve, contudo, atualizar o arquivo `"react-firebase-demo/src/app/services/firebase.ts"` para colocar suas credenciais de acesso ao firebase:
```typescript

const firebase_config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

```

E remover o import, também do arquivo firebase.ts:

`import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '../../app/private';`

## Como Usar
### Salvar documentos
<div align="center">
  <img  width="60%" 
    src="https://github.com/gustavoramosdesousa/react-firebase-demo/blob/main/public/salvar_documento.png" alt="Cyber" />
  <p>Esta aplicação possui apenas a tela inicial ✌</p>
</div>

### Recuperar documentos via chamada síncrona 
<div align="center">
  <img  width="60%" 
    src="https://github.com/gustavoramosdesousa/react-firebase-demo/blob/main/public/recuperar_documentos_sincrono.png" alt="Cyber" />
  <p>Esta aplicação possui apenas a tela inicial ✌</p>
</div>

### Recuperar documento de forma automática
É só esperar a mágica acontecer 😎
<div align="center">
  <img  width="60%" 
    src="https://github.com/gustavoramosdesousa/react-firebase-demo/blob/main/public/recuperar_documentos_assincrono.png" alt="Cyber" />
  <p>Esta aplicação possui apenas a tela inicial ✌</p>
</div>
