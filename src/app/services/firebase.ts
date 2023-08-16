import {initializeApp} from 'firebase/app';
import {API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '../../app/private';
import {
  collection,
  addDoc,
  getDocs,where,
  query,
  getFirestore,
  DocumentData,
  onSnapshot
} from 'firebase/firestore';

import { ArenaGame } from '../types/types';

/** As configurações de acesso ao fibase deixei num arquivo separado, só para facilitar o compartilhamento do projeto
 *  mas você pode colocar suas credenciais no bloco abaixo
 */
const firebase_config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = initializeApp(firebase_config);
const db = getFirestore(app);

/**
 * Retorna a lista de documentos de um dado banco
 * @param games_collection: Coleção de onde o documento será recuperado 
 * @param criterias: conjunto de critérios de busca 
 * @returns lista de documentos
 * @todo implementar parametrização dinâmica
 */
const getGameDocuments = async (games_collection:string, criterias:any[]) => {
  let collection_ref = null; 
  
  if(criterias.length > 0){
   // colRef = query(collection(db, banco), where("ehAtivo", "==", true));
    
    criterias.forEach(element => {
      
    });
    collection_ref = query(collection(db, games_collection), where("ehAtivo", "==", true));
  }else{
    collection_ref = collection(db, games_collection);
  }
  let docs_snap = await getDocs(collection_ref);
  return docs_snap;
};

const getQuery = (games_collection:string) =>{
  //console.log("Servidor: getQuery");
  var q = query(collection(db, games_collection));
  return q;
}

const getAsyncGameDocuments = async (games_collection:string, criterias:any[]) => {
  var documentsArray = new Array<ArenaGame>();
  const q = query(collection(db,games_collection));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach(doc => {
      var game : ArenaGame = {nome: doc.data().nome, 
                              descricao: doc.data().descricao,
                              sistema:{nome:'', versao:''},
                              id: doc.id
                            };
      documentsArray.push(game);
    });
    return documentsArray;
  });
  
}

/**
 * Realiza a inserção de um documento do tipo ArenaGame numa dada coleção
 * @param games_collection: Coleção no qual o documento será inserido 
 * @param new_game: Objeto do tipo ArenaGame que será salvo na dada coleção 
 * @returns referência do novo documento
 */
const addGameDocument = async (games_collection:string, new_game:ArenaGame ) => {
  //console.log("Servidor: addGameDocument");
  const doc_ref = await addDoc(collection(db, games_collection), new_game);

  var new_generic = {
    nome: new_game.nome,
    descricao: new_game.descricao,
    sistema:{
          nome: '',
          versao: ''
        }
  };
  const generic_doc_ref = await addDocument("generic_collection", new_generic);
  //console.log("addGameDocument - generic insertion:", generic_doc_ref.id)
  return doc_ref;
};

/**
 * Realiza a inserção de um documento genérico na dada coleção
 * @param generic_collection: Coleção no qual o documento será inserido 
 * @param new_generic: Objeto genérico que será salvo na dada coleção 
 * @returns referência do novo documento
 */
const addDocument = async (generic_collection:string, new_generic:{} ) => {
  const doc_ref = await addDoc(collection(db, generic_collection), new_generic);
  return doc_ref;
};

/** Um getDocuments genérico pode ser criado tomando como base as funções addGameDocument e addDocument */
    /*var q = collection(db, games_collection);

  const documents = await getDocs(q);
  var documentsArray = new Array<ArenaGame>();
    documents.forEach(doc => {
    var game : ArenaGame = {nome: doc.data().nome, 
                            descricao: doc.data().descricao,
                            sistema:{nome:'', versao:''},
                            id: doc.id
                          };
    documentsArray.push(game);
  });

  return documentsArray;*/
export{db, getGameDocuments, addGameDocument, addDocument, getAsyncGameDocuments, getQuery};