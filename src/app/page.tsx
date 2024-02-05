import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { DocsSidebarNav } from "./ui/MainNav";
import { ScrollArea } from "./ui/ScrollArea";
import chestIcon from "../../public/chestIcon.svg";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="h-100 flex flex-row items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="fixed	 top-0 z-30 flex h-full w-72 border-r-2 border-solid border-red-500 bg-red-800">
        <ScrollArea className="h-full w-full py-6 pr-6 lg:py-8">
          <div className="align-center flex items-center  justify-center">
            <Image
              priority
              width={80}
              color={"yellow"}
              src={chestIcon}
              alt="chest"
            />
            <div className="align-center m-3 flex flex-col items-center justify-center font-black text-red-200">
              <div>COMMUNITY</div>
              <div>CHEST</div>
            </div>
          </div>
          <br />
          <DocsSidebarNav
            items={[
              {
                title: "Getting Started",
                items: [
                  {
                    title: "T3-example-page",
                    href: "/t3-example-page",
                    items: [],
                  },
                ],
              },
              {
                title: "Components",
                items: [
                  {
                    title: "Command",
                    href: "/docs/components/command",
                    items: [],
                  },
                  {
                    title: "Tooltip",
                    href: "/docs/components/tooltip",
                    items: [],
                  },
                ],
              },
            ]}
          />
        </ScrollArea>
      </div>
      <div className="w-72" />

      <div className="flex min-h-screen w-full flex-col items-center justify-center overflow-scroll bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="h-96">Hi</div>
        <div className="h-96">Hi</div>

        <div className="h-96">Hi</div>
        <div className="h-96">Hi</div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
