{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Sistema de teste A/B com cookies\
\
// 1. Fun\'e7\'e3o para ler cookies\
function lerCookie(nome) \{\
    // Pega todos os cookies\
    const todosCookies = document.cookie;\
    // Procura pelo cookie que queremos\
    const partes = todosCookies.split(`; $\{nome\}=`);\
    // Se encontrou, retorna o valor\
    if (partes.length === 2) \{\
        return partes.pop().split(';').shift();\
    \}\
    return null;\
\}\
\
// 2. Fun\'e7\'e3o para salvar cookies\
function salvarCookie(nome, valor, dias) \{\
    // Cria data de expira\'e7\'e3o\
    const data = new Date();\
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));\
    const expira = "expires=" + data.toUTCString();\
    \
    // Salva o cookie\
    document.cookie = nome + "=" + valor + ";" + expira + ";path=/";\
\}\
\
// 3. L\'f3gica principal\
function iniciarTesteAB() \{\
    // Verifica se usu\'e1rio j\'e1 tem uma vers\'e3o\
    const versaoAtual = lerCookie('versao_landing');\
    \
    if (versaoAtual === 'A') \{\
        // J\'e1 viu vers\'e3o A antes\
        window.location.href = 'landing-a/';\
    \} else if (versaoAtual === 'B') \{\
        // J\'e1 viu vers\'e3o B antes\
        window.location.href = 'landing-b/';\
    \} else \{\
        // Novo visitante - sorteia vers\'e3o\
        const sorteio = Math.random(); // N\'famero entre 0 e 1\
        \
        if (sorteio < 0.5) \{\
            // 50% de chance - Vers\'e3o A\
            salvarCookie('versao_landing', 'A', 7); // Guarda por 7 dias\
            window.location.href = 'landing-a/';\
        \} else \{\
            // 50% de chance - Vers\'e3o B\
            salvarCookie('versao_landing', 'B', 7); // Guarda por 7 dias\
            window.location.href = 'landing-b/';\
        \}\
    \}\
\}\
\
// 4. Executa quando a p\'e1gina carrega\
window.onload = iniciarTesteAB;}