import Header from "./components/header";

const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="main">
            <Header />
            {children}
        </main>
    )
}

export default App;