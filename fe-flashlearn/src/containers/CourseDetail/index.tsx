/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_CODE, IMAGES, NAVBAR_HEIGHT } from '@appConfig';
import { BreadCrumbs, Image, Tabs } from '@components';
import { Button, Rating, Stack, Typography, useMediaQuery } from '@mui/material';
import { useGetCourseDetail, useGetMyLearningCourse, useGetProfile } from '@queries';
import { useLocation, useParams } from 'react-router-dom';
import LessonDetail from '../LessonDetail';
import LessonList from '../LessonList';
import { courseDetailBreadCrumb, courseTabs, studentTabs, teacherTabs } from './helpers';

const CourseDetail = () => {
  const isMobileScreen = useMediaQuery('(max-width: 840px)');

  const location = useLocation();

  const { pathname } = location;

  const tab = pathname.split('/')[3];

  const { courseId } = useParams<{ courseId: string }>();

  const { courseDetail } = useGetCourseDetail({ id: courseId });

  const { courses } = useGetMyLearningCourse();

  const { profile } = useGetProfile();

  const isOwner = profile?.id === courseDetail?.owner.id;

  const isStudent = courses?.some((course) => course.id === courseDetail?.id);

  const renderBody = () => {
    switch (tab) {
      case 'lessons':
        return <LessonList />;
      case 'lesson':
        return <LessonDetail />;
      default:
        return <LessonList />;
    }
  };

  return (
    <Stack
      sx={{
        width: '100%',
        overflowX: isMobileScreen && 'hidden',
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: '100%',
          pt: `${NAVBAR_HEIGHT}px`,
          alignItems: 'center',
          backgroundColor: COLOR_CODE.PRIMARY_100,
          boxShadow: '0px 1px 10px 1px rgba(21, 96, 100, 0.1)',
        }}
      >
        <Stack width="50%" p={3} pl={24} gap={1}>
          <BreadCrumbs items={courseDetailBreadCrumb} separator="›" sx={{ mb: 2 }} />
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 800,
              color: COLOR_CODE.GREY_700,
              mb: 2,
            }}
          >
            {courseDetail?.name}
          </Typography>
          <Typography>{courseDetail?.owner.name}</Typography>
          <Rating value={Number(courseDetail?.avgRating)} precision={0.1} readOnly />
          <Typography>{courseDetail?.description}</Typography>
          <Stack display="block" mt={2}>
            <Button variant="contained">Bắt đầu học</Button>
          </Stack>
        </Stack>
        <Stack width={'30%'}>
          <Image
            src={courseDetail?.image ?? IMAGES.noImage}
            height={300}
            sx={{ objectFit: 'contain', pr: 4 }}
          />
        </Stack>
      </Stack>
      <Stack direction="row">
        <Tabs
          items={[
            ...courseTabs(courseId),
            ...(isStudent ? studentTabs(courseId) : []),
            ...(isOwner ? teacherTabs(courseId) : []),
          ]}
          orientation="vertical"
          variant="scrollable"
          sx={{ borderRight: 1, borderColor: 'divider', width: 200, height: '50vh', py: 2 }}
        />
        {renderBody()}
      </Stack>
    </Stack>
  );
};

export default CourseDetail;