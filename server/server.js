const puppeteer = require('puppeteer');
const path = require('path');
const express = require('express');
const app = express();

//middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname,  "scraper/build", "index.html"));
// });
app.get("/", function(req, res) {
    var lugar = path.join(__dirname,  "..", "public", "index.html");
    console.log(lugar);
    res.sendFile(path.join(__dirname,  "..", "public"));
})

app.get('/api/articles', (req, res) => {
    (async() => {
        // for (var i = 0;i<6;i++) {
        //     const proxies = ['81.95.230.211', '192.140.42.81', '36.67.106.58', '103.241.227.106','193.188.254.67', '34.94.174.195', '103.31.251.17'];
            const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',ignoreDefaultArgs: ['--disable-extensions'], headless: true});
    
                var page = await browser.newPage();        // open new tab
                await page.goto('https://levelup.com');       // go to google.com       
    
                const enlaces = await page.evaluate(() => {
                    const elements = document.querySelectorAll('.newswrap h4 a');
    
                    const links = [];
    
                    for (let element of elements) {
                        links.push(element.href);
                    }
                    return links;
                });
    
                let articles = []
                for (let enlace of enlaces) {
                    await page.goto(enlace);
                    await page.waitForSelector('.post-infoContainer');
    
                   const articulo = await page.evaluate(() => {
                        const tmp = {};
    
                        tmp.title = document.querySelector('.header_info_Desktop h1').innerText;
                        tmp.autor = document.querySelector('.post-infoContainer a span').innerText;
                        tmp.hora = document.querySelector('time').innerText;
                        tmp.texto = [...document.querySelectorAll('#bodyText p')].map(elem => elem.innerText);
                        return tmp;
    
                    });
                    articles.push(articulo);
                }
    
            // await page.waitFor(60000);
    
            await browser.close();
            res.json(articles);
    
    })();

})


// app.use("/api", function(req, res) {


// });
app.listen(5000, () => {
    console.log("Server listening on port http://localhost:5000");
});