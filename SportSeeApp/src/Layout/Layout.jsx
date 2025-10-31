import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/Layout/Header/Header';
import Sidebar from '@/Layout/Sidebar/Sidebar';

const Layout = () => {
    return (
        <div className='layout'>
            <Header />
            <main>
                <Sidebar />
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;