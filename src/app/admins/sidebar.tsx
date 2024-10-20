import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const AdminsSidebar = () => {
    const pathname = usePathname(); // Get the current route
    const [activeMenu, setActiveMenu] = useState(pathname);

    // Define your sidebar menu items
    const menuItems = [
        { name: 'Dashboard', path: '/admins' },
        { name: 'Create APIs', path: '/admins/create-api' },
        { name: 'Manage APIs', path: '/admins/manage-apis' },
        { name: 'Revenue', path: '/admins/revenue' },
    ];

    return (
        <aside className="sidebar">
            <ul className="menu">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link href={item.path} className={`menu-item ${pathname === item.path ? 'active' : ''}`}
                            onClick={() => setActiveMenu(item.path)}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Sidebar CSS */}
            <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 200px;
          background-color: #2c3e50;
          padding: 20px;
          color: #fff;
        }

        .menu {
          list-style: none;
          padding: 0;
        }

        .menu-item {
          display: block;
          padding: 10px 20px;
          margin-bottom: 10px;
          color: #fff;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .menu-item:hover {
          background-color: #34495e;
        }

        .active {
          background-color: #1abc9c;
        }
      `}</style>
        </aside>
    );
};

export default AdminsSidebar;
