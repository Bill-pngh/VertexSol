import { PortfolioIcon, WalletIcon, ChartIcon, BalanceIcon } from '../../assets/icons';

const navItems = [
  { icon: <PortfolioIcon />, label: 'Portfolio' },
  { icon: <WalletIcon />, label: 'Wallet' },
  { icon: <ChartIcon />, label: 'Chart' },
  { icon: <BalanceIcon />, label: 'Balance' }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item, index) => (
        <button key={index} className="nav-item">
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
