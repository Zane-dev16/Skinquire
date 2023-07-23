import styles from "./ProfileMenu.module.css";
import Image from "next/image";

export default async function ProfileMenu() {
  return (
    <>
      <div>
        <Image
          src="/profile-user.svg"
          alt="profile-avatar"
          width={30}
          height={30}
        ></Image>
        <div>Profile section</div>
      </div>
    </>
  );
}
