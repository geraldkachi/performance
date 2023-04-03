import React from 'react'
import { Outlet } from 'react-router-dom';
import ProfileIcon from '../../assets/svg/ProfileIcon';
import BottomNav from '../bottomnav/BottomNav';
import Sidebar from '../sidebar/Sidebar';

import "./layout.css";


const Layout = () => {
    return (
        <div>
            <section className={` bg-[#FAFDFF]`}>
                <Sidebar />
                <div className={`layout__content ${"open" ? "sm:pl-60" : "sm:pl-20"} `}>
                    <div className={`layout__content-main p-5`}>
                        <div className="flex items-center justify-end mb-3">
                            <div className="flex gap-2">

                                <div className="bg-[#F5F3F9] pr-3 py-2 flex gap-4 items-center rounded-lg px-2 whitespace-nowrap ">
                                    <span className="text-sm font-semibold capitalize">{`Lord Daddy Gerald`}</span>
                                    <ProfileIcon />
                                </div>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
                <BottomNav />
            </section>
        </div>
    )
}

export default Layout
