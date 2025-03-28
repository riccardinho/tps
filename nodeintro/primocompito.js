const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Funzione per gestire la richiesta e la risposta
const server = http.createServer((req, res) => {
    // Imposta l'intestazione della risposta come HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Ottieni il metodo della richiesta
    const method = req.method;
    const parsedUrl = url.parse(req.url, true);

    // Se la richiesta è GET (per visualizzare il modulo)
    if (method === 'GET' && parsedUrl.pathname === '/') {
        res.statusCode = 200;
        res.end(`
            <html>
                <head>
                    <title>Inserisci una stringa</title>
                </head>
                <body>
                    <h1>Inserisci una stringa</h1>
                    <form action="/" method="POST">
                        <label for="inputString">Stringa: </label>
                        <input type="text" id="inputString" name="inputString" required>
                        <button type="submit">Invia</button>
                    </form>
                </body>
            </html>
        `);
    }
    // Se la richiesta è POST (quando l'utente invia il modulo)
    else if (method === 'POST' && parsedUrl.pathname === '/') {
        let body = '';

        // Leggi il corpo della richiesta
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const inputString = parsedBody.inputString || 'Nessuna stringa inserita';

            // Rispondi con il testo che l'utente ha inserito
            res.statusCode = 200;
            res.end(`
                <html>
                    <head>
                        <title>Risultato</title>
                    </head>
                    <body>
                        <h1>Hai inserito:</h1>
                        <p>${inputString}</p>
                        <a href="/">Torna alla pagina principale</a>
                    </body>
                </html>
            `);
        });
    } else {
        // Se la rotta non è trovata, invia un errore 404
        res.statusCode = 404;
        res.end('<h1>Pagina non trovata</h1>');
    }
});

// Imposta la porta su cui il server ascolta
const port = 3000;
server.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
