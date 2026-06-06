import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoutDialog from "@/features/auth/components/logout-dialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Link } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  HandCoins,
  LayoutDashboard,
  List,
  LogOut,
  MoreHorizontal,
  PlusCircle,
  ShoppingBag,
  Tags,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

export default function SidebarAdmin() {
  const { user } = useAuth();
  const [openDialogLogout, setOpenDialogLogout] = useState(false);

  return (
    <>
      <LogoutDialog open={openDialogLogout} setOpen={setOpenDialogLogout} />
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-4">
            <img src="/images/icon.png" alt="Icon" className="w-7" />
            <span>Tsenan-tsika</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LayoutDashboard /> Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <DropdownMenu>
                  <SidebarMenuItem>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <Tags /> Catégories{" "}
                        <MoreHorizontal className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="min-w-56 rounded-lg"
                    >
                      <DropdownMenuItem asChild>
                        <Link to="/admin/category-list">
                          <List /> Voir la liste
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/category-new">
                          <PlusCircle /> Ajouter
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </SidebarMenuItem>
                </DropdownMenu>

                <DropdownMenu>
                  <SidebarMenuItem>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <HandCoins /> Produits{" "}
                        <MoreHorizontal className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="min-w-56 rounded-lg"
                    >
                      <DropdownMenuItem asChild>
                        <Link to="/admin/product-list">
                          <List /> Voir la liste
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/product-new">
                          <PlusCircle /> Ajouter
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </SidebarMenuItem>
                </DropdownMenu>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin/order-list">
                      <ShoppingBag /> Les commandes
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin/user-list">
                      <Users /> Utilisateurs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size={"lg"}
                    className="data-[state=open]:bg-sidebar-accent data-state-open:text-sidebar-accent-foreground"
                  >
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.username}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>

                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent side="right" align="end" sideOffset={4}>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <User />

                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user?.username}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpenDialogLogout(true)}>
                      <LogOut />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
