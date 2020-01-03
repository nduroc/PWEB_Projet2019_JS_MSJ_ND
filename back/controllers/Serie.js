const Serie = require('../service/SerieService');
const test = {"seasons":[{"id":1,"numberSeasonInshow":1,"name":"","nbEpisode":13,"episodes":[],"summary":"","urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/24/60941.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/24/60941.jpg"},{"id":2,"numberSeasonInshow":2,"name":"","nbEpisode":13,"episodes":[{"id":27,"name":"Inside Chester's Mill","outDate":"2014-06-23","seasonNumber":2,"episodeNumber":null,"urlMediumImage":"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png","urlOriginalImage":"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png","summary":"","runtime":60},{"id":14,"name":"Heads Will Roll","outDate":"2014-06-30","seasonNumber":2,"episodeNumber":1,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10446.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10446.jpg","summary":"<p>Barbie's fate lies in Big Jim's hands, and the Dome presents a new threat when it becomes magnetized. Meanwhile, Julia seeks out the help of a stranger to save the life of a mysterious girl who may hold clues to origin of the Dome.</p>","runtime":60},{"id":15,"name":"Infestation","outDate":"2014-07-07","seasonNumber":2,"episodeNumber":2,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10447.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10447.jpg","summary":"<p>Barbie risks his life to help Rebecca save the Chester's Mill food supply when she discovers an infestation of butterfly eggs on the town's crops.</p>","runtime":60},{"id":16,"name":"Force Majeure","outDate":"2014-07-14","seasonNumber":2,"episodeNumber":3,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10448.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg","summary":"<p>When tensions in Chester's Mill continue to rise as resources dwindle, Big Jim holds a census in order to forecast how long the town can continue to exist under the dire conditions. Meanwhile, a rainstorm brings much-needed water until it changes to acid rain, threatening the lives of everyone it touches. Also, Rebecca and Lyle butt heads over the reasons for the dome's existence.</p>","runtime":60},{"id":17,"name":"Revelation","outDate":"2014-07-21","seasonNumber":2,"episodeNumber":4,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10449.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10449.jpg","summary":"<p>As conditions in Chester's Mill worsen, Big Jim and Rebecca consider resorting to the extreme measure of population control, which drives a wedge between Barbie and Julia. Meanwhile, clues to Melanie's past and her connection to the Dome are revealed.</p>","runtime":60},{"id":18,"name":"Reconciliation","outDate":"2014-07-28","seasonNumber":2,"episodeNumber":5,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10450.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10450.jpg","summary":"<p>Julia takes over as the leader of Chester's Mill after the town becomes divided in the wake of Big Jim and Rebecca's plans for population control. Meanwhile, Joe and Norrie help Melanie search for more clues about her identity at the Dome wall.</p>","runtime":60},{"id":19,"name":"In the Dark","outDate":"2014-08-04","seasonNumber":2,"episodeNumber":6,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10451.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10451.jpg","summary":"<p>When Barbie and Sam set out to investigate a mysterious tunnel, a cave-in severs their path back to Chester's Mill. Meanwhile, Julia and Big Jim face off in a struggle for power as a dust storm rages in the town.</p>","runtime":60},{"id":20,"name":"Going Home","outDate":"2014-08-11","seasonNumber":2,"episodeNumber":7,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10452.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10452.jpg","summary":"<p>When Barbie descends into the unknown abyss in the mysterious tunnel to look for Sam, he discovers a world that is familiar but filled with unanswered questions.</p>","runtime":60},{"id":21,"name":"Awakening","outDate":"2014-08-18","seasonNumber":2,"episodeNumber":8,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10453.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10453.jpg","summary":"<p>When Barbie enlists his father's help to reach out to Julia, he realizes that Don may know more about the Dome than he is letting on. Meanwhile, Big Jim appoints himself sheriff of Chester's Mill.</p>","runtime":60},{"id":22,"name":"The Red Door","outDate":"2014-08-25","seasonNumber":2,"episodeNumber":9,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10454.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10454.jpg","summary":"<p>When Barbie is apprehended by a group of mysterious men, he is relentlessly interrogated about his connection to the Dome. Meanwhile, Big Jim makes a deal that could seal the fate of the residents of Chester's Mill forever.</p>","runtime":60},{"id":23,"name":"The Fall","outDate":"2014-09-01","seasonNumber":2,"episodeNumber":10,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10455.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10455.jpg","summary":"<p>Big Jim finally learns the shocking truth about what really happened to his wife, Pauline, when they are reunited. Meanwhile, climate change poses a new threat to Chester's Mill.</p>","runtime":60},{"id":24,"name":"Black Ice","outDate":"2014-09-08","seasonNumber":2,"episodeNumber":11,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10456.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10456.jpg","summary":"<p>When temperatures begin to plunge, Sam and Rebecca spring into action to try to save the residents of Chester's Mill. Meanwhile, Barbie risks his own life in order to save Julia after a terrible accident.</p>","runtime":60},{"id":25,"name":"Turn","outDate":"2014-09-15","seasonNumber":2,"episodeNumber":12,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10457.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10457.jpg","summary":"<p>When a new threat from the Dome intensifies, the residents of Chester's Mill find themselves at risk of being crushed to death. Meanwhile, Melanie's health continues to deteriorate as the fate of the egg remains unknown.</p>","runtime":60},{"id":26,"name":"Go Now","outDate":"2014-09-22","seasonNumber":2,"episodeNumber":13,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/4/10458.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/4/10458.jpg","summary":"<p>Potential exit from the Dome is revealed just as the walls begin closing in on those trapped in Chester's Mill.</p>","runtime":60}],"summary":"","urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/24/60942.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/24/60942.jpg"},{"id":6233,"numberSeasonInshow":3,"name":"","nbEpisode":13,"episodes":[{"id":142270,"name":"Move On","outDate":"2015-06-25","seasonNumber":3,"episodeNumber":1,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/12/31233.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/12/31233.jpg","summary":"<p>Season 3 begins with Chester's Mill residents appearing inside and outside the Dome following an evacuation into the tunnels beneath the town. Meanwhile, the Dome begins to reveal its ultimate agenda; and surprising alliances form as new residents emerge.</p>","runtime":60},{"id":151048,"name":"But I'm Not","outDate":"2015-06-25","seasonNumber":3,"episodeNumber":2,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/12/31234.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/12/31234.jpg","summary":"<p>Chester's Mill residents appear inside and outside the Dome following an exit into the tunnels beneath the town. Meanwhile, the Dome begins to reveal its ultimate agenda; and surprising alliances form as new residents emerge.</p>","runtime":60},{"id":151645,"name":"Redux","outDate":"2015-07-02","seasonNumber":3,"episodeNumber":3,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/12/31939.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/12/31939.jpg","summary":"<p>The residents of Chester's Mill try to move on with their lives in the aftermath of their mysterious experience in the tunnels beneath town. Meanwhile, Big Jim suspects new residents Christine and Eva are keeping secrets concerning the Dome.</p><p><br><br></p>","runtime":60},{"id":153120,"name":"The Kinship","outDate":"2015-07-09","seasonNumber":3,"episodeNumber":4,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/12/32457.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/12/32457.jpg","summary":"<p>Urges the townspeople towards specific individuals and projects that remind them of their experience in the tunnels. Also, Julia and Big Jim make shocking discoveries that reveal a new threat within the Dome.</p>","runtime":60},{"id":176889,"name":"Alaska","outDate":"2015-07-16","seasonNumber":3,"episodeNumber":5,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/13/33494.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/13/33494.jpg","summary":"<p>Big Jim and Julia form a tentative alliance to search for proof that will discredit Christine, which leads them to new information about the Dome's capabilities. Meanwhile, when tensions run high in town and threaten Christine's leadership, she puts a plan in play that has deadly consequences.</p>","runtime":60},{"id":176890,"name":"Caged","outDate":"2015-07-23","seasonNumber":3,"episodeNumber":6,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/13/34493.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/13/34493.jpg","summary":"<p>For information about her agenda. Also, when Joe and Norrie question the town's new rules, they find themselves in a dangerous face-off with the increasingly unstable residents.</p>","runtime":60},{"id":185048,"name":"Ejecta","outDate":"2015-07-30","seasonNumber":3,"episodeNumber":7,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/13/34948.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/13/34948.jpg","summary":"<p>As the world outside the Dome is rocked by a catastrophic meteor shower, unexpected alliances form inside the barrier. Eva tries to indoctrinate Barbie deeper into The Kinship and Big Jim and Julia turn to one another while isolated on Bird Island outside of town. Also, Joe is forced to accept help from Sam, the man who killed his sister.</p>","runtime":60},{"id":185049,"name":"Breaking Point","outDate":"2015-08-06","seasonNumber":3,"episodeNumber":8,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/14/36036.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/14/36036.jpg","summary":"<p>Who is mobilizing residents to work on a massive excavation project in the caves underneath the town. Also, Hunter uses his tech skills to contact the outside world.</p>","runtime":60},{"id":185050,"name":"Plan B","outDate":"2015-08-13","seasonNumber":3,"episodeNumber":9,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/14/37358.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/14/37358.jpg","summary":"<p>Control over the town by initiating a life-or-death plot involving Barbie and Eva, while Joe and Norrie conduct research to better understand the Dome's ultimate agenda. Meanwhile, Hunter finds more information about the true head of Aktaion, the nefarious private corporation that wants to harness the Dome's energy.</p>","runtime":60},{"id":185051,"name":"Legacy","outDate":"2015-08-20","seasonNumber":3,"episodeNumber":10,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/15/39057.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/15/39057.jpg","summary":"<p>The nefarious head of Aktaion. Despite Hektor revealing more about the Dome's origins and helping to strike back at it, Big Jim and Julia still worry he will betray them. Meanwhile, Hunter receives encrypted files that give disturbing insights into the final effect the Dome will have on the infected townspeople.</p>","runtime":60},{"id":185052,"name":"Love is a Battlefield","outDate":"2015-08-27","seasonNumber":3,"episodeNumber":11,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/16/40250.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/16/40250.jpg","summary":"<p>The head of Aktaion, to test a possible cure for infected townspeople. Also, Joe chooses to work with Christine after she shares some shocking information about the entity behind the Dome.</p>","runtime":60},{"id":185053,"name":"Incandescence","outDate":"2015-09-03","seasonNumber":3,"episodeNumber":12,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/16/41932.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/16/41932.jpg","summary":"<p>Who is adamant that infected townspeople never escape the Dome.</p>","runtime":60},{"id":185054,"name":"The Enemy Within","outDate":"2015-09-10","seasonNumber":3,"episodeNumber":13,"urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_landscape/17/43622.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/17/43622.jpg","summary":"<p>As the Dome in Chester's Mill comes down, the Resistance makes a final attempt to protect the outside world from the infected townspeople in the Kinship and their new queen.</p>","runtime":60}],"summary":"","urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/182/457332.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/182/457332.jpg"}],"cast":[{"actorId":7,"actorName":"Mackenzie Lintz","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/3/7816.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/3/7816.jpg","characterId":7,"characterName":"Norrie Calvert-Hill","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/793.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/793.jpg"},{"actorId":9,"actorName":"Dean Norris","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/163/408986.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/163/408986.jpg","characterId":9,"characterName":"James \"Big Jim\" Rennie","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/2.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/2.jpg"},{"actorId":1,"actorName":"Mike Vogel","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/1815.jpg","characterId":1,"characterName":"Dale \"Barbie\" Barbara","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/3.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/3.jpg"},{"actorId":2,"actorName":"Rachelle Lefevre","actorCountryName":"Canada","actorCountryCode":"CA","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/82/207417.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/82/207417.jpg","characterId":2,"characterName":"Julia Shumway","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/6.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/6.jpg"},{"actorId":3,"actorName":"Alexander Koch","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/205/513325.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/205/513325.jpg","characterId":3,"characterName":"Junior Rennie","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/10.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/10.jpg"},{"actorId":5,"actorName":"Colin Ford","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/142/356748.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/142/356748.jpg","characterId":5,"characterName":"Joe McAlister","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/7.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/7.jpg"},{"actorId":4,"actorName":"Eddie Cahill","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/1162.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/1162.jpg","characterId":4,"characterName":"Sam Verdreaux","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/17/44108.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/17/44108.jpg"},{"actorId":6,"actorName":"Nicholas Strong","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/2499.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/2499.jpg","characterId":6,"characterName":"Phil Bushey","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/5.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/5.jpg"},{"actorId":11,"actorName":"Britt Robertson","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/158/396055.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/158/396055.jpg","characterId":11,"characterName":"Angie McAlister","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/4.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/4.jpg"},{"actorId":12,"actorName":"Aisha Hinds","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/1/2665.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/1/2665.jpg","characterId":12,"characterName":"Carolyn Hill","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/8.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/8.jpg"},{"actorId":10,"actorName":"Natalie Martinez","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/1753.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/1753.jpg","characterId":10,"characterName":"Deputy Linda Esquivel","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/792.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/792.jpg"},{"actorId":8,"actorName":"Karla Crome","actorCountryName":"United Kingdom","actorCountryCode":"GB","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/3/7817.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/3/7817.jpg","characterId":8,"characterName":"Rebecca Pine","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/794.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/794.jpg"},{"actorId":35903,"actorName":"Kylie Bunbury","actorCountryName":"Canada","actorCountryCode":"CA","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/3/8789.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/3/8789.jpg","characterId":140786,"characterName":"Eva Sinclair","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/17/44109.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/17/44109.jpg"},{"actorId":13,"actorName":"Jolene Purdy","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Female","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/2/5993.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/2/5993.jpg","characterId":13,"characterName":"Dodee Weaver","characterUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/9.jpg","characterUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/9.jpg"},{"actorId":14,"actorName":"Jeff Fahey","actorCountryName":"United States","actorCountryCode":"US","actorSexe":"Male","actorUrlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/0/1163.jpg","actorUrlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/0/1163.jpg","characterId":14,"characterName":"Sheriff Duke Perkins","characterUrlMediumImage":"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png","characterUrlOriginalImage":"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"}],"information":{"id":1,"name":"Under the Dome","type":"Scripted","genre":["Drama","Science-Fiction","Thriller"],"status":"Ended","start":"2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","urlMediumImage":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","urlOriginalImage":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg","rate":6.5,"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","network":"CBS","countryName":"United States","countryCode":"US"}}
module.exports.displaySerieEpisode = function displaySerieEpisode (req, res) {
  const serieId = req.query.serieId;
  Serie.displaySerieEpisode(serieId, req.body)
    .then(result => {
      console.log('Episodes displayed')
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.isFollowedSerie = function isFollowedSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  Serie.isFollowedSerie(serieId,userId)
    .then(result => {
      if(result){
        console.log('This users follow this serie')
      } else {
        console.log('This users doesn\'t follow this serie')
      }
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.countFollowersSerie = function countFollowersSerie (req, res) {
  const serieId = req.query.serieId;
  Serie.countFollowersSerie(serieId)
    .then(result => {
      console.log(result + 'users follow this serie')
      return result
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.followSerie = function followSerie (req, res) {
  //const showToFollow = JSON.parse(test);
  const userId = req.query.userId;
  Serie.followSerie(/*showToFollow,*/ userId)
    .then(() => {
      console.log('Serie followed')
    })
    .catch(err => {
      console.log(err)
    });
};

module.exports.unfollowSerie = function unfollowSerie (req, res) {
  const serieId = req.query.serieId;
  const userId = req.query.userId;
  Serie.unfollowSerie(serieId,userId)
    .then(() => {
      console.log('Serie unfollowed')
    })
    .catch(err => {
      console.log(err)
    });
};
