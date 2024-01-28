//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

//create server
var app = http.createServer(function(request,response){
    //get url info
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;

    //print url info
    console.log(url.parse(_url,true));

    //if url is root, send hello world
    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', function(error,filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i++;
                }
                list = list + '</ul>';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        }else{
            fs.readdir('./data', function(error,filelist){
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description,{
                        allowedTags:['h1']
                    });
                    var list = '<ul>';
                    var i = 0;
                    while(i < filelist.length){
                        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                        i++;
                    }
                    list = list + '</ul>';
                    var template = `
                    <!doctype html>
                    <html>
                    <head>                        <title>WEB1 - ${sanitizedTitle}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${sanitizedTitle}</h2>
                        <p>${sanitizedDescription}</p>
                    </body>
                    </html>
                    </head>
                    `;
