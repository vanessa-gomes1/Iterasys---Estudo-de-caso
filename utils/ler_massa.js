import fs from 'node:fs';
import path from 'node:path';

const caminhoCasosDeTeste = path.join(
    process.cwd(),
    'data',
    'casos_de_teste.md'
);

const caminhoCriteriosDeAceitacao = path.join(
    process.cwd(),
    'data',
    'criterios_de_aceitacao.md'
);

function lerArquivo(caminhoArquivo) {
    return fs.readFileSync(caminhoArquivo, 'utf8');
}

function extrairTabelaDaSecao(conteudo, tituloSecao) {
    const linhas = conteudo.split(/\r?\n/);

    const indiceInicio = linhas.findIndex(
        linha => linha.trim() === `## ${tituloSecao}`
    );

    if (indiceInicio === -1) {
        throw new Error(
            `Seção "${tituloSecao}" não encontrada no arquivo de massa.`
        );
    }

    const linhasSecao = [];

    for (
        let indice = indiceInicio + 1;
        indice < linhas.length;
        indice++
    ) {
        const linha = linhas[indice].trim();

        if (linha.startsWith('## ')) {
            break;
        }

        linhasSecao.push(linha);
    }

    const linhasTabela = linhasSecao.filter(
        linha => linha.startsWith('|')
    );

    const linhasDados = linhasTabela.filter(linha => {
        const celulas = linha
            .split('|')
            .slice(1, -1)
            .map(celula => celula.trim());

        return (
            celulas.length > 0 &&
            !celulas.every(
                celula => /^[-:\s]+$/.test(celula)
            )
        );
    });

    if (linhasDados.length < 2) {
        throw new Error(
            `Nenhuma massa de teste válida encontrada na seção "${tituloSecao}".`
        );
    }

    // Remove o cabeçalho da tabela.
    linhasDados.shift();

    return linhasDados;
}

function converterLinhaParaCelulas(linha) {
    return linha
        .split('|')
        .slice(1, -1)
        .map(celula => celula.trim());
}

export function lerMassaCursos() {
    const conteudo = lerArquivo(caminhoCasosDeTeste);

    const linhas = conteudo
        .split(/\r?\n/)
        .map(linha => linha.trim())
        .filter(linha => linha.startsWith('|'));

    const linhasDados = linhas.filter(linha => {
        const celulas = converterLinhaParaCelulas(linha);

        return (
            celulas.length === 5 &&
            /^\d+$/.test(celulas[0]) &&
            !celulas.every(
                celula => /^[-:\s]+$/.test(celula)
            )
        );
    });

    return linhasDados.map(linha => {
        const [
            id,
            cursoHome,
            tituloCurso,
            modulo,
            aula
        ] = converterLinhaParaCelulas(linha);

        return {
            id,
            cursoHome,
            tituloCurso,
            modulo,
            aula
        };
    });
}

export function lerMassaCA002() {
    const conteudo = lerArquivo(caminhoCriteriosDeAceitacao);

    const linhas = extrairTabelaDaSecao(
        conteudo,
        'CA002 - Visualização dos cursos disponíveis'
    );

    return linhas.map(linha => {
        const [
            id,
            curso,
            statusAluno,
            acaoEsperada
        ] = converterLinhaParaCelulas(linha);

        return {
            id,
            curso,
            statusAluno,
            acaoEsperada
        };
    });
}

export function lerMassaCA003() {
    const conteudo = lerArquivo(caminhoCriteriosDeAceitacao);

    const linhas = extrairTabelaDaSecao(
        conteudo,
        'CA003 - Navegação entre aulas e reprodução do conteúdo'
    );

    return linhas.map(linha => {
        const [
            id,
            cursoHome,
            tituloCurso,
            moduloInicial,
            aulaInicial,
            agrupadorAulaSeguinte,
            aulaSeguinte
        ] = converterLinhaParaCelulas(linha);

        return {
            id,
            cursoHome,
            tituloCurso,
            moduloInicial,
            aulaInicial,
            agrupadorAulaSeguinte,
            aulaSeguinte
        };
    });
}