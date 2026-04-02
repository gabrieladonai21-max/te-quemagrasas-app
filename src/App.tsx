import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { MetabolicSelection } from './components/MetabolicSelection';
import { IngredientsSelection } from './components/IngredientsSelection';
import { Dashboard } from './components/Dashboard';
import { DayView } from './components/DayView';
import { Plan } from './components/Plan';
import { Modules } from './components/Modules';
import { Recipes } from './components/Recipes';
import { Profile } from './components/Profile';
import { Celebration } from './components/Celebration';
import { UpsellModal } from './components/UpsellModal';
import { FAQ } from './components/FAQ';
import { SoporteIA } from './components/SoporteIA';
import { NotificationsSettings } from './components/NotificationsSettings';
import { MedalPopup } from './components/MedalPopup';
import { ShoppingList } from './components/ShoppingList';
import { UserProfile, MetabolicType } from './types';
import { Home, Calendar, Lock, Utensils, User } from 'lucide-react';

type Screen = 'splash' | 'login' | 'selection' | 'ingredients' | 'dashboard' | 'day' | 'plan' | 'modules' | 'recipes' | 'profile' | 'faq' | 'support' | 'notifications' | 'shopping';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [screenKey, setScreenKey] = useState(0);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentDay, setCurrentDay] = useState<{ s: number; d: number } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{ sem: number; tipo: MetabolicType } | null>(null);
  const [showUpsell, setShowUpsell] = useState<'vitalicio' | 'suplemento' | 'consulta' | null>(null);
  const [newMedal, setNewMedal] = useState<{ id: string; title: string } | null>(null);
  const [recipesInitialTab, setRecipesInitialTab] = useState<'blends' | 'sopas'>('blends');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isStandalone) {
      setShowInstallBtn(false);
      return;
    }

    if (isIOS) {
      setShowInstallBtn(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setShowInstallBtn(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Check if iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert('Para instalar en iOS: Pulsa el botón "Compartir" y selecciona "Añadir a la pantalla de inicio" 📲');
      } else {
        alert('La instalación nativa no está disponible en este navegador. Inténtalo en Chrome o Edge.');
      }
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedMetabolicType = localStorage.getItem('metabolicType') as MetabolicType | null;
    const urlParams = new URLSearchParams(window.location.search);
    const screenParam = urlParams.get('screen') as Screen;

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure metabolicType is synced if it exists in savedUser but not in separate key
      if (parsedUser.metabolicType && !savedMetabolicType) {
        localStorage.setItem('metabolicType', parsedUser.metabolicType);
      }
      setUser({
        ...parsedUser,
        metabolicType: savedMetabolicType || parsedUser.metabolicType
      });
      
      // We DO NOT set the screen here anymore. 
      // The screen will progress from splash -> login -> dashboard/selection
    }
  }, []);

  const navegarPara = (novatela: Screen) => {
    setScreenKey(k => k + 1);
    setScreen(novatela);
  };

  const handleLogin = (email: string) => {
    const savedMetabolicType = localStorage.getItem('metabolicType') as MetabolicType | null;
    const userName = email.split('@')[0].split('.')[0];
    const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    
    const newUser: UserProfile = {
      uid: 'mock-uid', email, name: capitalizedName, completedDays: [], modulos: ['core'],
      medals: [], isPremium: false, isAdmin: false, createdAt: new Date().toISOString(),
      metabolicType: savedMetabolicType || undefined
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    if (savedMetabolicType) {
      navegarPara('dashboard');
    } else {
      navegarPara('selection');
    }
  };

  const handleSelectType = (type: MetabolicType, ingredients?: string[]) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        metabolicType: type,
        ingredientes_disponibles: ingredients || user.ingredientes_disponibles || []
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('metabolicType', type);
      
      navegarPara('ingredients');
    }
  };

  const handleSelectIngredients = (ingredients: string[]) => {
    if (user) {
      const updatedUser = { ...user, ingredientes_disponibles: ingredients, ingredientes_popup_shown: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      navegarPara('dashboard');
    }
  };

  const handleOpenDay = (s: number, d: number) => {
    setCurrentDay({ s, d });
    navegarPara('day');
  };

  const handleCompleteDay = () => {
    if (user && currentDay) {
      const key = `S${currentDay.s}D${currentDay.d}`;
      if (!user.completedDays.includes(key)) {
        const updatedUser = { ...user, completedDays: [...user.completedDays, key] };
        
        // Trigger Celebration on EVERY day completion
        setCelebrationData({ sem: currentDay.s, tipo: user.metabolicType || 'A' });
        setShowCelebration(true);
        
        // Medal logic on Day 7
        if (currentDay.d === 7) {
          const medalId = `MEDAL_S${currentDay.s}`;
          const medalTitle = currentDay.s === 1 ? "Nivel 1: Activación" : currentDay.s === 2 ? "Nivel 2: Quema" : "Nivel 3: Consolidación";
          
          if (!updatedUser.medals?.includes(medalId)) {
            updatedUser.medals = [...(updatedUser.medals || []), medalId];
            // Trigger the new MedalPopup
            setNewMedal({ id: medalId, title: medalTitle });
          }
        }
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navegarPara('login');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <Splash onComplete={() => navegarPara('login')} />;
      case 'login': return <Login onLogin={handleLogin} />;
      case 'selection': return <MetabolicSelection onSelect={handleSelectType} currentType={user?.metabolicType} onShowUpsell={() => setShowUpsell('vitalicio')} onBack={user?.metabolicType ? () => navegarPara('profile') : undefined} />;
      case 'ingredients': return user && <IngredientsSelection onSelect={handleSelectIngredients} />;
      case 'dashboard': return user && <Dashboard user={user} onOpenDay={handleOpenDay} onOpenProfile={() => navegarPara('profile')} onOpenShoppingList={() => navegarPara('shopping')} onOpenModule={(id) => {
        if (id === 'sopas') {
          setRecipesInitialTab('sopas');
          navegarPara('recipes');
        } else {
          navegarPara('modules');
        }
      }} />;
      case 'shopping': return user && <ShoppingList user={user} onBack={() => navegarPara('dashboard')} />;
      case 'day': return user && currentDay && <DayView s={currentDay.s} d={currentDay.d} user={user} isCompleted={user.completedDays.includes(`S${currentDay.s}D${currentDay.d}`)} onBack={() => navegarPara('plan')} onComplete={handleCompleteDay} />;
      case 'plan': return user && <Plan user={user} onOpenDay={handleOpenDay} />;
      case 'modules': return user && <Modules user={user} onOpenRecipes={(tab) => { setRecipesInitialTab(tab || 'blends'); navegarPara('recipes'); }} />;
      case 'recipes': return user && <Recipes user={user} onOpenDay={handleOpenDay} initialTab={recipesInitialTab} />;
      case 'profile': return user && <Profile user={user} onLogout={handleLogout} onTryChangeType={() => navegarPara('selection')} onUpdateUser={handleUpdateUser} onOpenFAQ={() => navegarPara('faq')} onOpenSupport={() => navegarPara('support')} onOpenNotifications={() => navegarPara('notifications')} />;
      case 'faq': return <FAQ onBack={() => navegarPara('profile')} />;
      case 'support': return <SoporteIA onBack={() => navegarPara('profile')} onNavigate={navegarPara} userName={user?.name} />;
      case 'notifications': return <NotificationsSettings onBack={() => navegarPara('profile')} />;
      default: return <Splash onComplete={() => navegarPara('login')} />;
    }
  };

  const showNav = ['dashboard', 'plan', 'modules', 'recipes', 'profile', 'shopping'].includes(screen);
  const showStickyHeader = showNav && user?.metabolicType && !['profile', 'recipes'].includes(screen);

  return (
    <Layout>
      {showStickyHeader && user && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[72px] z-[100] px-4 md:px-6 flex items-center shadow-lg rounded-b-[20px] text-white max-w-[480px]"
          style={{ background: 'linear-gradient(135deg, #1D4A1A 0%, #2E7D32 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-sm">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-white font-bold text-sm leading-tight mb-0.5">{user.name}</span>
              <span className="text-[10px] font-medium opacity-70 uppercase tracking-widest leading-tight">Protocolo Activo</span>
            </div>
          </div>
          {showInstallBtn && (
            <button 
              onClick={handleInstallClick}
              className="ml-auto bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/30 transition-all flex items-center gap-1.5"
            >
              📲 Instalar App
            </button>
          )}
        </div>
      )}
      <div className={`${showStickyHeader ? 'pt-[72px]' : ''}`} key={screenKey}>{renderScreen()}</div>
      {showNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-20 bg-white border-t border-[#E8EDE7] flex items-center justify-around z-[100] px-2 md:px-4 shadow-2xl max-w-[480px]">
          <NavButton icon={<Home />} label="Inicio" active={screen === 'dashboard'} onClick={() => navegarPara('dashboard')} />
          <NavButton icon={<Calendar />} label="Protocolo" active={screen === 'plan'} onClick={() => navegarPara('plan')} />
          <NavButton icon={<Lock />} label="Módulos" active={screen === 'modules'} onClick={() => navegarPara('modules')} />
          <NavButton icon={<Utensils />} label="Recetas" active={screen === 'recipes'} onClick={() => navegarPara('recipes')} />
          <NavButton icon={<User />} label="Perfil" active={screen === 'profile'} onClick={() => navegarPara('profile')} />
        </nav>
      )}
      {celebrationData && <Celebration isOpen={showCelebration} sem={celebrationData.sem} tipo={celebrationData.tipo} onClose={() => setShowCelebration(false)} />}
      {showUpsell && <UpsellModal isOpen={true} producto={showUpsell} onClose={() => setShowUpsell(null)} />}
      <MedalPopup 
        isOpen={!!newMedal} 
        onClose={() => setNewMedal(null)} 
        medalId={newMedal?.id || ''} 
        title={newMedal?.title || ''} 
      />
    </Layout>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 transition-all relative">
      <div className={`transition-transform ${active ? 'text-[#2E7D32] scale-110' : 'text-[#8A9E87]'}`}>
        {React.cloneElement(icon, { className: 'w-5 h-5 md:w-6 md:h-6' })}
      </div>
      <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[#2E7D32]' : 'text-[#8A9E87] opacity-70'}`}>{label}</span>
      {active && <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#E8A020]" />}
    </button>
  );
}
