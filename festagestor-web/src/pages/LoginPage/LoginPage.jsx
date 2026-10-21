import { useState } from 'react';
// IMPORTAÇÃO ATUALIZADA: Trazemos o serviço de auth em vez da api direta
import { authService } from '../../services/auth/authService'; 
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // O componente fica cego para a complexidade do HTTP. Ele apenas chama o serviço!
      const token = await authService.login(username, password);
      
      console.log('Login efetuado com sucesso! Token:', token);
      
      localStorage.setItem('@Festagestor:token', token);

      navigate('/dashboard');

    } catch (error) {
      console.error("Erro no login:", error);
      setErro('Usuário ou senha inválidos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 text-blue-600 font-bold text-3xl">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
            </div>
            FestaGestor
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-xl">
          <div className="flex flex-col p-6 space-y-1 pb-6 text-center">
            <h3 className="tracking-tight text-2xl font-bold text-gray-900">Acesse sua conta</h3>
            <p className="text-sm text-gray-500">Gerencie seus aluguéis e equipamentos</p>
          </div>
          
          <div className="p-6 pt-0">
            <form className="space-y-4" onSubmit={handleLogin}>
              
              {erro && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                  {erro}
                </div>
              )}

              <div className="space-y-2 text-left">
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="username">
                  Usuário
                </label>
                <input 
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500" 
                  placeholder="Seu usuário" 
                  id="username" 
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-sm font-medium leading-none text-gray-700" htmlFor="password">
                  Senha
                </label>
                <input 
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500" 
                  placeholder="••••••••" 
                  id="password" 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors bg-blue-600 text-white shadow hover:bg-blue-700 px-4 py-2 w-full h-11 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Autenticando...' : 'Acessar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}