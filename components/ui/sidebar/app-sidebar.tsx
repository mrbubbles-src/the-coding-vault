import Sidebar from './sidebar';
import SidebarContent from './sidebar-content';
import SidebarFooter from './sidebar-footer';
import SidebarGroup from './sidebar-group';
import SidebarHeader from './sidebar-header';

/**
 * AppSidebar component is a composition of various Sidebar elements to create a complete sidebar layout.
 *
 * The sidebar is structured as follows:
 * - `Sidebar`: The main container for the sidebar.
 * - `SidebarHeader`: A sticky header section at the top of the sidebar.
 * - `SidebarContent`: A scrollable container for the main content of the sidebar.
 * - `SidebarGroup`: A section within the `SidebarContent` to group related items.
 * - `SidebarFooter`: A sticky footer section at the bottom of the sidebar.
 *
 * @returns A fully composed sidebar component with header, content, and footer sections.
 */
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
