const request = require('request') ;
const Cheerio = require('cheerio') ;
const path = require('path') ;
const fs = require('fs') ;
const pdf = require('pdfkit');
// const url = 'https://github.com//ccxt/ccxt/issues' ;

//--------------------------------------------------------------------------------------------------------

function issuePageFullLinks(url, topicName, repoName)
{
    request(url, cb) ;

    function cb(error, response, html)
    {
        if(error)
        {
            console.log(error) ;
        }
        else{
            getIssues(html) ;
        }
    }

    function getIssues(html)
    {
        let $ = Cheerio.load(html) ;
        let IssuesPage = $('.Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row') ;
        let links = [] ;
        console.log(IssuesPage.length) ;
        for(let i=0; i<IssuesPage.length ; i++)
        {
            let anchorArr = $(IssuesPage[i]).find("a") ;
            let hreflink = $(anchorArr[0]).attr("href") ;
            let fullLink = 'https://github.com/' + hreflink ;
            links.push(fullLink) ;
        }
        console.log(repoName, ' -> ', links) ;
        let topicPath = path.join(__dirname,'Technology', topicName) ;
        dirCreator(topicPath) ;
        let filePath = path.join(topicPath, repoName + '.pdf') ;
        let text = JSON.stringify(links) ;
        pdfCreator(filePath, text) ;
    }
}



//------------------------------------------------------------------------------------------------------

function dirCreator(filePath)
{
    if(fs.existsSync(filePath) == false)
    {
        fs.mkdirSync(filePath) ;
    }
}

//-------------------------------------------------------------------------------------------------------

function pdfCreator(filePath, text)
{
    let pdfDoc = new pdf;
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
}



//-------------------------------------------------------------------------------------------------------

module.exports = {
    issueLinks : issuePageFullLinks
}