# BUG-CT003 — Divergência na quantidade de cursos exibida na Home

## Informações

| Campo  | Valor     |
|--------|-----------|
| ID     | BUG-CT003 |
| Módulo | Área do Aluno — Home Page |
| Funcionalidade | Indicador de quantidade de cursos |
| Severidade | Média |
| Prioridade | Média |
| Ambiente | Produção / Público (Iterasys LearnWorlds) |
| Navegador | Chrome |
| Sistema Operacional | Windows 11 |
| Status | Aberto |

---

## Descrição

Ao acessar a Home Page da Área do Aluno, o indicador “Cursos” exibe a quantidade de 35 cursos. Entretanto, após carregar toda a lista disponível na página, foram identificados 37 cards com títulos distintos, evidenciando uma divergência entre a quantidade informada pelo indicador e a quantidade encontrada na listagem.

---

## Pré-condições

- Possuir uma conta autenticada na plataforma Iterasys LearnWorlds.
- Ter acesso à Home Page da Área do Aluno.

---

## Passos para reprodução

1. Acessar a plataforma Iterasys LearnWorlds.
2. Realizar o login com uma conta válida.
3. Acessar a Home Page da Área do Aluno.
4. Localizar o indicador “Cursos” na seção de indicadores.
5. Registrar a quantidade exibida pelo indicador.
6. Percorrer a lista de cursos, acionando o botão “Carregar mais” até que ele deixe de estar disponível.
7. Contabilizar os cards de cursos encontrados e verificar a existência de títulos duplicados.

---

## Resultado esperado

O indicador “Cursos” deve apresentar uma quantidade compatível com o total de cursos que deveria contabilizar, de acordo com a regra de negócio da plataforma.

---

## Resultado obtido

O indicador “Cursos” exibe o valor 35. Após o carregamento completo da lista, foram encontrados 37 cards com títulos distintos, resultando em uma diferença de dois cursos entre o indicador e a listagem.

---

## Impacto

A divergência pode gerar informações inconsistentes para o aluno sobre a quantidade de cursos disponibilizados em sua área de aprendizagem, reduzindo a confiabilidade das informações apresentadas na Home Page.

---

## Evidências

- **Vídeo:** https://jam.dev/c/d1cbacde-af0f-43a3-b7df-c55f4244281a
- **Resultado da automação:** 35 cursos indicados, 37 cards encontrados, 37 títulos distintos e botão “Carregar mais” indisponível ao final do carregamento.