# 🚀 GUIA RÁPIDO - Lava Jato Control

## 📱 COMO COMEÇAR

### 1. ABRIR O SISTEMA
- Abra o arquivo **`sistema.html`** no navegador (Chrome recomendado)
- Ou use Live Server no VS Code

### 2. CRIAR SUA CONTA (Primeira vez)
1. Clique em **"Não tem conta? Registre-se"**
2. Digite seu email (ex: `seuemail@gmail.com`)
3. Crie uma senha forte (mínimo 6 caracteres)
4. Clique em **"Criar Conta"**
5. Pronto! Você já está dentro

### 3. FAZER LOGIN (Próximas vezes)
1. Digite seu email e senha
2. Clique em **"Entrar"**

---

## 📅 COMO USAR O SISTEMA

### ➕ AGENDAR UMA LAVAGEM

1. **Clique no botão +** (canto superior direito)

2. **Preencha os dados:**
   - **Cliente:** Nome do cliente
   - **Placa:** ABC-1234 (opcional, mas RECOMENDADO)
   - **Modelo:** Fiat Uno, Honda Civic, etc. (opcional)
   - **Veículo:** Escolha entre:
     - Carro Comum (1 horário - R$ 50)
     - Ranger/Picape (2 horários - R$ 80)
     - Van (2 horários - R$ 100)
   - **Frequência:**
     - Uma vez só
     - Semanal (aparece com badge roxo)
   - **Data:** Selecione no calendário
   - **Horário:** Escolha entre 08h-16h (exceto 12h)
   - **Valor:** Ajuste se necessário

3. **Clique em "Agendar Lavagem"**

✅ **Pronto!** Salvou automaticamente na nuvem!

---

### 📊 NAVEGAÇÃO

O sistema tem 3 abas principais:

#### 📅 **AGENDA**
- Veja todos os agendamentos do dia selecionado
- Navegue entre dias com as setas ← →
- Grid de horários de 08h às 17h
- Slot vazio = horário disponível
- **Ações:**
  - ✅ Marcar como concluído
  - 🗑️ Deletar agendamento

#### 🕐 **HISTÓRICO**
- Lista TODOS os agendamentos (passados e futuros)
- **Busca inteligente:**
  - Digite o nome do cliente
  - Digite a placa do carro (ex: ABC-1234)
  - Digite o modelo
  - Digite uma data
- Ordenado do mais recente para o mais antigo
- Mostra status: Agendado, Concluído, Cancelado

#### 💰 **FINANÇAS**
- **Faturamento do Mês:** Quanto você ganhou este mês
- **Total Geral:** Quanto ganhou desde o início
- **Gráfico de Veículos:** Quantos de cada tipo você lavou
- **Estatísticas:** Total de lavagens

---

## 🎯 DICAS DE USO

### ✨ BOAS PRÁTICAS

1. **SEMPRE anote a PLACA**
   - Facilita buscar histórico do cliente
   - Você sabe quantas vezes ele veio
   - Exemplo: "Ah, o dono do ABC-1234 é cliente semanal!"

2. **Use CLIENTE SEMANAL**
   - Identifica clientes fixos com badge roxo
   - Fácil de reconhecer na agenda

3. **MARQUE COMO CONCLUÍDO**
   - Clique no ✅ quando terminar a lavagem
   - Isso atualiza as estatísticas financeiras

4. **NÃO DELETE sem querer**
   - O sistema SEMPRE pede confirmação
   - Uma vez deletado, não tem como recuperar

### 🚗 VEÍCULOS GRANDES (Van e Ranger)

- **Ocupam 2 horários consecutivos**
- Se agendar às 10h, ocupa 10h E 11h
- **Não pode agendar em:**
  - 11h (almoço é meio-dia)
  - 16h (acabaria às 18h, já fechou)

### 🔍 BUSCAR NO HISTÓRICO

**Exemplos de busca:**
- `João` → Acha todos os agendamentos do João
- `ABC-1234` → Acha todas as lavagens deste carro
- `Civic` → Acha todos os Honda Civic
- `2024-12-01` → Acha todos do dia 01/12/2024

