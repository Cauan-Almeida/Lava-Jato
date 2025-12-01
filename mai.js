// Imports do React (usando CDN global)
const { useState, useEffect, useMemo, useRef } = React;

// Imports dos ícones Lucide (usando CDN global)
const { 
  Calendar, 
  Clock, 
  Truck, 
  Car, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Search, 
  DollarSign, 
  BarChart, 
  Trash2, 
  AlertCircle,
  Repeat,
  ChevronLeft,
  ChevronRight,
  Filter,
  CreditCard,
  Hash,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff
} = lucide;

// --- Configuração Firebase ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Constantes ---
const TIME_SLOTS = [
  { id: 8, label: '08:00' },
  { id: 9, label: '09:00' },
  { id: 10, label: '10:00' },
  { id: 11, label: '11:00' }, // Almoço 12-13
  { id: 13, label: '13:00' },
  { id: 14, label: '14:00' },
  { id: 15, label: '15:00' },
  { id: 16, label: '16:00' }, // Fim 17
];

const VEHICLE_TYPES = {
  CARRO: { label: 'Carro Comum', slots: 1, icon: Car, defaultPrice: 50 },
  RANGER: { label: 'Ranger / Picape', slots: 2, icon: Truck, defaultPrice: 80 },
  VAN: { label: 'Van', slots: 2, icon: Truck, defaultPrice: 100 },
};

// --- Componentes ---

