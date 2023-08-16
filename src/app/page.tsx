'use client'
import React, { useState, useEffect, useCallback, AreaHTMLAttributes } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ArenaGame } from './types/types';
import { addGameDocument, getGameDocuments, getQuery } from './services/firebase';
import { QuerySnapshot, query, onSnapshot, collection, doc, DocumentData } from 'firebase/firestore';

const default_game_state = {
  nome: '',
  descricao: '',
  sistema:{
        nome:'',
        versao:'',
      }
};

const default_games_state = new Array<ArenaGame>(default_game_state);


export default function Home() {
  const [new_game, setNewGame] = useState<ArenaGame>(default_game_state);
  const [sync_games, setSyncGames] = useState<Array<ArenaGame>>(default_games_state);
  const [async_games, setAsyncGames] = useState<ArenaGame[]>([]);

  /**
   * Adiciona um novo ArenaGame
   * @param e Event
   */
  const addNewGame = async (e : any) => {
    e.preventDefault();
    //console.log("Cliente - addNewGame", "Entrou em addNewGame.");
    if (new_game.nome !== '' && new_game.descricao !== '') { 
      const doc_ref = await addGameDocument('games', new_game);
      setNewGame(default_game_state);
    }
  };

/** Solução Sincrona para perceber alterações na base de dados somente após chamada explícita */
  const chamadaSincrona = async() => {
    //console.log("Cliente - chama", "Entrou em chama.");
    //let jogos = await getDoument("jogos", true);
    var criterias :any[] = [];
    var documents = await getGameDocuments("games", criterias);
    var documentsArray = new Array<ArenaGame>();
    documents.forEach( function( doc ){
      var novoJogo : ArenaGame = {
        nome: doc.data().nome,
        descricao: doc.data().descricao,
        sistema:{
              nome:doc.data().descricao,
              versao:doc.data().versao
            },
        id: doc.id
      };
      documentsArray.push(novoJogo);
    });
    setSyncGames(documentsArray);
  };

/** Solução Assincrona para só perceber alterações na base de dados de forma instantânea */

  useEffect(() => {
    //console.log("Cliente - useEffect", "Entrou em useEffect.");
    var q = getQuery("games");
    onSnapshot(q, querySnapshot =>{
      var documentsArray = new Array<ArenaGame>();
      querySnapshot.forEach(doc => {
        //console.log("Cliente - useEffect", "Entrou em querySnapshot.");
        var game : ArenaGame = {nome: doc.data().nome, 
                                descricao: doc.data().descricao,
                                sistema:{nome:'', versao:''},
                                id: doc.id};
          documentsArray.push(game);

      })
      setAsyncGames(documentsArray);
    })
  },[]);


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          <code className={styles.code}> Formulário para salvar novos Jogos</code>
        </p>
      </div>

      <div className={styles.center}>
        <form method="post" onSubmit={addNewGame} className={styles.form}>
          <TextField className="textField" fullWidth id="nomeNovoJogo" label="Nome" placeholder="Nomo do novo jogo" variant="standard"
                    value={new_game.nome}  onChange={(e) => setNewGame({ ...new_game, nome: e.target.value })}
          />
          
          <TextField rows={2} className="textField" color="success" multiline fullWidth id="descricaoNovoJogo" label="Descrição" placeholder="Descrição do novo jogo" variant="standard"
                    value={new_game.descricao}  onChange={(e) => setNewGame({ ...new_game, descricao: e.target.value })}
          />

          <hr />

            <Stack paddingTop={"10px"} justifyContent="center" spacing={2} direction="row">   
            <Button variant="contained" color="warning" href="/">Voltar</Button>
            <Button variant="contained" type="submit">Salvar</Button>
          </Stack>
        </form>
      </div>
      <div  onClick={chamadaSincrona} className={styles.description}>
        <p>
          Clique aqui para recuperar os jogos de forma 
          <code className={styles.code}> SÍNCRONA </code>
        </p>
      </div>
        {/** seção do site para os jogos já cadastrados */}
        <div className={styles.grid}>
        {(sync_games.length>0) && sync_games.map((game, game_id) => (
          <span key={game_id} className={styles.card}>
              <h2> {game.nome} </h2>
              <p> {game.descricao}</p>
          </span>
        ))}
        {(sync_games.length === 0) && (
          <div onClick={chamadaSincrona} className={styles.card}>
            <h2>Consultar Banco <span>-&gt;</span> </h2>
            <p>Clique aqui e consulte os jogos!</p>
          </div>
        )}
        </div>
        <div className={styles.description}>
        <p>
        Esta é a seção exibe Jogos recuperados de forma 
          <code className={styles.code}> ASSÍNCRONA </code>
        </p>
      </div>
        {/** seção do site para os jogos já cadastrados */}
        <div className={styles.grid}>
        {(async_games.length>0) && async_games.map((game, game_id) => (
          <span key={game_id} className={styles.card}>
              <h2> {game.nome} </h2>
              <p> {game.descricao}</p>
          </span>
        ))}
        {(async_games.length === 0) && (
          <div className={styles.card}>
            <h2>Não há jogos criados!</h2>
            <p> sem jogos...</p>
          </div>
        )}
        </div>
    </main>
  )
}


/**
 * 
 * 
 * 
 *           <TextField className="textField" fullWidth id="sistemaNovoJogo" label="Sistema" placeholder="Nome do sistema" variant="standard"
                    value={new_game.sistema.nome}  onChange={(e) => setNewGame({ ...new_game, sistema.nome: e.target.value })}
          />
          
          <TextField rows={2} className="textField" color="success" multiline fullWidth id="versaoNovoJogo" label="Versão" placeholder="Versão do sistema" variant="standard"
                    value={new_game.sistema.versao}  onChange={(e) => setNewGame({ ...new_game, sistema.versao: e.target.value })}
          />
 */