---

## 💾 SINCRONIZAÇÃO MULTI-DISPOSITIVO

### No Computador:
✅ Já funciona! Só abrir `sistema.html`

### No Celular (3 opções):

#### **Opção 1: Hospedagem Gratuita (RECOMENDADO)**
1. Crie conta no [Vercel](https://vercel.com) ou [Netlify](https://netlify.com)
2. Faça upload dos arquivos `sistema.html` e `mai.js`
3. Você recebe um link (ex: `meu-lavajato.vercel.app`)
4. Acesse de QUALQUER lugar!

#### **Opção 2: Google Drive**
1. Suba os arquivos no Google Drive
2. Gere link público
3. Abra no celular

#### **Opção 3: Email**
1. Envie os arquivos para seu email
2. Baixe no celular
3. Abra com navegador

⚠️ **IMPORTANTE:** Use o MESMO email e senha em todos os dispositivos!

---

## 🔒 SEGURANÇA

### ✅ Seus dados estão SEGUROS porque:
- Salvos no Firebase (Google Cloud)
- Criptografados
- Backup automático 24/7
- Sincronização em tempo real
- Cada usuário só vê seus próprios dados

### ❌ Você SÓ perde dados se:
- Deletar manualmente (botão 🗑️)
- Usar outro email para fazer login

### ✅ Você NÃO perde dados se:
- Desligar o computador
- Fechar o navegador
- Formatar o PC
- Trocar de dispositivo
- Passar dias sem usar

---

## 🎨 INTERFACE

### Cores e Indicadores:

- **Azul** → Agendado (aguardando)
- **Verde** → Concluído (lavagem feita)
- **Vermelho** → Cancelado
- **Roxo** → Cliente semanal (badge "SEMANAL")
- **Laranja** → Veículo grande (Van/Ranger)

---

## 📱 ATALHOS DO TECLADO

- `ESC` → Fecha o modal de agendamento
- `Enter` → Confirma o formulário

---

## 🆘 PROBLEMAS COMUNS

### "Não consigo fazer login"
- Verifique se o email está correto
- Senha tem mínimo 6 caracteres
- Teste criar uma nova conta

### "Dados não aparecem no celular"
- Use o MESMO email e senha
- Aguarde alguns segundos (sincronização)
- Recarregue a página (F5)

### "Horário está bloqueado"
- Veículo grande ocupou 2 horários
- Escolha outro horário disponível

### "Quero mudar o valor padrão"
- No formulário, edite o campo "Valor"
- O sistema lembra do último valor usado

---

## 📞 CHECKLIST DIÁRIO

**Ao começar o dia:**
- [ ] Abra o sistema
- [ ] Verifique agendamentos de hoje
- [ ] Confirme horários com clientes

**Durante o dia:**
- [ ] Marque como ✅ concluído ao terminar cada lavagem
- [ ] Anote placa e modelo se o cliente não tiver cadastro

**Ao final do dia:**
- [ ] Confira as finanças do dia
- [ ] Veja quantas lavagens fez

---

## 🎯 RESUMO RÁPIDO

1. **Agendar:** Botão + → Preenche → Salva
2. **Ver Agenda:** Aba "Agenda" → Escolhe dia
3. **Buscar:** Aba "Histórico" → Digite na busca
4. **Finanças:** Aba "Finanças" → Veja estatísticas
5. **Concluir:** Botão ✅ no agendamento
6. **Deletar:** Botão 🗑️ → Confirma

---

## 💡 PRÓXIMOS PASSOS

Depois de dominar o básico, você pode:
- Ajustar valores padrão de cada tipo de veículo
- Criar relatórios mensais
- Exportar dados (em desenvolvimento)
- Adicionar mais tipos de serviço

---

# 🎉 PRONTO PARA USAR!

**Seu lava jato agora tem um sistema profissional!**

Qualquer dúvida, releia este guia ou o arquivo `GARANTIA_SEGURANCA.md`

**Boas vendas! 🚗💦💰**
