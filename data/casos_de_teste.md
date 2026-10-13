# Casos de Teste

## 1. Validar acesso ao curso pela Home / Área do Aluno

Descrição: Validar acesso ao curso pela Home / Área do Aluno 

Pré-condição: Usuário autenticado e com matrícula ativa no curso informado na massa de teste.

Passos:
1. Acessar a página inicial da área do aluno.
2. Localizar o card do curso informado na massa de teste.
3. Clicar em **"Continue aprendendo"**.
4. Validar a página interna do curso.
5. Localizar o módulo informado na massa de teste. 
6. Acessar a aula informada na massa de teste.
7. Validar a disponibilidade do player.

Resultado esperado:
O sistema deve direcionar o usuário para a página interna do curso selecionado, apresentar o módulo esperado e disponibilizar o player da aula selecionada.

Resultado obtido: 

### Massa de Teste - CT002

| #  | Curso na Home                                | Título na página do curso             | Módulo        | Aula                                                    |
| -- | -------------------------------------------- | ------------------------------------- | ------------- | ------------------------------------------------------- |
| 01 | Formação em Teste e QA com IA - Turma 148    | Formação em Teste e QA - Turma 148    | Análise       | Histórias de Usuário                                    |
| 02 | Formação em Teste e QA com IA - Turma 148    | Formação em Teste e QA - Turma 148    | Testes de API | Postman - ToolStore                                     |
| 03 | Formação em Teste e QA - Turma 145           | Formação em Teste e QA - Turma 145    | Automação Web | Playwright: Script Estruturado - Pastas por Data e Hora |
