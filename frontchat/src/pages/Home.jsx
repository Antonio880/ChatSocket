import Header from '../components/Header';
import { useState } from 'react';
import axios from 'axios';
import { useSocketContext } from '../components/ContextSocket';
import Chat from '../components/Chat/Chat';

export default function Home(){

    // const { socket, setSocket } = useSocketContext();
    
    return(
        <div className='h-screen'>
            <Header />
            <div className='flex items-center justify-center h-96 '>
                <Chat/>
            </div>
        </div>
        
    );
}