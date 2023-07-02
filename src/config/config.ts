import { IConfig } from "@/interfaces/IConfig";

export const config: IConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6475ca5453bd7b131cd8",
  project_name: "Appwrite Manager",
  databaseId: "6477edd01cdd300e0b80",
  collections: [
    {
      name: "Marketing",
      type: "group",
      collections: [
        {
          name: "Campaigns",
          collectionId: "647ab9ff72389c6feeb1",
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
            },
          ],
        },
        {
          name: "Popups",
          collectionId: "647e99ee66d5a7b6b739",
          columns: [
            {
              key: "name",
              label: "Name",
            },
            {
              key: "title_value",
              label: "Title value",
            },
            {
              key: "description_value",
              label: "Description value",
            },
          ],
        },
      ],
    },
    {
      name: "Users",
      collections: [],
      collectionId: "647e9e66d5a7b6b739",
    },
    {
      name: "Library",
      collectionId: "647e99ee66d5a7739",
    },
  ],
};
