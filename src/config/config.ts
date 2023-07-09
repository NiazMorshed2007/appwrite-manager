import { IConfig } from "@/interfaces/IConfig";

export const config: IConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "ecommerceapplication",
  projectName: "Appwrite Manager",
  projectLogo: "/logo.svg",
  databaseId: "ecommercedb",
  groups: [
    {
      name: "Basic",
      id: "basic",
    },
  ],
  collections: [
    {
      name: "Users",
      collectionId: "64aa8577938fb15d8e76",
      groupId: "basic",
      searchColumn: "email",
      pages: {
        view: {
          title: "User Details",
          description: "Deatils of the user",
        },
        edit: {
          title: "Edit User Details",
          description: "Edit the user",
        },
      },
      columns: [
        {
          key: "name",
          label: "Name",
          rules: {
            required: true,
          },
        },
        {
          key: "email",
          label: "email",
          rules: {
            type: "email",
          },
        },
        {
          key: "username",
          label: "Username",
        },
        {
          key: "avatar",
          label: "Avatar",
          type: "file",
          bucketId: "64aa8adeea3f1d90dd1e",
          className: "rounded-md",
          rules: {
            required: false,
          },
        },
        {
          key: "mobileNo",
          label: "Mobile No",
          rules: {
            type: "tel",
          },
        },
        {
          key: "role",
          label: "Role",
          type: "enum",
          options: ["user", "admin"],
          rules: {
            // defaultValue: "user",
            required: true,
            placeholder: "Select user role",
          },
        },
      ],
    },
  ],
  shortcuts: [
    {
      action: "search",
      keyAfterCtrl: "s",
    },
    {
      action: "filter",
      keyAfterCtrl: "f",
    },
    {
      action: "searchbox",
      keyAfterCtrl: "y",
    },
  ],
};
