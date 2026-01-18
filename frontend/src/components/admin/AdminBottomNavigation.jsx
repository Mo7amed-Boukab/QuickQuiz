import { Link, useLocation } from 'react-router-dom';
import { FileText, HelpCircle, Users, Download, Tag, Clock } from 'lucide-react';

export default function AdminBottomNavigation() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get('tab');
    const path = location.pathname;

    const navItems = [
        {
            path: '/admin/quiz',
            label: 'Quiz',
            icon: FileText
        },
        {
            path: '/admin/questions',
            label: 'Questions',
            icon: HelpCircle
        },
        {
            path: '/admin/themes',
            label: 'Thèmes',
            icon: Tag
        },
        {
            path: '/admin/users',
            label: 'Users',
            icon: Users
        },
        {
            path: '/admin/history',
            label: 'Historique',
            icon: Clock
        },
        {
            path: '/admin/export',
            label: 'Export',
            icon: Download
        }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5e5] md:hidden z-50 safe-area-pb">
            <div className="grid grid-cols-6 h-16">
                {navItems.map((item) => {
                    const active = path === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center gap-1 transition-colors ${active ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                            <span className={`text-[9px] font-medium ${active ? 'text-black' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
