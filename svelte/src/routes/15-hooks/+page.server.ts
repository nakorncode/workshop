import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  // Access the currentUsername from locals
  const currentUsername = locals.currentUsername

  return {
    currentUsername
  };
}
