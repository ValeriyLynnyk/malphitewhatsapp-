import * as dotenv from 'dotenv';
import {ApiHandler} from './apiHandler.ts';
import { MatchesConfig } from './matches.ts';


dotenv.config();

function  main():void{
    const apiHandler = new ApiHandler(process.env.LOLKEY);    
    const config:MatchesConfig = {
        count:1
    }
    // apiHandler.getSummonerByName('Not Heysen').then(console.log)
    
    // apiHandler.getMatchesId('HhdNFQZEBOjmheFuk2QiDA3YB8E8uB-LbHZakMJqksnbOIPA5Q8Zt-XQK39nQ1tgQEAT15ZacLXgOQ',config).then(console.log);
    // apiHandler.getMatchesIdByName('DarkResure').then(console.log);
    // apiHandler.getGame('EUW1_6368118116').then((data)=>{    
    //     if(data?.data.info.gameMode==='ARAM'){
    //         console.log('😾', data.data.info.gameMode);
    //     }else{
    //         console.log('no aram uwu');
    //     }
        
    // })
    // apiHandler.getGameBySummName('Not Heysen',config)


    // apiHandler.getGame('EUW1_6368811652').then((data)=>{
    //     console.log(data?.data.info.participants.filter((element)=>element.summonerName=='Not Heysen')[0].cha)
    // })

    apiHandler.getCurrentGame('Ryodain').then((data)=>{
        const [xd] = data.participants.filter((element:any)=>element.summonerName === 'Ryodain')
        console.log(xd.championId);
        console.log(apiHandler.getChampionById(xd.championId)?.split(' ')[0])  
    })
    
}

main();

//? timer 1min, partida en activo, manda whatsapp XD
//? pillar img de google y enviarlas con la skin que este jugando xd