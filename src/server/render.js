import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

export default (componentToRender, gists) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Universal React Router 4 Demo</title>
        <style>
            body {
                font-family: Helvetica Neue, Arial, sans-serif;
                margin: 0;
            }
            html { box-sizing: border-box; }
            *, *:before, *:after { box-sizing: inherit; }
        </style>
    </head>
    <body>
        <div id="app">${renderToStaticMarkup(componentToRender)}</div>
        <script src="/static/client.js"></script>
    </body>
</html>`
