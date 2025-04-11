import { useRouter } from 'next/router';
import NavButton from '../buttons/NavButton';
import { 
  PortfolioIcon, 
  WalletIcon, 
  ChartIcon, 
  BalanceIcon,
  FeaturesIcon 
} from '../../assets/icons';

export default function BottomNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { icon: <PortfolioIcon />, label: 'Portfolio', path: '/portfolio' },
    { icon: <WalletIcon />, label: 'Wallet', path: '/wallet' },
    { icon: <ChartIcon />, label: 'Chart', path: '/chart' },
    { icon: <BalanceIcon />, label: 'Balance', path: '/balance' },
    { icon: <FeaturesIcon />, label: 'Features', path: '/features' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavButton
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={currentPath === item.path}
          onClick={() => router.push(item.path)}
        />
      ))}
      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-around;
          background: rgba(30, 30, 45, 0.9);
          backdrop-filter: blur(10px);
          padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,0.1);
          z-index: 100;
        }
      `}</style>
    </nav>
  );
}
