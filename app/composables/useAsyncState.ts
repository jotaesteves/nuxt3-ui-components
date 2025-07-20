/**
 * Composable for managing async operations with loading and error states
 */
export const useAsyncState = <T>() => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<T | null>(null);

  const execute = async (asyncFn: () => Promise<T>, errorMessage = "An error occurred") => {
    loading.value = true;
    error.value = null;

    try {
      const result = await asyncFn();
      data.value = result;
      return result;
    } catch (err) {
      console.error(errorMessage, err);
      error.value = err instanceof Error ? err.message : errorMessage;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    loading.value = false;
    error.value = null;
    data.value = null;
  };

  const retry = (asyncFn: () => Promise<T>, errorMessage?: string) => {
    return execute(asyncFn, errorMessage);
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    execute,
    reset,
    retry,
  };
};

/**
 * Composable for managing multiple async operations
 */
export const useAsyncBatch = () => {
  const loading = ref(false);
  const errors = ref<Record<string, string>>({});

  const executeAll = async (operations: Record<string, () => Promise<unknown>>): Promise<Record<string, unknown>> => {
    loading.value = true;
    errors.value = {};

    const results: Record<string, unknown> = {};
    const promises = Object.entries(operations).map(async ([key, operation]) => {
      try {
        const result = await operation();
        results[key] = result;
        return { key, result, error: null };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errors.value[key] = errorMessage;
        return { key, result: null, error: errorMessage };
      }
    });

    await Promise.allSettled(promises);
    loading.value = false;

    return results;
  };

  return {
    loading: readonly(loading),
    errors: readonly(errors),
    executeAll,
  };
};
