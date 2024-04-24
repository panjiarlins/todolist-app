import getErrorMessage from '@/utils/get-error-message'
import { createSafeActionClient } from 'next-safe-action'

export const action = createSafeActionClient({
  handleReturnedServerError: async (error) => await getErrorMessage(error),
  handleServerErrorLog: () => {},
})
