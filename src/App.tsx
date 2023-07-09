import AuthProvider from "context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Router from "router";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router></Router>
      </QueryClientProvider>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
