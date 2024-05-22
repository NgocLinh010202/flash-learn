/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from '@appConfig';
import { Image, Loading } from '@components';
import { Stack, Typography } from '@mui/material';
import { useGetLesson } from '@queries';
import { isOdd } from '@utils';
import { useParams } from 'react-router-dom';
import LessonItem from './LessonItem';

const LessonList = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { lessons, isFetching } = useGetLesson({ courseId });

  if (isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} pt={3}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
        pt: 6,
        // backgroundImage: `url(${IMAGES.banner})`,
      }}
    >
      {lessons?.length > 0 ? (
        <>
          {lessons.map((lesson, index) => (
            <>
              <LessonItem lesson={lesson} courseId={courseId} index={index} />
              {index !== lessons.length - 1 && (
                <Image
                  src={IMAGES.connectLine}
                  width={500}
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    ...(isOdd(index) ? { transform: 'scaleX(-1)' } : {}),
                  }}
                />
              )}
            </>
          ))}
        </>
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Typography variant="body1" fontWeight={600}>
            Không tìm thấy kết quả
          </Typography>
          <Typography variant="body2">
            Chúng tôi không thể tìm thấy những gì bạn đang tìm kiếm...
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default LessonList;
