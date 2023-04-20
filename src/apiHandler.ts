import axios,{AxiosRequestConfig, AxiosResponse} from 'axios'
import { MatchesConfig } from './matches.ts'
import { MatchInfo } from './matchInfo.ts'
import champions from './champions.json' assert { type:'json'};


export class ApiHandler{
    private readonly url:string  = 'https://euw1.api.riotgames.com'
    private readonly urlMatch:string  = 'https://europe.api.riotgames.com'
    constructor(apiKey:string | undefined){
        axios.defaults.headers.common['X-Riot-Token'] = apiKey;
    }

    async getSummonerByName(name:string|undefined){
        try{
            const summoner = await axios.get(`${this.url}/lol/summoner/v4/summoners/by-name/${name}`)
            console.log('siuuuu');
            return summoner.data;
        }catch(e){
            console.log(e);
        }
    }

    //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/HhdNFQZEBOjmheFuk2QiDA3YB8E8uB-LbHZakMJqksnbOIPA5Q8Zt-XQK39nQ1tgQEAT15ZacLXgOQ/ids?start=0&count=20
    async getMatchesId(puuid:string| undefined, config?:MatchesConfig){
        try{
            const matchesId = await axios.get(`${this.urlMatch}/lol/match/v5/matches/by-puuid/${puuid}/ids`,{
                params:config
            })
            console.log('el bichoooo');
            return matchesId.data;      
        }catch(e){
            console.log(e);         
        }
    }

    async getMatchesIdByName(name:string| undefined, config?:MatchesConfig){
        try{
            const {puuid} = await this.getSummonerByName(name)
            const matchesId = await this.getMatchesId(puuid,config)       
            console.log('akre');
            return matchesId   
        }catch(e){
            console.log(e);  
        }
    }

    async getGame(matchId:string){
        try{
            const getMatches:AxiosResponse<MatchInfo> = await axios.get<MatchInfo>(`${this.urlMatch}/lol/match/v5/matches/${matchId}`)
            console.log('gubena');
            return getMatches;
        }catch(e){
            console.log(e);
        }
    }

    async getGameBySummName(name:string,config?:MatchesConfig){
        try{
            const matchesId = await this.getMatchesIdByName(name,config)
            console.log(matchesId);
        }catch(e){
            console.log(e);
        }
    }


    async getCurrentGame(name:string){
        try{
            const {id} = await this.getSummonerByName(name)
            const game = await axios.get(`${this.url}/lol/spectator/v4/active-games/by-summoner/${id}`)
            return game.data;
        }catch(e){
            console.log(e); 
        }
    }

    getChampionById(id:number){
        try{
            const [championList] = champions.filter(element=> element.id == id)
            return championList.name
        }catch(e){
            console.log(e);
            
        }
    }
    

    


}
