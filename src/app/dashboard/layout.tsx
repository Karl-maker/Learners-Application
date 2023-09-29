/**
 * @TODO Symantically perfect this layout
 */

export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/**
         * @TODO Add layout components for sidebar and header
         */}
        <nav></nav>
   
        {children}
      </section>
    )
  }