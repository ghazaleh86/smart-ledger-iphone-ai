
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import SalesInvoices from "./pages/SalesInvoices";
import SalesCustomers from "./pages/SalesCustomers";
import Purchases from "./pages/Purchases";
import PurchasesBills from "./pages/PurchasesBills";
import PurchasesVendors from "./pages/PurchasesVendors";
import AccountingReconciliation from "./pages/AccountingReconciliation";
import AccountingChartOfAccounts from "./pages/AccountingChartOfAccounts";
import BankingAccounts from "./pages/BankingAccounts";
import BankingTransfers from "./pages/BankingTransfers";
import BankingStatements from "./pages/BankingStatements";
import PayrollEmployees from "./pages/PayrollEmployees";
import PayrollPayRuns from "./pages/PayrollPayRuns";
import PayrollTimeTracking from "./pages/PayrollTimeTracking";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const isMobile = useIsMobile();
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    // Check if we're on tablet view (between mobile and desktop)
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    setDefaultOpen(!isTablet && !isMobile);
  }, [isMobile]);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/sales/invoices" element={<SalesInvoices />} />
              <Route path="/sales/customers" element={<SalesCustomers />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/purchases/bills" element={<PurchasesBills />} />
              <Route path="/purchases/vendors" element={<PurchasesVendors />} />
              <Route path="/accounting/reconciliation" element={<AccountingReconciliation />} />
              <Route path="/accounting/chart-of-accounts" element={<AccountingChartOfAccounts />} />
              <Route path="/banking/accounts" element={<BankingAccounts />} />
              <Route path="/banking/transfers" element={<BankingTransfers />} />
              <Route path="/banking/statements" element={<BankingStatements />} />
              <Route path="/payroll/employees" element={<PayrollEmployees />} />
              <Route path="/payroll/pay-runs" element={<PayrollPayRuns />} />
              <Route path="/payroll/time-tracking" element={<PayrollTimeTracking />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/integrations" element={<Integrations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
