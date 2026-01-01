import type {NormalizationAst} from '@isograph/react';
const normalizationAst: NormalizationAst = {
  kind: "NormalizationAst",
  selections: [
    {
      kind: "Linked",
      fieldName: "toggleTask",
      arguments: [
        [
          "id",
          { kind: "Variable", name: "id" },
        ],
      ],
      concreteType: "Task",
      selections: [
        {
          kind: "Scalar",
          fieldName: "_id",
          arguments: null,
        },
        {
          kind: "Scalar",
          fieldName: "isCompleted",
          arguments: null,
        },
        {
          kind: "Scalar",
          fieldName: "text",
          arguments: null,
        },
      ],
    },
  ],
};
export default normalizationAst;
