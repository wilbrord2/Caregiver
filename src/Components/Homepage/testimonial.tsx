interface User {
  id: number;
  username: string;
  position: string;
  image: string;
  message: string;
}
const TestimonialCard = ({ user }: { user: User[] }) => {
  return (
    <div className="flex flex-col justify-between lg:flex-row gap-2 sm:gap-12">
      {user.map((user) => (
        <div
          key={user.id}
          className="text-white border border-white rounded-xl p-8 w-full lg:w-1/2"
        >
          <span className="text-7xl font-bold text-defaultOrange font-nunito">“</span>
          <div className="-mt-4">
            <div className="border-b border-white pb-5">
              <span>{user.message}</span>
            </div>
            <div className="flex flex-row gap-2 mt-4 items-center">
              <span className="block rounded-full h-[55px] w-[55px] bg-white">
                {user.image}
              </span>
              <div className="flex flex-col">
                <span className="font-medium text-lg">{user.username}</span>
                <span className="font-light text-sm text-defaultOrange">{user.position}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialCard;
