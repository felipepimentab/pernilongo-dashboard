# IoT Dashboard
## Sobre o projeto
Este projeto se trata de um dashboard interativo para aplicações IoT utilizado no trabalho de conclusão de curso (TCC) do aluno Felipe Pimenta Bernardo, em conjunto com o aluno Flávio Alegretti Ramos, orientados pelo professor Dr. José Roberto Boffino de Almeida Monteiro.

## Rodando o projeto
Instalando dependências
```
npm install
```
Rodando localmente em modo de desenvolvimento
```
npm run dev
```
Rodando localmente expondo para a rede local
```
npm run serve
```
Fazendo a build para produção
```
npm run build
```
## Tecnologias
Este projeto foi criado utilizando o framework **Vue 3**, com **TypeScript** para tipagem. Para testes unitários foi escolhido o **Vitest**. Para testes *End-to-End* (E2E) foi escolhido o **Cypress**. O projeto conta também com **Vue Router** para roteamento de páginas e **Pinia** para gerenciamento de estados.

## Arquitetura

### Tópicos
Visão geral da estrutura de tópicos do broker:
```
/motor
├── /estado
|   ├── /atual
|   └── /meta
├── /velocidade
├── /tensao
├── /corrente
|   ├── /atual
|   ├── /max
|   └── /meta
├── /temperatura
|   ├── /atual
|   └── /max
└── /avisos
    ├── /luz
    └── /som
```

#### Estado
O tópico `/estado` se refere ao estado do motor, i.e., ligado ou desligado. Possui dois subtópicos: `/atual` e `/meta`.