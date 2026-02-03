import { useEvents } from './hooks/useEvents';
import EventCard from './components/EventCard';

function App() {
  const { events, loading, error } = useEvents();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">TechEvents</h1>
          <nav>
             <button className="text-indigo-600 hover:text-indigo-800 font-medium">Login</button>
          </nav>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Próximos Eventos
             </h2>
             <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Confira os eventos de tecnologia mais aguardados e garanta sua presença.
             </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
             <div className="text-center text-gray-500 text-xl mt-10">
                Nenhum evento encontrado.
             </div>
          )}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
           <p className="mt-8 text-center text-base text-gray-400">
              &copy; 2024 TechEvents. Todos os direitos reservados.
           </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
