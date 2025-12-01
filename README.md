# 🚗 Lava Jato Control - Sistema de Agendamentos

Sistema completo de gerenciamento de agendamentos para lava jatos com autenticação segura e banco de dados em nuvem.

## ✨ Características

### 🔐 Segurança
- **Autenticação com email e senha** via Firebase Authentication
- **Dados privados por usuário** - cada usuário vê apenas seus próprios agendamentos
- **Regras de segurança do Firestore** configuradas para proteger os dados
- **Criptografia** - todas as senhas são criptografadas pelo Firebase
- **Logout seguro** - botão para sair da conta com segurança

### 🎨 Design Diferenciado
- **Tela de login moderna** com gradiente animado que segue o cursor do mouse
- **Efeito glassmorphism** - visual moderno com vidro fosco
- **Partículas flutuantes** animadas no fundo
- **Brilho dinâmico** que acompanha o movimento do mouse
- **Interface responsiva** - funciona perfeitamente em celular e desktop
- **Animações suaves** - transições e efeitos visuais profissionais

### 📱 Funcionalidades
- Agendamento de lavagens com diferentes tipos de veículos
- Gestão de horários (8h às 17h com pausa para almoço)
- Suporte para veículos grandes (ocupam 2 horários)
- Cadastro de placa e modelo do veículo
- Clientes semanais identificados
- Histórico completo de lavagens
- Relatórios financeiros com estatísticas
- Busca por cliente, placa ou data
- Sincronização em tempo real entre dispositivos

## 🚀 Como Configurar

### 1. Configurar o Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" e siga as instruções
3. Após criar o projeto:
   - Vá em **Authentication** → **Get Started** → **Email/Password** → **Ativar**
   - Vá em **Firestore Database** → **Criar banco de dados** → **Modo produção**
   - Vá em **Configurações do projeto** → **Seus aplicativos** → **Adicionar app Web**

4. Copie as credenciais fornecidas

### 2. Configurar o Projeto

1. Abra o arquivo `index.html`
2. Localize a seção de configuração do Firebase (linha ~140)
3. Substitua com suas credenciais:

```javascript
const __firebase_config = JSON.stringify({
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJECT_ID.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJECT_ID.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
});
```

### 3. Configurar Regras de Segurança

1. No Firebase Console, vá em **Firestore Database** → **Regras**
2. Copie o conteúdo do arquivo `firestore.rules` e cole lá
3. Clique em **Publicar**

### 4. Executar o Projeto

Você tem várias opções:

**Opção A: Abrir direto no navegador**
- Simplesmente abra o arquivo `index.html` no seu navegador

**Opção B: Usar um servidor local** (recomendado)
```bash
# Se tiver Python instalado:
python -m http.server 8000

# Ou use o Live Server do VS Code
```

## 📋 Estrutura de Arquivos

```
LavaJato/
├── index.html          # Página HTML principal
├── mai.js              # Código React da aplicação
├── firestore.rules     # Regras de segurança do banco
└── README.md           # Este arquivo
```

## 🔒 Segurança Implementada

### Autenticação
- ✅ Login com email e senha
- ✅ Criação de conta segura
- ✅ Validação de credenciais
- ✅ Logout seguro
- ✅ Proteção de rotas - só acessa logado

### Banco de Dados
- ✅ Cada usuário só vê seus próprios dados
- ✅ Validação de permissões no servidor
- ✅ Impossível acessar dados de outros usuários
- ✅ Proteção contra modificações não autorizadas
- ✅ Validação de campos obrigatórios

## 🎯 Como Usar

### Primeiro Acesso
1. Abra o sistema
2. Na tela de login, clique em "Não tem conta? Registre-se"
3. Digite seu email e crie uma senha (mínimo 6 caracteres)
4. Clique em "Criar Conta"

### Agendando uma Lavagem
1. Clique no botão **+** no canto superior direito
2. Preencha os dados:
   - Nome do cliente
   - Placa (opcional)
   - Modelo do veículo (opcional)
   - Tipo de veículo
   - Data e horário
   - Valor
3. Clique em "Agendar Lavagem"

### Gerenciando Agendamentos
- **✅ Concluir**: Marque como concluído quando finalizar
- **🗑️ Excluir**: Remove o agendamento permanentemente
- **📅 Agenda**: Veja os horários do dia
- **🕐 Histórico**: Busque e visualize todos os registros
- **💰 Finanças**: Acompanhe o faturamento

## 🌟 Diferenciais da Tela de Login

1. **Gradiente Dinâmico**: O fundo muda suavemente seguindo o cursor
2. **Efeito de Brilho**: Um círculo de luz acompanha o mouse
3. **Partículas Animadas**: 20 partículas flutuam aleatoriamente
4. **Glassmorphism**: Efeito de vidro fosco moderno
5. **Animações Suaves**: Transições profissionais em todos os elementos
6. **Toggle Senha**: Botão para mostrar/ocultar senha
7. **Feedback Visual**: Animações de erro e sucesso

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Firebase Authentication** - Sistema de login
- **Cloud Firestore** - Banco de dados em tempo real
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Ícones modernos
- **CSS Animations** - Animações customizadas

## 📱 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge (versões recentes)
- ✅ Dispositivos móveis iOS e Android
- ✅ Tablets
- ✅ Desktop

## 💡 Dicas

1. **Senha Forte**: Use pelo menos 8 caracteres com letras e números
2. **Backup Regular**: Os dados ficam salvos no Firebase automaticamente
3. **Multi-dispositivo**: Faça login em vários dispositivos com a mesma conta
4. **Sincronização**: Mudanças aparecem em tempo real em todos os dispositivos

## 🆘 Problemas Comuns

**Erro: "Firebase not configured"**
- Verifique se inseriu as credenciais corretas no `index.html`

**Erro: "Permission denied"**
- Configure as regras de segurança no Firebase Console

**Não consigo criar conta**
- Verifique se ativou o método Email/Password no Firebase Authentication

**A tela fica em branco**
- Abra o Console do navegador (F12) para ver erros
- Verifique se todas as URLs dos scripts CDN estão carregando

## 📞 Suporte

Se precisar de ajuda, verifique:
1. As credenciais do Firebase estão corretas?
2. O Authentication está habilitado?
3. As regras do Firestore foram aplicadas?
4. O navegador suporta todas as funcionalidades?

## 🚀 Próximos Passos

Possíveis melhorias futuras:
- [ ] Notificações por email
- [ ] Exportação de relatórios em PDF
- [ ] App mobile nativo
- [ ] Integração com WhatsApp
- [ ] Sistema de lembretes automáticos
- [ ] Múltiplos colaboradores por conta

---

**Desenvolvido com ❤️ para facilitar o gerenciamento do seu lava jato**
