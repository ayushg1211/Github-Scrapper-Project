const request = require('request') ;
const Cheerio = require('cheerio') ;
const path = require('path') ;
const fs = require('fs') ;
const issuePageObj = require("./issuePage") ;
// const url = 'https://github.com/topics/bot' ;




//---------------------------------------------------------------------------------------------------------

function repoTopicIssueLinks(url, topicName)
{
    request(url, cb) ;

    function cb(error, response, html)
    {
        if(error)
        {
            console.log(error) ;
        }
        else{
            extractRepoLink(html) ;
        }
    }


    function extractRepoLink(html)
    {
        let $ = Cheerio.load(html) ;
        let repo = $('.text-bold.wb-break-word') ;

        console.log(topicName) ;
        for(let i=0 ; i<8 ; i++)
        {
            let link = $(repo[i]).attr('href') ;
            let repoName = link.split('/').pop() ;
            let fullLink = 'https://github.com/' + link + '/issues' ;
            console.log(fullLink) ;   
            issuePageObj.issueLinks(fullLink, topicName, repoName) ;     
        }
        console.log('...........................................') ;
    }
}

//----------------------------------------------------------------------------------------------


module.exports = {
    topicIssueLinks : repoTopicIssueLinks
}
