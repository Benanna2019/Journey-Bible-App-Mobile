import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { Mutation__ToggleTaskMutation__param } from './param_type';
import { ToggleTaskMutation as resolver } from '../../../ToggleTaskMutation';

const readerAst: ReaderAst<Mutation__ToggleTaskMutation__param> = [
  {
    kind: "Linked",
    fieldName: "toggleTask",
    alias: null,
    arguments: [
      [
        "id",
        { kind: "Variable", name: "id" },
      ],
    ],
    condition: null,
    isUpdatable: false,
    refetchQueryIndex: null,
    selections: [
      {
        kind: "Scalar",
        fieldName: "_id",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "text",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "isCompleted",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
    ],
  },
];

const artifact: ComponentReaderArtifact<
  Mutation__ToggleTaskMutation__param,
  ExtractSecondParam<typeof resolver>
> = {
  kind: "ComponentReaderArtifact",
  fieldName: "ToggleTaskMutation",
  resolver,
  readerAst,
  hasUpdatable: false,
};

export default artifact;
