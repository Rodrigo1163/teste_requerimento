const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

exports.criarPDF = async (req, res) => {
    const { nome, naturalidade, estado_civil, endereço, telefone, bairro, email, cep, matricula, cargo, identidade, cpf, data_nasc, lotacao, dados_requerimento } = req.body;
    const pathFile = await path.join(__dirname, "..", "views", "pages", "print.ejs");
    try {
        const imagePath = await path.resolve(__dirname, 'logo.png');

        const resizedImageBuffer = await sharp(imagePath)
        .resize({ width: 400 }) // Redimensiona a largura para 800 pixels
        .jpeg({ quality: 100 }) // Define a qualidade JPEG para 80%
        .toBuffer();
        // const imageBuffer = fs.readFileSync(imagePath);
        // Lendo a imagem como um buffer e codificando em base64
        const imageBase64 = await resizedImageBuffer.toString('base64');
        const resizedImageSrc  = await `data:image/jpeg;base64,${imageBase64}`;

        // Passando imageSrc como parâmetro para renderizar o arquivo print.ejs
        const html = await ejs.renderFile(pathFile, { imageSrc: resizedImageSrc , nome, naturalidade, estado_civil, endereço, telefone, bairro, email, cep, matricula, cargo, identidade, cpf, data_nasc, lotacao, dados_requerimento });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        await page.emulateMediaType('screen');

        const pdf = await page.pdf({
            printBackground: true,
            format: 'A4'
        });
        res.send(pdf);



    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).send('Erro ao gerar PDF');
    }
}

