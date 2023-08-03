import AuthProvider from "context/AuthProvider";
import SocketProvider from "context/SocketProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Router from "router";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <Router></Router>
        </SocketProvider>
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
