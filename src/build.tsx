import React from 'react';
import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {render,outline,validate} from '@hyper-elements/react';
import {renderPdf} from '@hyper-elements/react/pdf';
import {renderImage} from '@hyper-elements/react/image';
import {emailClients,renderInEmailClients} from '@hyper-elements/email-clients';
import {parseNotice} from './model.js';
import {WebNotice,EmailNotice,PrintNotice,ImageNotice} from './template.js';
await mkdir('dist/assets',{recursive:true});
for(const weight of [400,600])await cp(`node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${weight}-normal.woff`,`dist/assets/plex-${weight}.woff`);
await cp('node_modules/@fontsource/ibm-plex-sans/LICENSE','dist/assets/FONT-LICENSE.txt');
const fonts=await Promise.all([400,600].map(async weight=>({family:'IBM Plex Sans',weight,src:await readFile(`dist/assets/plex-${weight}.woff`)})));
const emailPlugin=await emailClients({clients:['gmail','outlook','apple-mail']});
const files=process.argv.slice(2).length?process.argv.slice(2):['data/empty.json','data/github-2024.json'];
for(const file of files){
 const n=parseNotice(JSON.parse(await readFile(file,'utf8'))); const folder=`dist/${n.id}`; await mkdir(folder,{recursive:true});
 const web=<WebNotice n={n}/>,email=<EmailNotice n={n}/>,document=<PrintNotice n={n}/>,canvas=<ImageNotice n={n}/>;
 const diagnostics={web:validate(web),email:validate(email,{plugins:[emailPlugin]}),document:validate(document),canvas:validate(canvas)};
 const embed=`<style>@font-face{font-family:'IBM Plex Sans';src:url('../assets/plex-400.woff')}@font-face{font-family:'IBM Plex Sans';src:url('../assets/plex-600.woff');font-weight:600}a:focus-visible{outline:3px solid #164ACB;outline-offset:3px}body{overflow-wrap:anywhere}</style>`;
 for(const [name,tree] of [['web',web],['email',email],['print',document]] as const){const result=await render(tree);await writeFile(`${folder}/${name}.html`,name==='email'?result.html:result.html.replace('</head>',embed+'</head>'));if(name==='email')await writeFile(`${folder}/email.txt`,result.text||'');}
 const pdf=await renderPdf(document,{fonts});await writeFile(`${folder}/notice.pdf`,pdf.pdf);
 const image=await renderImage(canvas,{fonts});await writeFile(`${folder}/notice.png`,image.image);
 const clients=await renderInEmailClients(email,{emailClients:['outlook','gmail','apple-mail'],computers:['windows']});await mkdir(`${folder}/clients`,{recursive:true});for(const p of clients.previews)await writeFile(`${folder}/clients/${p.filename}`,p.html);
 await writeFile(`${folder}/record.json`,JSON.stringify(n,null,2));
 await writeFile(`${folder}/diagnostics.json`,JSON.stringify({...diagnostics,pdf:pdf.diagnostics,image:image.diagnostics},null,2));
 await writeFile(`${folder}/outline.txt`,outline(web));console.log(`Rendered ${n.id}: web, email + text, PDF, PNG`);
}
await cp('public/index.html','dist/index.html');
await cp('public/studio.css','dist/studio.css');await cp('public/studio.js','dist/studio.js');
