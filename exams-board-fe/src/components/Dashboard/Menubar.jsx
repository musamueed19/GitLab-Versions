import MenuItems from "./MenuItems";

const menuItems = [
  {
    title: "Home",
    path: "home",
    img: "/home.png",
  },
  {
    title: "Users",
    path: "users",
    img: "/users.png",
  },
  {
    title: "Locations",
    path: "locations",
    img: "/locations.png",
  },
  {
    title: "Courses",
    path: "courses",
    img: "/courses.png",
  },
  {
    title: "Designations",
    path: "designations",
    img: "/designations.png",
  },
  {
    title: "Semesters",
    path: "semesters",
    img: "/semesters.png",
  },
  {
    title: "Faculties",
    path: "faculties",
    img: "/semesters.png",
  },
  {
    title: "Daily QB Status",
    path: "dailyQbStatus",
    img: "/semesters.png",
  },
  {
    title: "Section Coordinator",
    path: "sectioncoordinator",
    img: "/users.png",
  },
  {
    title: "ECWS",
    path: "ecws",
    img: "/strength.png",
  },
];

export default function Menubar({ isHide }) {
  // console.log('Menubar', isHide);

  return (
    <div className="flex flex-col gap-3 mt-8 px-2 bg-gray-100/70 w-full rounded-md h-full">
      {menuItems.map((item) => (
        <MenuItems isTitleHide={isHide} key={item.title} item={item} />
      ))}
    </div>
  );
}
