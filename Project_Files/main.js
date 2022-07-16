const request = require('request') ;
const Cheerio = require('cheerio') ;
const path = require('path') ;
const fs = require('fs') ;
const topicReposObj = require("./topicRepos") ;
const url = 'https://github.com/topics' ;

let technologyPath = path.join(__dirname, "Technology") ;
dirCreator(technologyPath) ;

//----------------------------------------------------------------------------------------------

request(url, cb) ;

function cb(error, response, html)
{
    if(error)
    {
        console.error(error) ;
    }
    else{
        extractTechLink(html) ;
    }
}


function extractTechLink(html)
{
    let $ = Cheerio.load(html) ;
    let anchorEle = $('.no-underline.d-flex.flex-column.flex-justify-center') ;

    for(let i=0 ; i<anchorEle.length ; i++)
    {
        let links = $(anchorEle[i]).attr('href').split('/') ;
        // console.log(links,'\n') ;

        topicName = links[2] ;
        let fullTopicLink = 'https://github.com/topics/' + topicName;
        // console.log(topicLink, '\n') ;

        topicReposObj.topicIssueLinks(fullTopicLink, topicName) ;

    }
}

//----------------------------------------------------------------------------------------------

function dirCreator(filePath)
{
    if(fs.existsSync(filePath) == false)
    {
        fs.mkdirSync(filePath) ;
    }
}