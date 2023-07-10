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
      searchColumn: "name",
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
    {
      name: "Products",
      collectionId: "64aa86c273d6c0b91a0e",
      searchColumn: "name",
      columns: [
        {
          key: "name",
          label: "Product Name",
        },
        {
          key: "price",
          label: "Price",
        },
        {
          key: "shortDescription",
          label: "Short Description",
        },
        {
          key: "img",
          label: "Product Image",
          type: "file",
          bucketId: "64ab87a0338ed7395f52",
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
