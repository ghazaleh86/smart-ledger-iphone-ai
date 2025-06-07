
import { useState } from "react"
import { 
  LayoutDashboard, 
  DollarSign, 
  ShoppingCart, 
  Calculator, 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings, 
  Puzzle,
  ChevronDown,
  Home
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: LayoutDashboard 
  },
  { 
    title: "Sales", 
    icon: DollarSign,
    submenu: [
      { title: "Overview", url: "/sales" },
      { title: "Invoices", url: "/sales/invoices" },
      { title: "Customers", url: "/sales/customers" },
    ]
  },
  { 
    title: "Purchases", 
    icon: ShoppingCart,
    submenu: [
      { title: "Overview", url: "/purchases" },
      { title: "Bills", url: "/purchases/bills" },
      { title: "Vendors", url: "/purchases/vendors" },
    ]
  },
  { 
    title: "Accounting", 
    icon: Calculator,
    isOpen: true,
    submenu: [
      { title: "Transactions", url: "/accounting/transactions", isActive: true },
      { title: "Reconciliation", url: "/accounting/reconciliation" },
      { title: "Chart of Accounts", url: "/accounting/chart-of-accounts" },
    ]
  },
  { 
    title: "Banking", 
    icon: CreditCard,
    submenu: [
      { title: "Accounts", url: "/banking/accounts" },
      { title: "Transfers", url: "/banking/transfers" },
      { title: "Statements", url: "/banking/statements" },
    ]
  },
  { 
    title: "Payroll", 
    icon: Users,
    submenu: [
      { title: "Employees", url: "/payroll/employees" },
      { title: "Pay Runs", url: "/payroll/pay-runs" },
      { title: "Time Tracking", url: "/payroll/time-tracking" },
    ]
  },
  { 
    title: "Reports", 
    url: "/reports", 
    icon: BarChart3 
  },
]

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Integrations", url: "/integrations", icon: Puzzle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [openGroups, setOpenGroups] = useState<string[]>(["Accounting"])

  const isCollapsed = state === "collapsed"

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(g => g !== title)
        : [...prev, title]
    )
  }

  const isActive = (path: string) => currentPath === path

  return (
    <Sidebar className="border-r border-gray-200 bg-slate-900 text-white">
      <SidebarContent className="bg-slate-900">
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-semibold text-white">Nautilus Hosting</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-2 py-4">
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.submenu ? (
                  <Collapsible 
                    open={openGroups.includes(item.title)} 
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className="w-full justify-between text-gray-300 hover:text-white hover:bg-slate-800 data-[state=open]:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            openGroups.includes(item.title) ? 'rotate-180' : ''
                          }`} />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <NavLink 
                                  to={subItem.url}
                                  className={`text-gray-400 hover:text-white pl-7 ${
                                    isActive(subItem.url) ? 'text-teal-400 bg-slate-800' : ''
                                  }`}
                                >
                                  {subItem.title}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive(item.url!)}>
                    <NavLink 
                      to={item.url!}
                      className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-800 ${
                        isActive(item.url!) ? 'text-white bg-slate-800' : ''
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-slate-700">
          <SidebarGroup className="px-2 py-4">
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url}
                      className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-800 ${
                        isActive(item.url) ? 'text-white bg-slate-800' : ''
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
