import { applyParams, save, ActionOptions } from "gadget-server";

// Powers the form in the 'change password' page

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections }) => {
  applyParams(params, record);
  await save(record);

  // Delete all session records for the associated store
  await api.internal.session.deleteMany({ filter: { bigcommerceStoreId: { equals: record.id } } });
};

/** @type { ActionOnSuccess } */
export const onSuccess = async ({ params, record, logger, api, connections }) => {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};
