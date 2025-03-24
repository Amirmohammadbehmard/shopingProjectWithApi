import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { updateProfile } from "../../services/api";
import { User } from "../../types/Server";

function StoreProfile() {
  const { User, updateuser } = useLoginContext();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    pic: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  const currentUser = User || localUser;

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        postalCode: currentUser.postalCode || "",
        pic: currentUser.pic || "",
      });
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      console.log("Saving data:", formData);

      if (!currentUser?.id) {
        console.error("User ID is undefined!");
        return;
      }

      localStorage.setItem(
        "User",
        JSON.stringify({ ...currentUser, ...formData }),
      );
      await updateProfile(currentUser.id, formData);
      updateuser(formData);

      setEditMode(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const inputFields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "username", type: "text", placeholder: "UserName" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "text", placeholder: "Phone" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "postalCode", type: "text", placeholder: "Postal Code" },
    { name: "pic", type: "text", placeholder: "Picture Address" },
  ];

  const userDetails = [
    { label: "UserName", value: currentUser.username },
    { label: "Email", value: currentUser.email },
    { label: "Phone", value: currentUser.phone },
    { label: "Address", value: currentUser.address },
    { label: "Postal Code", value: currentUser.postalCode },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 dark:text-white text-black rounded-lg ">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="mb-6 md:mb-0 md:mr-6">
          <img
            src={
              currentUser.pic ||
              "https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small_2x/User-icon-member-login-isolated-vector.jpg"
            }
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-blue-500 object-cover"
          />
        </div>
        <div className="text-center  md:text-left">
          {editMode ? (
            <div className="">
              {inputFields.map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="block border rounded w-full px-4 py-2 mt-2 text-black"
                />
              ))}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold line-clamp-1">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <div className="text-center md:text-left">
                {userDetails.map((detail, index) => (
                  <p key={index} className=" mt-1">
                    {detail.label}: {detail.value}
                  </p>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreProfile;
