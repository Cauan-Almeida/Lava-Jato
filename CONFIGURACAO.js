/* ============================================
   CONFIGURAÇÃO RÁPIDA DO FIREBASE
   ============================================ */

// 1. CRIAR PROJETO NO FIREBASE
// ---------------------------------------------
// Acesse: https://console.firebase.google.com/
// Clique em "Adicionar projeto"
// Dê um nome (ex: lavajato-control)
// Siga as etapas de criação


// 2. ATIVAR AUTHENTICATION
// ---------------------------------------------
// No menu lateral: Authentication
// Clique em "Get Started"
// Vá em "Sign-in method"
// Clique em "Email/Password"
// Ative a primeira opção (Email/Password)
// Clique em "Salvar"


// 3. CRIAR FIRESTORE DATABASE
// ---------------------------------------------
// No menu lateral: Firestore Database
// Clique em "Criar banco de dados"
// Selecione "Modo produção"
// Escolha uma localização (ex: southamerica-east1)
// Clique em "Ativar"


// 4. CONFIGURAR REGRAS DE SEGURANÇA
// ---------------------------------------------
// Ainda em Firestore Database, clique em "Regras"
// Copie o conteúdo do arquivo "firestore.rules"
// Cole no editor de regras
// Clique em "Publicar"


// 5. OBTER CREDENCIAIS
// ---------------------------------------------
// No menu lateral: clique no ícone de engrenagem ⚙️
// Vá em "Configurações do projeto"
// Role até "Seus aplicativos"
// Clique no ícone </> (Web)
// Dê um apelido (ex: web-app)
// NÃO precisa marcar Firebase Hosting
// Clique em "Registrar app"
// Copie APENAS o objeto firebaseConfig


// 6. COLAR CREDENCIAIS NO PROJETO
// ---------------------------------------------
// Abra o arquivo "index.html"
// Localize a linha ~140 onde está __firebase_config
// Substitua pelos seus dados:

const __firebase_config = JSON.stringify({
  apiKey: "SUA_API_KEY",                              // Cole aqui
  authDomain: "SEU-PROJETO.firebaseapp.com",         // Cole aqui
  projectId: "SEU-PROJETO",                          // Cole aqui
  storageBucket: "SEU-PROJETO.appspot.com",          // Cole aqui
  messagingSenderId: "123456789",                     // Cole aqui
  appId: "1:123456789:web:abc123"                    // Cole aqui
});


// 7. TESTAR O SISTEMA
// ---------------------------------------------
// Abra o arquivo index.html no navegador
// Você verá a tela de login moderna
// Clique em "Não tem conta? Registre-se"
// Crie uma conta com seu email
// Pronto! Você já pode usar o sistema


// ============================================
//   EXEMPLO DE CREDENCIAIS (FORMATO)
// ============================================

/* ANTES de preencher, suas credenciais vão parecer assim:

{
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "meu-lavajato.firebaseapp.com",
  projectId: "meu-lavajato",
  storageBucket: "meu-lavajato.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
}

Copie EXATAMENTE como aparece no Firebase Console!
*/


// ============================================
//   CHECKLIST DE SEGURANÇA ✅
// ============================================

// [ ] Authentication Email/Password está ATIVO
// [ ] Firestore Database foi criado
// [ ] Regras de segurança foram PUBLICADAS
// [ ] Credenciais foram coladas no index.html
// [ ] Testei criar uma conta
// [ ] Testei fazer login
// [ ] Testei criar um agendamento
// [ ] Testei o logout


// ============================================
//   DICAS IMPORTANTES 💡
// ============================================

// 1. NUNCA compartilhe suas credenciais em repositórios públicos
// 2. As regras de segurança PROTEGEM seus dados
// 3. Cada usuário só vê SEUS PRÓPRIOS agendamentos
// 4. Os dados ficam salvos AUTOMATICAMENTE
// 5. Funciona em QUALQUER dispositivo com internet


// ============================================
//   PROBLEMAS COMUNS E SOLUÇÕES 🔧
// ============================================

// ERRO: "Firebase: Error (auth/operation-not-allowed)"
// SOLUÇÃO: Ative Email/Password no Firebase Authentication

// ERRO: "Missing or insufficient permissions"
// SOLUÇÃO: Publique as regras de segurança no Firestore

// ERRO: "Firebase not configured"
// SOLUÇÃO: Verifique se colou as credenciais corretamente

// ERRO: Tela branca
// SOLUÇÃO: Abra F12 e veja o erro no Console

// ERRO: "auth/invalid-email"
// SOLUÇÃO: Use um email válido (ex: teste@email.com)

// ERRO: "auth/weak-password"
// SOLUÇÃO: Use senha com pelo menos 6 caracteres


// ============================================
//   RECURSOS ADICIONAIS 📚
// ============================================

// Documentação Firebase Auth:
// https://firebase.google.com/docs/auth

// Documentação Firestore:
// https://firebase.google.com/docs/firestore

// Documentação Regras de Segurança:
// https://firebase.google.com/docs/firestore/security/get-started
