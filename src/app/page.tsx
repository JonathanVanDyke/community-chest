import Image from "next/image";
import Search from "./ui/Search";

export default async function Home() {
  const cards = [
    {
      title: "Filament Finder",
      image: "https://images.unsplash.com/photo-1702390600380-5dc2bb300025",
      link: "/item-finder",
    },
    {
      title: "Free",
      image: "https://images.unsplash.com/photo-1603827457577-609e6f42a45e",
      link: "/item-finder",
    },
    {
      title: "Lending Tracker",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf",
      link: "/item-finder",
    },
  ];

  return (
    <div>
      <div className="hidden sm:flex sm:flex-col ">
        <h1 className="mb-2 text-center text-3xl">Community Chest</h1>
      </div>

      <p className="mb-2 text-center">
        Share and lend with friends without the stress
      </p>
      <Search />
      <hr className="my-8" />
      <p className="mb-2 text-center text-lg">Use one of our Tools!</p>
      <div className="flex basis-full flex-col justify-between md:flex-row">
        {cards.map((card) => (
          <a
            href={card.link}
            key={card.title}
            className="my-3 flex flex-col items-center justify-between rounded-lg border-2 border-white md:mx-3"
          >
            <Image
              className="h-full w-full rounded-lg"
              src={card.image}
              alt={card.title}
              width="200"
              height="100"
            />
            <h2>{card.title}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
