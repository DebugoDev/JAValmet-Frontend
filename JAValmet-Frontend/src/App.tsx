import type { ReactNode } from 'react';
import Navbar from './components/Navbar'

type AppProps = {
  children: ReactNode;
};

function App({ children }: AppProps) {
  return (
    <>
     <Navbar></Navbar>
     {children}
    </>
  )
}

export default App
