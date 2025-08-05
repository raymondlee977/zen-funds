import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { ArrowLeftRight, ChartBarBig, ChartPie, CreditCard, Goal, Home, Inbox, LayoutDashboard, LogOut, Settings } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import React from "react"
import { useLogout } from "@/hooks/useLogout";

export default function Navbar () {
  const { open } = useSidebar();
  const { logout } = useLogout();
  const { pathname } = useLocation();
  const items = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Accounts", icon: CreditCard, href: "/accounts" },
    { title: "Transactions", icon: ArrowLeftRight ,href: "/transactions" },
    { title: "Budgets", icon: ChartBarBig ,href: "/budgets" },
    { title: "Goals", icon: Goal ,href: "/goals" },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* Your logo or title */}
        <div className="flex flex-row items-center justify-between mt-3 pe-2">
          {open && (<Link className="px-4 text-lg font-bold text-primary" to='/dashboard'>ZenFunds</Link>)}
          <SidebarTrigger className=' cursor-pointer'/>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.href}
                      className={`flex items-center gap-2 ${isActive ? "bg-sidebar-selected pointer-events-none cursor-default" : ""}`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link onClick={logout} className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-2 text-sm text-center inline">
        <div className="flex justify-center">
          ©{open && <span className="ml-1 transition">2025 MyApp</span>}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}