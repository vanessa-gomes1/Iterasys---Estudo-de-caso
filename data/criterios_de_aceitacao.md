# Critérios de aceitação

## CA001 - Acesso à área de cursos

Cenário: Acessar a área de cursos pelo Header

Dado que o aluno esteja autenticado na plataforma
Quando clicar no link “Cursos” no Header
Então o sistema deve direcionar o aluno para a área de cursos
E a página acessada deve apresentar o título “Courses”
E a área de cursos deve ser carregada corretamente, sem apresentar página de erro

Risco associado: RSK-010

# Massa de Teste - CA001

| #  | Elemento                    | Informação esperada              |
| -- | --------------------------- | -------------------------------- |
| 01 | Identificação do aluno      | Nome do aluno autenticado        |
| 02 | Mensagem de boas-vindas     | Mensagem de boas-vindas ao aluno |
| 03 | Indicador                   | Cursos                           |
| 04 | Indicador                   | Horas                            |
| 05 | Indicador                   | Posts                            |
| 06 | Indicador                   | Certificados                     |
| 07 | Indicador                   | Mensagens                        |

## CA002 - Visualização dos cursos disponíveis

Cenário: Visualizar corretamente os cursos disponíveis

Dado que o aluno esteja na área de “Cursos”
Quando a página for carregada
Então o sistema deve apresentar os cards dos cursos disponíveis para o aluno
E cada card deve apresentar o nome do curso
E o card do curso deve apresentar uma ação compatível com o status de acesso do aluno, sendo “Continue aprendendo” para cursos em que o aluno já possui matrícula ou “Inscreva-se” para cursos em que o aluno ainda não está matriculado
E a ação apresentada deve estar habilitada para interação

Risco associado: RSK-008

# Massa de Teste - CA002

| #  | Curso                                      | Status esperado | Ação esperada       |
| -- | ------------------------------------------ | --------------- | ------------------- |
| 01 | Formação em Teste e QA com IA - Turma 148  | Matriculado     | Continue aprendendo |
| 02 | Preparatório  CT-AI                        | Não matriculado | Inscreva-se         |

## CA003 - Navegação entre aulas e reprodução do conteúdo

Cenário: Acessar e navegar entre aulas

Navegação entre aulas e reprodução do conteúdo

Cenário: Acessar uma aula e navegar para outra aula

Dado que o aluno esteja matriculado em um curso e tenha acessado uma aula disponível
Quando selecionar a aula
Então o sistema deve apresentar o conteúdo da aula
E o player deve ser disponibilizado e iniciar a reprodução automaticamente
E quando selecionar outra aula disponível no menu lateral
Então o sistema deve carregar o conteúdo da nova aula
E o player da nova aula deve ser disponibilizado e iniciar a reprodução automaticamente

Risco associado: RSK-002

# Massa de Teste - CA003

| #  | Curso na Home                             | Título na página do curso          | Módulo inicial                        | Aula inicial         | Agrupadro da aula seguinte                      | Aula seguinte                             |
| -- | ----------------------------------------- | ---------------------------------- | ------------------------------------- | -------------------- | ----------------------------------------------- | ----------------------------------------- |
| 01 | Formação em Teste e QA com IA - Turma 148 | Formação em Teste e QA - Turma 148 | Conceitos Fundamentais                | Aula Inaugural       | 3 [Extra] Planejamento: Técnicas Complementares | Estratégias de Teste                      |
| 02 | Formação em Teste e QA com IA - Turma 148 | Formação em Teste e QA - Turma 148 | Análise                               | Histórias de Usuário | Testes de API                                   | Pirâmide de Testes e Testes em 10 Minutos |