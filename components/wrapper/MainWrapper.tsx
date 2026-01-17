"use client"
import React from 'react'
import { Navbar } from '../navbar'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '../footer'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getCurrentUser } from '@/utils/auth'

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <Provider store={store}>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <Analytics />
            <ToastContainer/>
        </Provider>
    )
}

export default MainWrapper
