import { getUser } from "../../../services/user/user";
import ProfileForm from "./ProfileForm";

const ProfileSection = async () => {
  const user = await getUser();

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
        <div>
          <h1 className="font-medium text-lg md:text-xl text-center">
            Profile
          </h1>

          <div className="border p-4 rounded-md mt-6 space-y-3 max-w-2xl mx-auto">
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Name</p>
              <h2>{user?.data?.name}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Email</p>
              <h2>{user?.data?.email}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Phone Number</p>
              <h2>{user?.data?.phone}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Division</p>
              <h2>{user?.data?.division}</h2>
            </div>
            <div className="">
              <p className="text-sm mb-1 text-muted-foreground">Address</p>
              <h2>{user?.data?.address}</h2>
            </div>
          </div>
          <ProfileForm user={user?.data} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