export default function LavaJatoApp() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('schedule'); // 'schedule', 'history', 'stats'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth Initialization
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Data Sync
  useEffect(() => {
    if (!user) return;
    
    // Dados privados por usuário - cada usuário vê apenas seus próprios agendamentos
    const q = db.collection('appointments').where('userId', '==', user.uid);
    
    const unsubscribe = q.onSnapshot((snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(data);
    }, (error) => {
      console.error("Erro ao buscar dados:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // --- Lógica de Negócio ---

  const handleAddAppointment = async (formData) => {
    if (!user) return;
    try {
      await db.collection('appointments').add({
        ...formData,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'agendado' // agendado, concluido, cancelado
      });
      setShowModal(false);
    } catch (e) {
      alert("Erro ao salvar: " + e.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await db.collection('appointments').doc(id).update({
        status: newStatus
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este registro permanentemente?')) {
      try {
        await db.collection('appointments').doc(id).delete();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error('Erro ao sair:', e);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500">Carregando...</div>;

  // Se não estiver logado, mostra tela de login
  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      {/* Header Mobile/Desktop */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-300" />
              Lava Jato Control
            </h1>
            <p className="text-xs text-blue-200 opacity-80">{user.email || 'Conta segura'}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full shadow-md transition-all active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full shadow-md transition-all active:scale-95"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setView('schedule')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${view === 'schedule' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Calendar className="w-4 h-4" /> Agenda
          </button>
          <button 
            onClick={() => setView('history')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${view === 'history' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Clock className="w-4 h-4" /> Histórico
          </button>
          <button 
            onClick={() => setView('stats')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${view === 'stats' ? 'bg-blue-100 text-blue-800' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BarChart className="w-4 h-4" /> Finanças
          </button>
        </div>

        {view === 'schedule' && (
          <ScheduleView 
            appointments={appointments} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}

        {view === 'history' && (
          <HistoryView 
            appointments={appointments} 
            onDelete={handleDelete}
          />
        )}

        {view === 'stats' && (
          <StatsView appointments={appointments} />
        )}
      </main>

      {/* Modal Nova Lavagem */}
      {showModal && (
        <NewAppointmentModal 
          onClose={() => setShowModal(false)} 
          onSave={handleAddAppointment}
          appointments={appointments}
          initialDate={selectedDate}
        />
      )}
    </div>
  );
}

// --- Login Screen Component ---

function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Efeito seguindo o mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (err) {
      let msg = 'Erro ao processar sua solicitação';
      if (err.code === 'auth/email-already-in-use') msg = 'Este email já está em uso';
      if (err.code === 'auth/invalid-email') msg = 'Email inválido';
      if (err.code === 'auth/user-not-found') msg = 'Usuário não encontrado';
      if (err.code === 'auth/wrong-password') msg = 'Senha incorreta';
      if (err.code === 'auth/weak-password') msg = 'Senha muito fraca (mínimo 6 caracteres)';
      if (err.code === 'auth/invalid-credential') msg = 'Credenciais inválidas';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
          #667eea 0%, 
          #764ba2 25%, 
          #f093fb 50%, 
          #4facfe 75%, 
          #00f2fe 100%)`
      }}
    >
      {/* Efeito de brilho seguindo cursor */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-300 pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)'
        }}
      />

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Card de Login */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-[1.02]">
          {/* Logo/Título */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <Truck className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Lava Jato Control
            </h1>
            <p className="text-white/80 text-sm">
              {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white text-sm p-3 rounded-xl flex items-center gap-2 animate-shake">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2 drop-shadow">
                Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2 drop-shadow">
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>

            {/* Toggle Login/Registro */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-white/90 text-sm hover:text-white transition-colors underline"
              >
                {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Entrar'}
              </button>
            </div>
          </form>
        </div>

        {/* Info adicional */}
        <p className="text-center text-white/60 text-xs mt-6 drop-shadow">
          Seus dados são armazenados com segurança no Firebase
        </p>
      </div>
    </div>
  );
}

// --- Views Components ---

function ScheduleView({ appointments, selectedDate, setSelectedDate, onStatusChange, onDelete }) {
  // Filter for selected date
  const dailyApps = useMemo(() => {
    return appointments.filter(a => a.date === selectedDate && a.status !== 'cancelado');
  }, [appointments, selectedDate]);

  // Next/Prev Day logic
  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const getDayLabel = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00'); // Force local time
    return date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-4">
      {/* Date Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <button onClick={() => changeDate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-800 capitalize">
            {getDayLabel(selectedDate)}
          </h2>
          <span className="text-xs text-slate-500">
            {dailyApps.length} agendamento(s)
          </span>
        </div>
        <button onClick={() => changeDate(1)} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {TIME_SLOTS.map(slot => {
          // Find appointment starting in this slot
          const appHere = dailyApps.find(a => parseInt(a.time) === slot.id);
          
          // Check if this slot is occupied by a previous large vehicle
          const blockedByPrevious = dailyApps.find(a => {
            const vehicle = VEHICLE_TYPES[a.vehicleType];
            return vehicle.slots > 1 && parseInt(a.time) === (slot.id - 1) && (slot.id - 1) !== 11; 
          });
          
          const isAfternoonStart = slot.id === 13;

          if (blockedByPrevious) return null;

          return (
            <div key={slot.id}>
              {isAfternoonStart && <div className="h-6 flex items-center justify-center text-xs text-slate-400 font-medium uppercase tracking-wider my-2">Intervalo de Almoço</div>}
              
              <div className="flex gap-4">
                <div className="w-16 flex-shrink-0 flex flex-col items-center pt-2">
                  <span className="text-lg font-bold text-slate-700">{slot.label}</span>
                </div>
                
                <div className="flex-1 min-h-[5rem]">
                  {appHere ? (
                    <AppointmentCard 
                      appointment={appHere} 
                      onStatusChange={onStatusChange}
                      onDelete={onDelete}
                    />
                  ) : (
                    <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm">
                      Livre
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppointmentCard({ appointment, onStatusChange, onDelete }) {
  const vehicle = VEHICLE_TYPES[appointment.vehicleType] || VEHICLE_TYPES.CARRO;
  const isLarge = vehicle.slots > 1;
  const Icon = vehicle.icon;

  const statusColors = {
    agendado: 'bg-blue-50 border-blue-200 text-blue-900',
    concluido: 'bg-green-50 border-green-200 text-green-900',
    cancelado: 'bg-red-50 border-red-200 text-red-900'
  };

  return (
    <div className={`
      relative p-4 rounded-xl border-l-4 shadow-sm transition-all
      ${statusColors[appointment.status] || statusColors.agendado}
      ${isLarge ? 'h-[10rem] border-l-orange-500' : 'h-[5rem] border-l-blue-500'}
      ${appointment.status === 'concluido' ? '!border-l-green-500' : ''}
    `}>
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className={`p-2 rounded-full h-fit ${isLarge ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-bold leading-tight">{appointment.clientName}</h3>
            
            {/* Placa e Modelo - Exibição */}
            {(appointment.model || appointment.plate) && (
              <div className="flex items-center gap-2 my-1 text-xs font-medium opacity-90">
                {appointment.model && <span className="uppercase">{appointment.model}</span>}
                {appointment.plate && (
                  <span className="bg-black/10 px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border border-black/10">
                    {appointment.plate}
                  </span>
                )}
              </div>
            )}

            <p className="text-xs opacity-70 flex items-center gap-1">
              {vehicle.label} 
              {appointment.frequency === 'semanal' && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded ml-1 font-bold uppercase flex items-center gap-1"><Repeat size={8} /> Semanal</span>}
            </p>
            <p className="text-xs font-mono mt-0.5 opacity-60">
              R$ {appointment.price || 0}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
           {appointment.status === 'agendado' && (
             <button 
               onClick={() => onStatusChange(appointment.id, 'concluido')}
               className="p-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
               title="Marcar como concluído"
             >
               <CheckCircle size={18} />
             </button>
           )}
           <button 
             onClick={() => onDelete(appointment.id)}
             className="p-1.5 bg-white/50 hover:bg-red-100 hover:text-red-600 text-slate-400 rounded-lg transition-colors"
           >
             <Trash2 size={18} />
           </button>
        </div>
      </div>
      
      {isLarge && (
         <div className="absolute bottom-2 right-4 text-xs font-bold uppercase tracking-wider opacity-40">
           Ocupa 2 horários
         </div>
      )}
    </div>
  );
}

function HistoryView({ appointments, onDelete }) {
  const [filter, setFilter] = useState('');

  const sortedApps = useMemo(() => {
    return [...appointments]
      .sort((a, b) => new Date(b.date + 'T' + b.time.toString().padStart(2,'0') + ':00') - new Date(a.date + 'T' + a.time.toString().padStart(2,'0') + ':00'))
      .filter(a => 
        a.clientName.toLowerCase().includes(filter.toLowerCase()) || 
        (a.plate && a.plate.toLowerCase().includes(filter.toLowerCase())) ||
        (a.model && a.model.toLowerCase().includes(filter.toLowerCase())) ||
        a.date.includes(filter)
      );
  }, [appointments, filter]);

  return (
    <div className="space-y-4">
      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex gap-2">
        <Search className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar cliente, placa, carro ou data..." 
          className="flex-1 outline-none text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="p-3">Data</th>
              <th className="p-3">Veículo/Cliente</th>
              <th className="p-3 text-right">Valor</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedApps.map(app => (
              <tr key={app.id} className="hover:bg-slate-50">
                <td className="p-3 align-top">
                  <div className="font-medium text-slate-700">
                    {new Date(app.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-xs text-slate-500">{app.time}:00</div>
                </td>
                <td className="p-3 align-top">
                  <div className="font-bold text-slate-800">{app.clientName}</div>
                  <div className="text-xs text-slate-600 uppercase flex flex-col gap-0.5 mt-1">
                    {app.model && <span>{app.model}</span>}
                    {app.plate && <span className="font-mono bg-slate-100 w-fit px-1 rounded">{app.plate}</span>}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{VEHICLE_TYPES[app.vehicleType]?.label}</div>
                </td>
                <td className="p-3 text-right font-mono text-slate-600 align-top">
                  R$ {app.price}
                </td>
                <td className="p-3 text-center align-top">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                    ${app.status === 'concluido' ? 'bg-green-100 text-green-700' : ''}
                    ${app.status === 'agendado' ? 'bg-blue-100 text-blue-700' : ''}
                    ${app.status === 'cancelado' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedApps.length === 0 && <div className="p-8 text-center text-slate-400">Nenhum registro encontrado.</div>}
      </div>
    </div>
  );
}

function StatsView({ appointments }) {
  const stats = useMemo(() => {
    const done = appointments.filter(a => a.status === 'concluido');
    const totalRevenue = done.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    
    // Group by vehicle
    const byVehicle = done.reduce((acc, curr) => {
      acc[curr.vehicleType] = (acc[curr.vehicleType] || 0) + 1;
      return acc;
    }, {});

    // This month
    const now = new Date();
    const thisMonth = done.filter(a => {
        const d = new Date(a.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthRevenue = thisMonth.reduce((acc, curr) => acc + Number(curr.price || 0), 0);

    return { totalRevenue, totalCount: done.length, byVehicle, monthRevenue, monthCount: thisMonth.length };
  }, [appointments]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl text-white shadow-lg">
          <p className="text-green-100 text-xs font-medium uppercase mb-1">Faturamento Mês</p>
          <h3 className="text-2xl font-bold">R$ {stats.monthRevenue.toFixed(2)}</h3>
          <p className="text-xs opacity-80 mt-1">{stats.monthCount} lavagens</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-xs font-medium uppercase mb-1">Total Geral</p>
          <h3 className="text-2xl font-bold text-slate-800">R$ {stats.totalRevenue.toFixed(2)}</h3>
          <p className="text-xs text-slate-400 mt-1">{stats.totalCount} lavagens históricas</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-500" />
          Tipos de Veículos (Concluídos)
        </h3>
        <div className="space-y-3">
          {Object.keys(VEHICLE_TYPES).map(type => {
            const count = stats.byVehicle[type] || 0;
            const percentage = stats.totalCount ? (count / stats.totalCount) * 100 : 0;
            return (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">{VEHICLE_TYPES[type].label}</span>
                  <span className="text-slate-400">{count}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Form Modal ---

function NewAppointmentModal({ onClose, onSave, appointments, initialDate }) {
  const [formData, setFormData] = useState({
    clientName: '',
    plate: '', // NOVO
    model: '', // NOVO
    vehicleType: 'CARRO',
    date: initialDate,
    time: '',
    frequency: 'unico', // unico, semanal
    price: 50
  });
  const [error, setError] = useState('');

  // Update default price when vehicle changes
  const handleVehicleChange = (type) => {
    setFormData(prev => ({
      ...prev,
      vehicleType: type,
      price: VEHICLE_TYPES[type].defaultPrice
    }));
  };

  const validate = () => {
    const time = parseInt(formData.time);
    const vehicle = VEHICLE_TYPES[formData.vehicleType];
    const slotsNeeded = vehicle.slots;

    if (!formData.clientName) return "Nome do cliente é obrigatório.";
    if (!formData.time) return "Selecione um horário.";

    // Check availability
    const existingApps = appointments.filter(a => a.date === formData.date && a.status !== 'cancelado');
    
    // Check main slot
    const slotTaken = existingApps.find(a => {
        const existingStart = parseInt(a.time);
        const existingVehicle = VEHICLE_TYPES[a.vehicleType];
        
        // My start time collides with an existing start time?
        if (existingStart === time) return true;
        
        // Does an existing large vehicle block my start time?
        if (existingVehicle.slots > 1 && existingStart === (time - 1)) return true;
        
        // Does my large vehicle block an existing appointment?
        if (slotsNeeded > 1 && existingStart === (time + 1)) return true;
        
        return false;
    });

    if (slotTaken) return "Este horário já está ocupado ou conflita com outro agendamento.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    onSave(formData);
  };

  // Generate available slots based on vehicle type
  const availableSlots = TIME_SLOTS.filter(slot => {
    const v = VEHICLE_TYPES[formData.vehicleType];
    if (v.slots > 1) {
       // Large vehicles cannot start at 11 (would end at 13, lunch is 12-13) or 16 (ends 18)
       if (slot.id === 11 || slot.id === 16) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center sticky top-0">
          <h3 className="font-bold text-lg text-slate-800">Novo Agendamento</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><XCircle size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
            <input 
              type="text" 
              required
              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nome do cliente"
              value={formData.clientName}
              onChange={e => setFormData({...formData, clientName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Placa (Opcional)</label>
                <div className="relative">
                  <Hash size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full pl-9 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                    placeholder="ABC-1234"
                    value={formData.plate}
                    onChange={e => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                  />
                </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Modelo (Opcional)</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Fiat Uno"
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Veículo</label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.vehicleType}
                onChange={e => handleVehicleChange(e.target.value)}
              >
                {Object.keys(VEHICLE_TYPES).map(key => (
                  <option key={key} value={key}>{VEHICLE_TYPES[key].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Frequência</label>
              <select 
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.frequency}
                onChange={e => setFormData({...formData, frequency: e.target.value})}
              >
                <option value="unico">Uma vez só</option>
                <option value="semanal">Semanal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
              <input 
                type="date" 
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Horário</label>
              <select 
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={formData.time}
                onChange={e => setFormData({...formData, time: parseInt(e.target.value)})}
              >
                <option value="">Selecione...</option>
                {availableSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>{slot.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
             <div className="relative">
               <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-400" />
               <input 
                 type="number" 
                 className="w-full pl-8 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                 value={formData.price}
                 onChange={e => setFormData({...formData, price: e.target.value})}
               />
             </div>
          </div>

          {VEHICLE_TYPES[formData.vehicleType].slots > 1 && (
             <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-100">
               ⚠️ Este veículo ocupará o horário selecionado e o próximo (2 horas).
             </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-[0.98] mt-2"
          >
            Agendar Lavagem
          </button>
        </form>
      </div>
    </div>
  );
}