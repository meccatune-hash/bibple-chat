import { AppProvider, useApp } from './store';
import LoginScreen from './components/LoginScreen';
import ProfileSetup from './components/ProfileSetup';
import Layout from './components/Layout';
import ChatView from './components/ChatView';
import DonationModal from './components/DonationModal';
import CreateRoomModal from './components/CreateRoomModal';
import MembersPage from './components/MembersPage';

function AppContent() {
  const { screen, showDonation, showCreateRoom, showMembers } = useApp();
  
  if (screen === 'login') return <LoginScreen />;
  if (screen === 'profile-setup') return <ProfileSetup />;
  
  return (
    <Layout>
      <ChatView />
      {showDonation && <DonationModal />}
      {showCreateRoom && <CreateRoomModal />}
      {showMembers && <MembersPage />}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
