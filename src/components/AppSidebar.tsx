
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
    url: "/dashboard", 
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
      { title: "Transactions", url: "/", isActive: true },
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
  const { state, setOpenMobile, isMobile } = useSidebar()
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

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent className="bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/90 to-primary rounded-lg flex items-center justify-center shadow-sm">
              <Home className="w-4 h-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-semibold text-sidebar-foreground text-sm">Nautilus Hosting</div>
                <div className="text-xs text-sidebar-foreground/60">Financial Dashboard</div>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-3 py-2">
          <SidebarMenu className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.submenu ? (
                  <Collapsible 
                    open={openGroups.includes(item.title)} 
                    onOpenChange={() => toggleGroup(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        className="w-full justify-between text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-md transition-colors data-[state=open]:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-sidebar-foreground/60" />
                          {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                        </div>
                        {!isCollapsed && (
                          <ChevronDown className={`w-4 h-4 text-sidebar-foreground/60 transition-transform ${
                            openGroups.includes(item.title) ? 'rotate-180' : ''
                          }`} />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <NavLink 
                                  to={subItem.url}
                                  onClick={handleNavClick}
                                  className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                    isActive(subItem.url) 
                                      ? 'text-sidebar-primary bg-sidebar-accent font-medium' 
                                      : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
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
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.url!) 
                          ? 'text-sidebar-primary bg-sidebar-accent font-medium' 
                          : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 text-sidebar-foreground/60" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Bottom Section */}
        <div className="mt-auto border-t border-sidebar-border">
          <SidebarGroup className="px-3 py-2">
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive(item.url) 
                          ? 'text-sidebar-primary bg-sidebar-accent font-medium' 
                          : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <item.icon className="w-4 h-4 text-sidebar-foreground/60" />
                      {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
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
