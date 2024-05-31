
import Topics from "./Topics";
import AvatarBox from "./AvatarBox";
const RightWidget = () => {
  return (
    <aside className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 w-full md:w-64">
      <Topics />
      <h3 className="text-lg font-bold mb-4 mt-8">Suggested Users</h3>
      <div className="flex flex-col gap-3">
        <AvatarBox />
        <AvatarBox />
        <AvatarBox />
      </div>
    </aside>
  );
};

export default RightWidget;
