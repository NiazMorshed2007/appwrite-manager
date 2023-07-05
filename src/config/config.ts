import { IConfig } from "@/interfaces/IConfig";

export const config: IConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6475ca5453bd7b131cd8",
  projectName: "Appwrite Manager",
  projectLogo: "/logo.png",
  databaseId: "6477edd01cdd300e0b80",
  groups: [
    {
      name: "Marketing",
      id: "marketing",
    },
  ],
  collections: [
    {
      name: "Campaigns",
      collectionId: "647ab9ff72389c6feeb1",
      groupId: "marketing",
      searchColumn: "description",
      isEditable: false,
      columns: [
        {
          key: "name",
          label: "Name",
        },
        {
          key: "description",
          label: "Description",
        },
        {
          key: "$collectionId",
          label: "Collection Id",
          enableHiding: false,
        },
      ],
    },
    {
      name: "Popups",
      collectionId: "647e99ee66d5a7b6b739",
      groupId: "marketing",
      searchColumn: "name",
      columns: [
        {
          key: "name",
          label: "Name",
          className: "w-[100px]",
        },
        {
          key: "title_value",
          label: "Title value",
          className: "w-[280px]",
        },
        {
          key: "subtitle_value",
          label: "Subtitle value",
          className: "w-[320px]",
        },
        {
          key: "img_url",
          label: "Image url",
          className: "w-[150px] overflow-hidden",
        },
        {
          key: "button_value",
          label: "Button value",
        },
      ],
    },
    {
      name: "Users",
      collectionId: "647ab9e71d5e63e69fed",
    },
    {
      name: "Template Library",
      collectionId: "647f66884abd6f9cd6dd",
      columns: [
        {
          key: "title_value",
          label: "Title value",
          className: "w-[280px]",
        },
        {
          key: "subtitle_value",
          label: "Subtitle value",
          className: "w-[320px]",
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
