import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "session" model, go to https://return-order-catalyst.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "VAhHxhhg_p7T",
  fields: {
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "2_Vh79OQ79RH",
    },
  },
};
