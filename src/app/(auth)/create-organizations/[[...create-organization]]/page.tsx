import { CreateOrganization } from "@clerk/nextjs";
 
export default function CreateOrganizationPage() {
  return (
    <section className="flex-center h-screen">
      <CreateOrganization />
    </section>
  )
}