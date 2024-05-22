import { ApiKey } from '@queries/keys';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, responseWrapper } from '@utils';
import { VocabularyApi, VocabularyOfLessonResponse } from '.';

export function useGetVocabularyOfLesson(
  options?: UseQueryOptions<PaginationResponseType<VocabularyOfLessonResponse>, Error> & {
    lessonId?: string;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllVocabulary,
  } = useQuery<PaginationResponseType<VocabularyOfLessonResponse>, Error>(
    [ApiKey.VOCABULARY, options?.lessonId],
    {
      queryFn: () => {
        return responseWrapper<PaginationResponseType<VocabularyOfLessonResponse>>(
          VocabularyApi.getVocabularyOfLesson,
          [options?.lessonId],
        );
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !!options?.lessonId,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateVocabularyList = () =>
    queryClient.invalidateQueries([ApiKey.VOCABULARY, options?.lessonId]);

  const { arrayData: vocabulary = [], page } = data?.data || {};

  return {
    vocabulary,
    page,
    error,
    isError,
    isFetching,
    onGetAllVocabulary,
    handleInvalidateVocabularyList,
  };
}
