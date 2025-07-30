import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md absolute top-0 left-0 right-0">
      <div className="flex flex-1 gap-2 items-baseline">
        <div className="flex max-h-max bg-black p-2 rounded-md ">
          <HeaderButton url="/" imgName="CourseText.svg" />
        </div>
        <p className="text-2xl ">CourseText</p>
      </div>

      <div className="flex-1 flex justify-center">
        <HeaderButton url="/" imgName="library.svg" />
      </div>
      <div className="flex-1 flex justify-end">
        <HeaderButton url="/log-in" imgName="user.svg" />
      </div>
    </div>
  );
}
