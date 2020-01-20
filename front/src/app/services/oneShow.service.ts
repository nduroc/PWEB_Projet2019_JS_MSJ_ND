import { Injectable } from '@angular/core';


@Injectable()
export class TvShowInformation {

    id: number;
    name: string;
    type: string;
    genre: string[];
    status: string;
    start: string;
    officialSite: string;
    urlMediumImage: string;
    urlOriginalImage: string;
    rate: number;
    summary: string;
    network: string;
    countryName: string;
    countryCode: string;

    constructor(){

    }
    setValue( show?: any[]) {
        if (show) {
            this.id = show["id"];
            this.name = show["name"];
            this.type = show["type"];
            this.genre = show["genres"];
            this.status = show["status"];
            this.start = show["premiered"];
            this.officialSite = show["officialSite"];
            if (show["image"] != null) {
                this.urlMediumImage = show["image"]["medium"];
                this.urlOriginalImage = show["image"]["original"];
            }
            else {
                this.urlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                this.urlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
            }
            this.rate = show["rating"]["average"];
            this.summary = show["summary"];
            if (show["network"] != null) {
                this.network = show["network"]["name"];

                this.countryName = show["network"]["country"]["name"];
                this.countryCode = show["network"]["country"]["code"];
            }
        }
    }
    setValueTvShow( show: TvShowInformation) {
        if (show) {
            this.id = show.id
            this.name = show.name
            this.type = show.type
            this.genre = show.genre
            this.status = show.status
            this.start = show.start
            this.officialSite = show.officialSite
                this.urlMediumImage = show.urlMediumImage
                this.urlOriginalImage = show.urlOriginalImage

            this.rate = show.rate
            this.summary = show.summary
                this.network = show.network

                this.countryName = show.countryName
                this.countryCode = show.countryCode
        }
    }
}
@Injectable()
export class Episode {
    id: number;
    name: string;
    outDate:string;
    seasonNumber: number;
    episodeNumber: number;
    urlMediumImage: string;
    urlOriginalImage: string;
    summary: string;
    runtime:number

    constructor(){

    }
    setValue( episode: any[]) {
        this.id = episode["id"]
        this.name = episode["name"]
        this.outDate = episode["airdate"]
        this.seasonNumber = episode["season"]
        this.episodeNumber = episode["number"]
        if (episode["image"] != null) {
            this.urlMediumImage = episode["image"]["medium"]
            this.urlOriginalImage = episode["image"]["original"]
        }
        else {
            this.urlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
            this.urlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
        }
        this.summary = episode["summary"]
        this.runtime= episode["runtime"]

    }
}
@Injectable()
export class Season {
    id: number;
    numberSeasonInshow: number;
    name: string;
    nbEpisode: number;
    episodes: Episode[];
    urlMediumImage: string;
    urlOriginalImage: string;
    summary: string;
    constructor()
    {

    }

    addEpisodes(episodes:Episode[])
    {
        this.episodes=episodes;
    }
    setValue( season: any[]) {
        this.id = season["id"];
        this.numberSeasonInshow = season["number"];
        this.name = season["name"];
        this.nbEpisode = season["episodeOrder"];
        this.episodes = new Array<Episode>();
        this.summary = season["summary"];

        if (season["image"] != null) {
            this.urlMediumImage = season["image"]["medium"];
            this.urlOriginalImage = season["image"]["original"];
        }
        else {
            this.urlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
            this.urlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
        }
    }



}

@Injectable()
export class ActorCharacter {
    actorId: number;
    actorName: string;
    actorCountryName: string;
    actorCountryCode: string;
    actorSexe: string;
    actorUrlMediumImage: string;
    actorUrlOriginalImage: string;
    characterId: number;
    characterName: string;
    characterUrlMediumImage: string;
    characterUrlOriginalImage: string;


    constructor()
    {
        
    }
    setValue( actorCharacter: any[]) {
        //actor
        this.actorId = actorCharacter["person"]["id"];
        this.actorName = actorCharacter["person"]["name"];
        if (actorCharacter["person"]["country"] != null) {
            this.actorCountryName = actorCharacter["person"]["country"]["name"];
            this.actorCountryCode = actorCharacter["person"]["country"]["code"];
        }
        this.actorSexe = actorCharacter["person"]["gender"];
        if (actorCharacter["person"]["image"] != null) {
            this.actorUrlMediumImage = actorCharacter["person"]["image"]["medium"];
            this.actorUrlOriginalImage = actorCharacter["person"]["image"]["original"];
        }
        else {
            this.actorUrlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            this.actorUrlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        }
        //character
        this.characterId = actorCharacter["character"]["id"];
        this.characterName = actorCharacter["character"]["name"];
        if (actorCharacter["character"]["image"] != null) {
            this.characterUrlMediumImage = actorCharacter["character"]["image"]["medium"];
            this.characterUrlOriginalImage = actorCharacter["character"]["image"]["original"];
        }
        else {
            this.characterUrlMediumImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
            this.characterUrlOriginalImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        }


    }



}

@Injectable()
export class OneShow {
 
    seasons: Season[]
    cast: ActorCharacter[];
    information: TvShowInformation;

    constructor() {

        this.seasons = new Array<Season>();
        this.cast = new Array<ActorCharacter>();
        this.information = new TvShowInformation();
    }

    addASeason(s: Season) {
        this.seasons.push(s);
    }

    addAnActor(a: ActorCharacter) {
        this.cast.push(a);
    }
    addAllSeason(s: Season[]) {
        this.seasons = s;
    }
    addCast(c: ActorCharacter[]) {
        this.cast = c;
    }
    loadInformation(showInformation: TvShowInformation) {
        this.information = showInformation;
    }
    getTest()
    {
    }

    build(actualShow: OneShow): OneShow {
        actualShow.cast.forEach( actor =>
        {
            this.addAnActor(actor);
        })

        actualShow.seasons.forEach( season => {
            let tmpSeason:Season = new Season();
            let episodes:Episode[];
            season.episodes.forEach(episode => {
                episodes.push(episode);
            });
            tmpSeason.addEpisodes(episodes)
            this.addASeason(tmpSeason);

        })

        let tmpInfo:TvShowInformation= new TvShowInformation()
        tmpInfo.setValueTvShow(actualShow.information);
        this.information= tmpInfo;

    
        return this;
      }


}
