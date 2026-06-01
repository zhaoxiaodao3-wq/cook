import { useState } from 'react';
import { ScreenState, TabValue } from './types';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { RecipesScreen } from './screens/RecipesScreen';
import { RecipeDetailScreen } from './screens/RecipeDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { UploadScreen } from './screens/UploadScreen';
import { MyUploadsScreen } from './screens/MyUploadsScreen';
import { MyFavoritesScreen } from './screens/MyFavoritesScreen';
import { MySuggestionsScreen } from './screens/MySuggestionsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');

  const handleTabChange = (tab: TabValue) => {
    setCurrentScreen(tab);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative w-full pb-[80px]">
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'recipes' && <RecipesScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'upload' && <UploadScreen />}
        {currentScreen === 'profile' && <ProfileScreen onNavigate={setCurrentScreen} />}

        {currentScreen === 'recipe_detail' && <RecipeDetailScreen onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'my_uploads' && <MyUploadsScreen onBack={() => setCurrentScreen('profile')} />}
        {currentScreen === 'my_favorites' && <MyFavoritesScreen onBack={() => setCurrentScreen('profile')} />}
        {currentScreen === 'my_suggestions' && <MySuggestionsScreen onBack={() => setCurrentScreen('profile')} />}
      </div>

      {/* Bottom Navigation */}
      {['home', 'recipes', 'upload', 'profile'].includes(currentScreen) && (
        <BottomNav currentTab={currentScreen as TabValue} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
