import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/notfound";
import Projects from "@/components/global/projects";
import { onAuthenticateUser } from "@/actions/user"; // ✅
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const { user } = await onAuthenticateUser();
    const allProjects = await getAllProjects();
    if(!user){
      redirect('/');
    }
    return (
      <div className="w-full flex flex-col gap-6 p-4">
        <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-semibold dark:text-primary pt-2 pb-2">
              Projects
            </h1>
            <p className="text-base font-normal dark:text-muted-foreground">
              All of your work in one place
            </p>
          </div>

         
        </div>

        {allProjects.data && allProjects.data.length > 0 ? (
          <Projects projects={allProjects.data} />
        ) : (
          <NotFound />
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to load projects:", error);
    return (
      <div style={{ padding: 20, color: "red" }}>
        Failed to load dashboard.
      </div>
    );
  }
}
